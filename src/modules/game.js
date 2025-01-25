import { Ship, Gameboard, Player } from "./objects";
import computerLogic from "./computerLogic";
import { renderUI, renderBoard, renderWin, renderStart } from "./renderUI";

renderUI();

const leftBoard = document.getElementById("left-board");
const rightBoard = document.getElementById("right-board");

function win(lostplayer) {
  const winBoard = rightBoard.cloneNode(true);
  rightBoard.parentNode.replaceChild(winBoard, rightBoard);
  renderBoard(lostplayer);
  renderWin();
}

function initComputerGame() {
  const person = new Player("person", true);
  const computer = new Player("computer", false);

  person.placeCarrier("00", false);
  person.placeBattleship("22", true);
  person.placeDestroyer("67", false);
  person.placeSubmarine("46", false);
  person.placePatrol("96", false);

  computer.placeCarrier("00", false);
  computer.placeBattleship("22", true);
  computer.placeDestroyer("67", false);
  computer.placeSubmarine("46", false);
  computer.placePatrol("96", false);

  renderBoard(person);
  renderBoard(computer);

  rightBoard.addEventListener("click", (e) => {
    if (person.turn) {
      const coordinate = e.target.id;
      computer.board.receiveAttack(coordinate);
      renderBoard(computer);
      if (computer.board.fleetSunk()) {
        return win(computer);
      }
      computer.turn = true;
      person.turn = false;
    }
    setTimeout(() => {
      if (computer.turn) {
        const coordinate = computerLogic(person.board);
        // console.log(coordinate);
        person.board.receiveAttack(coordinate);
        renderBoard(person);
        if (person.board.fleetSunk()) {
          return win(person);
        }
        person.turn = true;
        computer.turn = false;
      }
    }, 200);
  });
}

export default function init() {
  renderStart();

  const dialog = document.getElementById("modal");

  document.getElementById("button-container").addEventListener("click", (e) => {
    if (e.target.id === "left-btn") {
      e.preventDefault();
      dialog.close();
      dialog.remove()
      document.getElementById('modal-overlay').remove()
      return initComputerGame();
    }

    if (e.target.id === "right-btn") {
      e.preventDefault();
      return console.log("computer game only available");
    }
  });
}
