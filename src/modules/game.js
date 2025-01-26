import { Ship, Gameboard, Player } from "./objects";
import { computerLogic, resetHitsList, autoWin } from "./computerLogic";
import {
  renderUI,
  renderBoard,
  renderWin,
  renderStart,
  replaceRightBoard,
} from "./renderUI";

renderUI();

let restart = 0;

function win(wonPlayer) {
  renderWin(wonPlayer);
  const dialog = document.getElementById("modal");
  document.getElementById("button-container").addEventListener("click", (e) => {
    if (e.target.id === "left-btn") {
      e.preventDefault();
      replaceRightBoard();
      resetHitsList();
      restart++;
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

  person.placeCarrier("00", false);
  person.placeBattleship("22", true);
  person.placeDestroyer("67", false);
  person.placeSubmarine("46", false);
  person.placePatrol("96", false);

  computer.placeCarrier("01", false);
  computer.placeBattleship("32", true);
  computer.placeDestroyer("63", false);
  computer.placeSubmarine("36", false);
  computer.placePatrol("86", false);

  renderBoard(person);
  renderBoard(computer);

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
  renderStart(renderStartHandler);
}
