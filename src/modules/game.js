import { Ship, Gameboard, Player } from "./objects";
import { computerLogic, resetHitsList, autoWin } from "./computerLogic";
import {
  renderXY,
  renderBoard,
  renderWin,
  renderStart,
  replaceRightBoard,
  renderShips,
} from "./renderUI";

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
      return renderStart(startHandler);
    }
  });
}

function initComputerGame() {
  let gameover = false;
  const person = new Player("person", true);
  const computer = new Player("computer", false);

  renderBoard(person, true);
  renderBoard(computer);
  renderShips(person, computer);

  const leftShips = document.querySelectorAll("#left-ships > div");
  leftShips.forEach((ship) => {
    placeShipHandler(ship.id, person);
  });

  document.getElementById("right-board").addEventListener("click", (e) => {
    if (person.turn) {
      const coordinate = e.target.id;

      let i = true;
      while (i) {
        try {
          computer.board.receiveAttack(coordinate);
        } catch (error) {
          return alert(error.message);
        }
        i = false;
      }

      renderBoard(computer);

      if (computer.board.fleetSunk()) {
        gameover = true;
        return win(person);
      }

      computer.turn = true;
      person.turn = false;
    }
    if (computer.turn) {
      const coordinate = computerLogic(person.board);

      setTimeout(() => {
        try {
          person.board.receiveAttack(coordinate);
          // autoWin(person)
        } catch (error) {
          alert(error.message);
        }

        renderBoard(person);
      }, 200);

      if (person.board.fleetSunk()) {
        gameover = true;
        return win(computer);
      }

      person.turn = true;
      computer.turn = false;
    }
  });

  if (gameover) return;
}

export function placeShipHandler(elementId, board) {
  const draggable = document.getElementById(`${elementId}`);
  const draggableParent = draggable.parentNode;

  let isDragging = false;
  let originalX, originalY;
  let isVertical;

  originalX = draggable.style.left;
  originalY = draggable.style.top;

  draggable.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;

    draggable.style.transition = "";
  });

  document.addEventListener("mousemove", (e) => {
    e.preventDefault();
    const rect = document
      .querySelector("#left-row + div")
      .getBoundingClientRect();
    if (!isDragging) return;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    draggable.style.left = `${e.clientX + scrollX - rect.width / 2}px`;
    draggable.style.top = `${e.clientY + scrollY - rect.width / 2}px`;
  });

  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
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
            board.placeCarrier(cell.id, true);
          }
          if (elementId.includes("battleship")) {
            board.placeBattleship(cell.id, true);
          }
          if (elementId.includes("destroyer")) {
            board.placeDestroyer(cell.id, true);
          }
          if (elementId.includes("submarine")) {
            board.placeSubmarine(cell.id, true);
          }
          if (elementId.includes("patrol")) {
            board.placePatrol(cell.id, true);
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
      board.removeShip(elementId.slice(1));
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
  // renderStart(startHandler);
  initComputerGame();
}
