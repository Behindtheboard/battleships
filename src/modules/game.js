import { Ship, Gameboard, Player } from "./objects";
import computerLogic from "./computerLogic";

const leftBoard = document.getElementById("left-board");
const rightBoard = document.getElementById("right-board");

function renderBoard(player) {
  const board = player.board.board;
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
      if (player.name !== "computer") {
        boxDiv.id = `${rindex}${cindex}`;
        if (col !== null && col !== "hit" && col !== "missed") {
          boxDiv.style.backgroundColor = "green";
        }
        leftBoard.appendChild(boxDiv);
      }
    });
  });
}

export default function game() {
  const person = new Player("person");

  renderBoard(person);
}
