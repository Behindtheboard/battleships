import { Ship, Gameboard, Player } from "./objects";
import computerLogic from "./computerLogic";

const leftBoard = document.getElementById("left-board");
const rightBoard = document.getElementById("right-board");

function renderBoard(player) {
  const board = player.board.board;
  let computer;

  if (player.name === "computer") {
    computer = true;
    rightBoard.innerHTML = "";
  } else {
    computer = false;
    leftBoard.innerHTML = "";
  }

  board.forEach((row, rindex) => {
    row.forEach((col, cindex) => {
      const boxDiv = document.createElement("div");
      if (col === null) {
        boxDiv.style.backgroundColor = "grey";
      }
      if (col === "hit") {
        boxDiv.style.backgroundColor = "red";
      }
      if (col === "missed") {
        boxDiv.textContent = "X";
      }
      if (col !== null && col !== "hit" && col !== "missed") {
        computer
          ? (boxDiv.style.backgroundColor = "grey")
          : (boxDiv.style.backgroundColor = "green");
      }
      if (computer) {
        boxDiv.id = `${rindex}${cindex}`;
        rightBoard.appendChild(boxDiv);
      } else {
        leftBoard.appendChild(boxDiv);
      }
    });
  });
}

function win(lostplayer) {
  const winBoard = rightBoard.cloneNode(true);
  rightBoard.parentNode.replaceChild(winBoard, rightBoard);

  renderBoard(lostplayer);
}

export default function game() {
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
      console.log(coordinate);
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
