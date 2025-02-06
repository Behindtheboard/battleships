import Player from "./gameboard";
import { renderBoard, renderShips } from "./renderUI";
import EventManager from "./eventManager";
import randomizeShipPlacement from "./randomizeShipPlacement";
import { playerShipPlacement } from "./playerShipPlacement";
import { win } from "./init";

// Battleship Game with computer as opponent
export function initComputerGame() {
  let gameover = false;
  const player1 = new Player("player1", "1", false);
  const computer = new Player("computer", "robo", false);

  renderBoard(player1, true);
  renderBoard(computer, true);
  renderShips(player1, true);

  playerShipPlacement(player1, computer);
  randomizeShipPlacement(computer);

  function turnSequence(e) {
    if (player1.turn) {
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
        return win(player1);
      }
      player1.turn = false;
      computer.turn = true;
    }
    if (computer.turn) {
      const coordinate = computerLogic(player1);
      setTimeout(() => {
        try {
          player1.receiveAttack(coordinate);
        } catch (error) {
          alert(error.message);
        }
        renderBoard(player1);
      }, 200);
      if (player1.fleetSunk()) {
        gameover = true;
        return win(computer);
      }
      computer.turn = false;
      player1.turn = true;
    }
    if (gameover) {
      document
        .getElementById("right-board")
        .removeEventListener("mousedown", turnSequence);
      return;
    }
  }
  document
    .getElementById("right-board")
    .addEventListener("mousedown", turnSequence);
}

const hits = [];
const hitShips = [];
// Returns coordinates of computer
export function computerLogic(opponent) {
  const oppBoard = opponent.board;
  function checkMissed(coordinate) {
    const [row, col] = coordinate.split("").map((n) => Number(n));
    if (oppBoard[row][col] === "missed") {
      return true;
    } else {
      return false;
    }
  }

  function addIfHit(coordinate) {
    const [row, col] = coordinate.split("").map((n) => Number(n));
    const coord = oppBoard[row][col];
    if (coord !== "missed" && coord !== "hit" && coord !== null) {
      hits.push(coordinate);
      hitShips.push(coord);
    }
  }

  function generateCoordinate() {
    while (true) {
      const row = Math.floor(Math.random() * 10).toString();
      const col = Math.floor(Math.random() * 10).toString();
      const coord = row + col;
      if (!checkMissed(coord) && !hits.includes(coord)) {
        addIfHit(coord);
        return coord;
      }
    }
  }

  function checkIsSunk(coordinate) {
    const [row, col] = coordinate.split("").map((n) => Number(n));
    const lastHitShip = hitShips[hitShips.length - 1];
    lastHitShip.isSunk() ? true : false;
  }

  function winCheat() {
    for (let rindex = 0; rindex < oppBoard.length; rindex++) {
      const row = oppBoard[rindex];
      for (let cindex = 0; cindex < row.length; cindex++) {
        const col = row[cindex];
        if (
          col !== "missed" &&
          col !== "hit" &&
          col !== null &&
          !hits.includes(`${rindex}${cindex}`)
        ) {
          hits.push(`${rindex}${cindex}`);
          const nc = `${rindex}${cindex}`;
          return nc;
        }
      }
    }
  }

  // return winCheat();

  if (hits.length === 0) {
    return generateCoordinate();
  }

  const hitsArrLength = hits.length - 1;
  const lastHit = hits[hitsArrLength];

  if (checkIsSunk(lastHit)) {
    return generateCoordinate();
  }

  return generateCoordinate();

  // const [row, col] = lastHit.split("").map((n) => Number(n));

  // let j;
  // let minusLength;
  // let newRow = row;
  // let newCol = col;

  // if (row + 1 > 0 && row + 1 < 10 && !checkMissed([row + 1] + [col])) {
  //   newRow = row + 1;
  // }
  // if (row - 1 > 0 && row - 1 < 10 && !checkMissed([row - 1] + [col])) {
  //   newRow = row - 1;
  // }
  // if (col + 1 > 0 && col + 1 < 10 && !checkMissed([row] + [col + 1])) {
  //   newCol = col + 1;
  // }
  // if (col - 1 > 0 && col - 1 < 10 && !checkMissed([row] + [col - 1])) {
  //   newCol = col - 1;
  // }

  // if (!hits.includes([newRow] + [newCol])) {
  //   addIfHit([newRow] + [newCol]);
  //   return [newRow] + [newCol];
  // }
}

export function resetHitsList() {
  hits.length = 0;
  hitShips.length = 0;
}

export function autoWin(player) {
  const hits = [];
  player.board.forEach((row, rindex) => {
    row.forEach((col, cindex) => {
      if (
        col !== "missed" &&
        col !== "hit" &&
        col !== null &&
        !hits.includes(`${rindex}${cindex}`)
      ) {
        hits.push(`${rindex}${cindex}`);
        player.receiveAttack(`${rindex}${cindex}`);
      }
    });
  });
}
