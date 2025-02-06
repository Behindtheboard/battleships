import { flipShip } from "./renderUI";
import Player from "./gameboard";
import { renderBoard, renderShips, shipPosition } from "./renderUI";

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
      console.log(originalPositions[ship.id]);
    });
  }
  saveShipPos();
  window.addEventListener("resize", () => unplacedShipPos(side, player));
  window.addEventListener("resize", saveShipPos);
  // Dynamically reposition ships when window resizes

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
      draggable.style.flexDirection = 'column'
      draggable.style.transition = "left 0.3s ease, top 0.3s ease";
    }

    showStartBattleBtn(player, opponent);
  }
}

// Show startBattleButton when play fleet full
function showStartBattleBtn(player, opponent) {
  const players = [player, opponent];
  const startBattleBtn = document.getElementById("start-battle-btn");
  if (player.fleet.length === 5) {
    const shipsContainer = document.querySelector(".ships-containers");
    startBattleBtn.style.display = "block";
    startBattleBtn.addEventListener("click", () => {
      shipsContainer.innerHTML = "";
      players.forEach((player) => {
        renderShips(player, false);
        renderBoard(player, false);
      });
      player.turn = true;
      return;
    });
  } else {
    startBattleBtn.style.display = "none";
  }
}

export function unplacedShipPos(side, player) {
  const source = document.getElementById(`${side}-box`);
  const rect = source.getBoundingClientRect();
  const squareHeight = (rect.bottom - rect.top) / 11;
  const bottom = rect.bottom + 20;
  let leftPos = rect.left + squareHeight;
  let skip;
  document.querySelectorAll(`.ships`).forEach((ship) => {
    player.fleet.forEach((shipObj) => {
      if (ship.id.includes(shipObj.name)) skip = true;
    });
    if (skip) return;
    console.log(bottom)
    ship.style.top = `${bottom}px`;
    ship.style.left = `${leftPos}px`;
    ship.style.flexDirection = "column";
    leftPos += squareHeight * 2;
  });
}
