import Player from "./gameboard";
import {
  renderBoard,
  renderShips,
  shipPosition,
  flipShip,
  renderButtonUnderBoard,
  renderPassDevice,
} from "./renderUI";

// Handles ship drag and drop
export function playerShipPlacement(player, opponent) {
  let originalY;
  let isDragging = false;
  let isVertical = true;
  let draggable;
  let elementId;
  let side;
  player.alt === "1" ? (side = "left") : (side = "right");
  const shipsContainer = document.getElementById(`${side}-ships`);

  // Save original ship positions
  const originalPositions = {};
  function saveShipPos() {
    document.querySelectorAll(`#${side}-ships > div`).forEach((ship) => {
      const rect = ship.getBoundingClientRect();
      originalY = rect.y;
      originalPositions[ship.id] = rect.x;
    });
  }
  // Dynamically reposition ships when window resizes
  saveShipPos();
  window.addEventListener("resize", () => shipPosition(side, player));
  window.addEventListener("resize", saveShipPos);

  // Grab ship in ships container and starts dragShip, shipDrop, and toggleVertical
  shipsContainer.addEventListener("mousedown", grabShip);
  function grabShip(e) {
    e.preventDefault();
    draggable = document.getElementById(e.target.parentNode.id);
    if (e.target.parentNode.id === "boards-container") return;
    elementId = e.target.parentNode.id;
    isDragging = true;
    player.fleet.forEach((ship) => {
      elementId.includes(ship.name)
        ? (isVertical = ship.isVertical)
        : (isVertical = true);
    });
    player.removeShip(elementId.slice(1));
    draggable.style.transition = "";

    //Add listeners for drag, drop, and flip
    document.addEventListener("mousemove", dragShip);
    document.addEventListener("mouseup", shipDrop);
    document.addEventListener("contextmenu", toggleVertical);
  }
  // Position dragging ship element to cursor
  function dragShip(e) {
    e.preventDefault();
    if (!isDragging) return;
    const rect = document
      .querySelector("#left-row + div")
      .getBoundingClientRect();

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    draggable.style.left = `${e.clientX + scrollX - rect.width / 2}px`;
    draggable.style.top = `${e.clientY + scrollY - rect.width / 2}px`;
  }
  // Toggle ship vertical or horizontal
  function toggleVertical(e) {
    e.preventDefault();
    isVertical ? (isVertical = false) : (isVertical = true);
  }
  // Place ship into grid with instantiated ship classes
  function shipDrop(e) {
    e.preventDefault();
    if (!isDragging) return;
    isDragging = false;
    let snapped = false;

    const boardDivs = document.querySelectorAll(`#${side}-board div`);

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    boardDivs.forEach((cell) => {
      const rect = cell.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        try {
          const shipIdToClass = Player.shipIdToClass;
          const shipKey = elementId.slice(1);
          const shipType = Object.keys(shipIdToClass).find((type) =>
            shipKey.includes(type)
          );
          if (shipType) {
            player.placeShip(
              cell.id,
              Reflect.construct(shipIdToClass[shipType], [isVertical])
            );
          }
          draggable.style.left = `${rect.left + scrollX}px`;
          draggable.style.top = `${rect.top + scrollY}px`;
          snapped = true;
          flipShip(isVertical, elementId, player);
        } catch (error) {
          snapped = false;
          alert(error.message);
        }
      }
    });
    if (!snapped) {
      draggable.style.left = `${originalPositions[elementId]}px`;
      draggable.style.top = `${originalY}px`;
      draggable.style.flexDirection = "column";
      draggable.style.transition = "left 0.3s ease, top 0.3s ease";
    }
    // Once all five ships are placed, either start game or pass to player 2
    if (player.fleet.length === 5) {
      const btnUnderBoard = document.getElementById("btn-under-board");
      if (btnUnderBoard) return;
      player.alt === "1" && opponent.alt === "2"
        ? showDonePlacingBtn()
        : showStartBattleBtn();
    } else {
      const btnUnderBoard = document.getElementById("btn-under-board");
      if (btnUnderBoard) btnUnderBoard.remove();
    }
  }
  // Remove all listeners used in shipPlacement function
  function removeListeners() {
    shipsContainer.removeEventListener("mousedown", grabShip);
    document.removeEventListener("mousemove", dragShip);
    document.removeEventListener("mouseup", shipDrop);
    document.removeEventListener("contextmenu", toggleVertical);
    window.removeEventListener("resize", () => shipPosition(side, player));
    window.removeEventListener("resize", saveShipPos);
  }
  // Reset styling for ships to disable grabbable
  function resetContainerStyle() {
    const sideShipsContainer = document.getElementById(`${side}-ships`);
    sideShipsContainer.innerHTML = "";
    sideShipsContainer.style.flexDirection = "row";
    sideShipsContainer.style.position = "none";
    sideShipsContainer.style.transition = "none";
  }

  // Show startBattleButton when play fleet full
  function showStartBattleBtn() {
    const players = [player, opponent];
    renderButtonUnderBoard(side, "Start Battle");
    const startBattleBtn = document.getElementById("btn-under-board");
    startBattleBtn.addEventListener(
      "click",
      () => {
        removeListeners();
        resetContainerStyle();
        let coverboard = false;
        players.forEach((el) => {
          if (opponent.alt === "robo") coverboard = false;
          if (el.alt === "robo" || el.alt === "2") coverboard = true;
          renderShips(el, false);
          renderBoard(el, false, coverboard);
        });
        player.turn = true;
        startBattleBtn.remove();
        return;
      },
      true
    );
  }
  // Show when player is done placing all 5 ships into board
  function showDonePlacingBtn() {
    renderButtonUnderBoard(side, "Done Placing");
    const donePlaceBtn = document.getElementById("btn-under-board");
    donePlaceBtn.addEventListener(
      "click",
      (e) => {
        e.stopImmediatePropagation();
        donePlaceBtn.remove();
        removeListeners();
        resetContainerStyle();
        if (player.alt === "1") {
          document.getElementById("left-board").innerHTML = "";
          renderPassDevice();
          document
            .getElementById("left-btn")
            .addEventListener("click", () =>
              player2ShipPlacement(opponent, player)
            );
        } else {
          opponent.turn = true;
        }
      },
      true
    );
  }
}
function player2ShipPlacement(player2, player1) {
  const dialog = document.getElementById("modal");
  dialog.close();
  dialog.remove();
  document.getElementById("modal-overlay").remove();
  renderBoard(player2, true);
  renderShips(player2, true);
  playerShipPlacement(player2, player1);
}
