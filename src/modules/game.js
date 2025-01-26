import { Ship, Gameboard, Player } from "./objects";
import computerLogic from "./computerLogic";
import {
  renderUI,
  renderBoard,
  renderWin,
  renderStart,
  replaceRightBoard,
} from "./renderUI";

renderUI();

let restart = 0;
let person;
let computer;

function win(wonPlayer) {
  renderWin(wonPlayer);
  const dialog = document.getElementById("modal");
  document.getElementById("button-container").addEventListener("click", (e) => {
    if (e.target.id === "left-btn") {
      e.preventDefault();
      replaceRightBoard();
      restart++;
      dialog.close();
      dialog.remove();
      return init();
    }
  });
}

function initComputerGame() {
  if (restart === 0) {
    person = new Player("person", true);
    computer = new Player("computer", false);
  } else {
    person.reset();
    computer.reset();
  }

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

  document.getElementById('right-board').addEventListener("click", (e) => {
    if (person.turn) {
      const coordinate = e.target.id;
      computer.board.receiveAttack(coordinate);
      renderBoard(computer);
      if (computer.board.fleetSunk()) {
        return win(person);
      }
      computer.turn = true;
      person.turn = false;
    }
    setTimeout(() => {
      if (computer.turn) {
        const coordinate = computerLogic(person.board);
        // person.board.receiveAttack(coordinate);
        // renderBoard(person);
        autoWin();

        renderBoard(person);

        if (person.board.fleetSunk()) {
          return win(computer);
        }
        person.turn = true;
        computer.turn = false;
      }
    }, 200);
  });
}

export default function init() {
  function renderStartHandler() {
    const dialog = document.getElementById("modal");

    document
      .getElementById("button-container")
      .addEventListener("click", (e) => {
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

  renderStart(renderStartHandler);
}

function autoWin() {
  const hits = [];
  person.board.board.forEach((row, rindex) => {
    row.forEach((col, cindex) => {
      if (
        col !== "missed" &&
        col !== "hit" &&
        col !== null &&
        !hits.includes(`${rindex}${cindex}`)
      ) {
        hits.push(`${rindex}${cindex}`);
        const nc = `${rindex}${cindex}`;
        person.board.receiveAttack(`${rindex}${cindex}`);
      }
    });
  });
}
