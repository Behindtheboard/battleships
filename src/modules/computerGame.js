import Player from "./gameboard";
import { renderBoard, renderShips } from "./renderUI";
import EventManager from "./eventManager";
import randomizeShipPlacement from "./randomizeShipPlacement";
import { playerShipPlacement } from "./playerShipPlacement";
import { win } from "./init";

// initialize event delegation class
const compEventManager = new EventManager();

// Battleship Game with computer as opponent
export function initComputerGame() {
  const player1 = new Player("player1", "1", false);
  const computer = new Player("computer", "robo", false);

  renderBoard(player1, true, false);
  renderShips(player1, true);

  playerShipPlacement(player1, computer);
  randomizeShipPlacement(computer);

  compEventManager.addListener(`#right-board`, "mousedown", turnSequence);

  function turnSequence(matchingElement, e) {
    const coordinate = e.target.id;
    if (coordinate === "") return;
    let i = true;
    // Player1 turn
    while (i) {
      try {
        computer.receiveAttack(coordinate);
      } catch (error) {
        return alert(error.message);
      }
      i = false;
    }
    renderBoard(computer, false, true);
    if (computer.fleetSunk()) return triggerWin(player1);

    // Computer turn
    setTimeout(() => {
      try {
        player1.receiveAttack(computerLogic(player1));
      } catch (error) {
        alert(error.message);
      }
      renderBoard(player1, false, false);
      if (player1.fleetSunk()) return triggerWin(computer);
    }, 200);
  }

  function triggerWin(wonPlayer) {
    resetHitsList();
    compEventManager.cleanup();
    win(wonPlayer);
  }
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

  return winCheat();

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
