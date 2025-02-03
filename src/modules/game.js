import Player from "./gameboard";
import { Carrier, Battleship, Destroyer, Submarine, Patrol } from "./ship";
import { computerLogic, resetHitsList, autoWin } from "./computerLogic";
import {
  renderXY,
  renderBoard,
  renderWin,
  renderStartMenu,
  replaceRightBoard,
  renderShips,
  renderShipFlip,
} from "./renderUI";
import randomizeShipPlacement from "./randomizeShipPlacement";

renderXY();

function win(wonPlayer) {
  renderWin(wonPlayer);
  const dialog = document.getElementById("modal");
  document.getElementById("button-container").addEventListener("click", (e) => {
    if (e.target.id === "left-btn") {
      e.preventDefault();
      replaceRightBoard();
      resetHitsList();
      dialog.close();
      dialog.remove();
      return renderStartMenu(startHandler);
    }
  });
}

function initComputerGame() {
  let gameover = false;
  const person = new Player("person", true);
  const computer = new Player("computer", false);

  renderBoard(person, true);
  renderBoard(computer);
  renderShips(true);

  const leftShips = document.querySelectorAll("#left-ships > div");
  leftShips.forEach((ship) => {
    placeShipHandler(ship.id, person);
  });

  randomizeShipPlacement(computer);

  document.getElementById("right-board").addEventListener("click", (e) => {
    if (person.turn) {
      const coordinate = e.target.id;

      let i = true;
      while (i) {
        try {
          computer.receiveAttack(coordinate);
        } catch (error) {
          return alert(error.message);
        }
        i = false;
      }

      renderBoard(computer);

      if (computer.fleetSunk()) {
        gameover = true;
        return win(person);
      }

      computer.turn = true;
      person.turn = false;
    }
    if (computer.turn) {
      const coordinate = computerLogic(person);

      setTimeout(() => {
        try {
          person.receiveAttack(coordinate);
          // autoWin(person)
        } catch (error) {
          alert(error.message);
        }

        renderBoard(person);
      }, 200);

      if (person.fleetSunk()) {
        gameover = true;
        return win(computer);
      }

      person.turn = true;
      computer.turn = false;
    }
  });

  if (gameover) return;
}

export function placeShipHandler(elementId, player) {
  const draggable = document.getElementById(`${elementId}`);
  const draggableParent = draggable.parentNode;

  let isDragging = false;
  let originalX, originalY;
  let isVertical = false;

  originalX = draggable.style.left;
  originalY = draggable.style.top;

  draggable.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    player.removeShip(elementId.slice(1));

    draggable.style.transition = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      if (isVertical) {
        renderShipFlip(false, elementId, isDragging, player);
        isVertical = false;
      } else {
        renderShipFlip(true, elementId, isDragging, player);
        isVertical = true;
      }
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const rect = document
      .querySelector("#left-row + div")
      .getBoundingClientRect();

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    draggable.style.left = `${e.clientX + scrollX - rect.width / 2}px`;
    draggable.style.top = `${e.clientY + scrollY - rect.width / 2}px`;
  });

  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    isDragging = false;
    let snapped = false;

    const boardDivs = document.querySelectorAll("#left-board div");

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    boardDivs.forEach((cell) => {
      const rect = cell.getBoundingClientRect();
      const parentRect = draggableParent.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        try {
          if (elementId.includes("carrier")) {
            player.placeShip(cell.id, new Carrier(isVertical));
          }
          if (elementId.includes("battleship")) {
            player.placeShip(cell.id, new Battleship(isVertical));
          }
          if (elementId.includes("destroyer")) {
            player.placeShip(cell.id, new Destroyer(isVertical));
          }
          if (elementId.includes("submarine")) {
            player.placeShip(cell.id, new Submarine(isVertical));
          }
          if (elementId.includes("patrol")) {
            player.placeShip(cell.id, new Patrol(isVertical));
          }
          draggable.style.left = `${rect.left + scrollX}px`;
          draggable.style.top = `${rect.top + scrollY}px`;
          snapped = true;
        } catch (error) {
          alert(error.message);
        }
      }
    });

    if (!snapped) {
      draggable.style.left = `${originalX}`;
      draggable.style.top = `${originalY}`;
      renderShipFlip(isVertical, elementId, isDragging, player);
    }
    const startBattleBtn = document.getElementById("start-battle-btn");
    if (player.fleet.length === 5) {
      const shipsContainer = document.querySelector(".ships-containers");
      startBattleBtn.style.display = "block";
      startBattleBtn.addEventListener("click", () => {
        shipsContainer.innerHTML = "";
        renderShips(false);
        renderBoard(player);
        return;
      });
    } else {
      startBattleBtn.style.display = "none";
    }

    draggable.style.transition = "left 0.3s ease, top 0.3s ease";

    draggable.style.cursor = "grab";
  });
}

function startHandler() {
  const dialog = document.getElementById("modal");

  document.getElementById("button-container").addEventListener("click", (e) => {
    if (e.target.id === "left-btn") {
      e.preventDefault();
      dialog.close();
      dialog.remove();
      document.getElementById("modal-overlay").remove();
      return initComputerGame();
    }

    if (e.target.id === "right-btn") {
      e.preventDefault();
      return console.log("computer game only available");
    }
  });
}

export default function init() {
  renderStartMenu(startHandler);
  // initComputerGame();
}
