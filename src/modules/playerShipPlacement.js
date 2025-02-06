import { flipShip } from "./renderUI";
import Player from "./gameboard";
import { renderBoard, renderShips } from "./renderUI";

// Handles ship drag and drop
export function playerShipPlacement(player1, player2) {
  const shipsContainer = document.querySelector(".ships-containers");
  let originalX, originalY;
  let isDragging = false;
  let isVertical = true;
  let draggable;
  let elementId;
  // Grab ship in ships container
  shipsContainer.addEventListener("mousedown", grabShip);
  function grabShip(e) {
    e.preventDefault();
    draggable = document.getElementById(e.target.parentNode.id);
    elementId = e.target.parentNode.id;
    originalX = draggable.style.left;
    originalY = draggable.style.top;
    isDragging = true;
    player1.fleet.forEach((ship) => {
      elementId.includes(ship.name)
        ? (isVertical = ship.isVertical)
        : (isVertical = true);
    });
    player1.removeShip(elementId.slice(1));
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

    const boardDivs = document.querySelectorAll("#left-board div");

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
            player1.placeShip(
              cell.id,
              Reflect.construct(shipIdToClass[shipType], [isVertical])
            );
          }
          draggable.style.left = `${rect.left + scrollX}px`;
          draggable.style.top = `${rect.top + scrollY}px`;
          snapped = true;
          flipShip(isVertical, elementId, player1);
        } catch (error) {
          snapped = false;
          alert(error.message);
        }
      }
    });
    if (!snapped) {
      draggable.style.left = `${originalX}`;
      draggable.style.top = `${originalY}`;
    }

    showStartBattleBtn(player1, player2);
    draggable.style.transition = "left 0.3s ease, top 0.3s ease";
  }
}

// Show startBattleButton when play fleet full
function showStartBattleBtn(player1, player2) {
  const players = [player1, player2]
  const startBattleBtn = document.getElementById("start-battle-btn");
  if (player1.fleet.length === 5) {
    const shipsContainer = document.querySelector(".ships-containers");
    startBattleBtn.style.display = "block";
    startBattleBtn.addEventListener("click", () => {
      shipsContainer.innerHTML = "";
      players.forEach(player => {
        renderShips(player, false)
        renderBoard(player, false)
      })
      player1.turn = true;
      return;
    });
  } else {
    startBattleBtn.style.display = "none";
  }
}
