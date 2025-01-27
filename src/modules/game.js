import { Ship, Gameboard, Player } from "./objects";
import { computerLogic, resetHitsList, autoWin } from "./computerLogic";
import {
  renderXY,
  renderBoard,
  renderWin,
  renderStart,
  replaceRightBoard,
  renderShips
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
      return renderStart(renderStartHandler);
    }
  });
}

function initComputerGame() {
  let gameover = false;
  const person = new Player("person", true);
  const computer = new Player("computer", false);

  renderBoard(person);
  renderBoard(computer);
  renderShips();

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

function renderStartHandler() {
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
  // renderStart(renderStartHandler);
  initComputerGame()
}
