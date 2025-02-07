import EventManager from "./eventManager";
import Player from "./gameboard";
import {
  renderBoard,
  renderShips,
  shipPosition,
  flipShip,
  renderButtonUnderBoard,
} from "./renderUI";

const shipEventManager = new EventManager();

// Handles ship drag and drop
export function playerShipPlacement(player, opponent) {
  const shipsContainer = document.querySelector(".ships-containers");
  let originalY;
  let isDragging = false;
  let isVertical = true;
  let draggable;
  let elementId;
  let side;
  player.alt === "1" ? (side = "left") : (side = "right");

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

  // Grab ship in ships container
  shipsContainer.addEventListener("mousedown", grabShip);
  function grabShip(e) {
    e.preventDefault();
    draggable = document.getElementById(e.target.parentNode.id);
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
  // Place ship into grid with instantiated classes
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
    if (player.alt === "1" && opponent.alt === "robo") {
      showStartBattleBtn();
    } else {
      showDonePlacingBtn();
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

  // Show startBattleButton when play fleet full
  function showStartBattleBtn() {
    const players = [player, opponent];
    const shipsContainer = document.querySelector(".ships-containers");
    if (player.fleet.length === 5) {
      renderButtonUnderBoard(side, "Start Battle");
      const startBattleBtn = document.getElementById("btn-under-board");
      startBattleBtn.addEventListener("click", () => {
        removeListeners();
        shipsContainer.innerHTML = "";
        shipsContainer.style.flexDirection = "row";
        shipsContainer.style.position = "none";
        shipsContainer.style.transition = "none";
        players.forEach((el) => {
          renderShips(el, false);
          renderBoard(el, false);
        });
        player.turn = true;
        startBattleBtn.remove();
        return;
      });
    }
  }

  function showDonePlacingBtn() {
    const shipsContainer = document.getElementById(`${side}-ships`);
    if (player.fleet.length === 5) {
      renderButtonUnderBoard(side, "Done Placing");
      const startBattleBtn = document.getElementById("btn-under-board");
      startBattleBtn.addEventListener("click", () => {
        removeListeners();
        shipsContainer.innerHTML = "";
        shipsContainer.style.flexDirection = "row";
        shipsContainer.style.position = "none";
        shipsContainer.style.transition = "none";
        player.turn = true;
        startBattleBtn.remove();
        return;
      });
    }
  }
}
