import { flipShip } from "./renderUI";
import { Carrier, Battleship, Destroyer, Submarine, Patrol } from "./ship";
import { renderBoard, renderShips } from "./renderUI";

export function playerShipPlacement(player1, player2) {
  const shipsContainer = document.querySelector(".ships-containers");
  let originalX, originalY;
  let isDragging = false;
  let isVertical = true;
  let draggable;
  let elementId;

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

  function toggleVertical(e) {
    e.preventDefault();
    isVertical ? (isVertical = false) : (isVertical = true);
  }

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
          const shipClasses = {
            carrier: Carrier,
            battleship: Battleship,
            destroyer: Destroyer,
            submarine: Submarine,
            patrol: Patrol,
          };
          const shipKey = elementId.slice(1);
          const shipType = Object.keys(shipClasses).find((type) =>
            shipKey.includes(type)
          );
          if (shipType) {
            player1.placeShip(
              cell.id,
              Reflect.construct(shipClasses[shipType], [isVertical])
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

    const startBattleBtn = document.getElementById("start-battle-btn");
    if (player1.fleet.length === 5) {
      const shipsContainer = document.querySelector(".ships-containers");
      startBattleBtn.style.display = "block";
      startBattleBtn.addEventListener("click", () => {
        shipsContainer.innerHTML = "";
        renderShips(player1, false);
        renderShips(player2, false);
        renderBoard(player1, false);
        renderBoard(player2, false);
        player1.turn = true;
        return;
      });
    } else {
      startBattleBtn.style.display = "none";
    }

    draggable.style.transition = "left 0.3s ease, top 0.3s ease";
  }
}
