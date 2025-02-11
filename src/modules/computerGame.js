import Player from "./gameboard";
import { renderBoard, renderShips, renderTitles } from "./renderUI";
import EventManager from "./eventManager";
import randomizeShipPlacement from "./randomizeShipPlacement";
import { playerShipPlacement } from "./playerShipPlacement";
import { win } from "./init";

const coordRegex = /\d.*?\d/;
// initialize event delegation class
const compEventManager = new EventManager();

// Battleship Game with computer as opponent
export function initComputerGame() {
  const player1 = new Player("Player", "1", false);
  const computer = new Player("Bot", "robo", false);
  renderTitles(player1, computer);

  renderBoard(player1, true, false);
  renderShips(player1, true);
  playerShipPlacement(player1, computer);
  randomizeShipPlacement(computer);

  // *test
  // randomizeShipPlacement(player1);
  // renderBoard(player1, false, false);
  // renderShips(player1, false);
  // renderBoard(computer, false, true);
  // renderShips(computer, false);

  compEventManager.addListener(`#right-board`, "mousedown", turnSequence);

  function turnSequence(matchingElement, e) {
    const coordinate = e.target.id;
    if (!coordRegex.test(coordinate)) return;
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

  // generates random coordinates
  function genRandomCoord() {
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

  // checks if coordinate missed opponent ship
  function checkMissed(coordinate) {
    const [row, col] = coordinate.split("").map((n) => Number(n));
    if (oppBoard[row][col] === "missed") {
      return true;
    } else {
      return false;
    }
  }
  // add to hit's array if coordinate hits
  function addIfHit(coordinate) {
    const [row, col] = coordinate.split("").map((n) => Number(n));
    const coord = oppBoard[row][col];
    if (coord !== "missed" && coord !== "hit" && coord !== null) {
      hits.push(coordinate);
      hitShips.push(coord);
    }
  }
  // checks if the lasthit ship is sunk
  function lastIsSunk() {
    const lastHitShip = hitShips[hitShips.length - 1];
    return lastHitShip.isSunk();
  }

  // Get random coordinate when there's no last hit ship
  if (hits.length === 0) return genRandomCoord();

  const lastHit = hits[hits.length - 1];
  const lastHitShip = hitShips[hitShips.length - 1];
  function checkDmgShip() {
    const damagedShip = hitShips.filter((ship) => {
      return ship === lastHitShip;
    });
    if (damagedShip.length < 2) return false;
  }

  // if last hit ship is sunk then generate random coordinate
  if (lastIsSunk()) {
    // ** I think this is a spot where we check last hit ship length
    return genRandomCoord();
  }
  //
  const nextHit = adjacentAtk();
  if (!nextHit) return nextHit;

  function adjacentAtk() {
    const [row, col] = lastHit.split("").map((n) => Number(n));
    const moves = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    let adjacentCoord = false;
    moves.forEach((nextAtk) => {
      const stringCoord = nextAtk.join("");
      if (adjacentCoord) return;
      if (
        nextAtk[0] + nextAtk[1] < 19 &&
        nextAtk[0] * nextAtk[1] >= 0 &&
        coordRegex.test(stringCoord) &&
        !checkMissed(stringCoord) &&
        !hits.includes(stringCoord)
      ) {
        console.log(stringCoord);
        console.log(!hits.includes(stringCoord));
        console.log(coordRegex.test(stringCoord));
        addIfHit(stringCoord);
        adjacentCoord = stringCoord;
        return;
      }
    });
    console.log(adjacentCoord);
    if (adjacentCoord) return adjacentCoord;
    return false;
  }

  //* for testing
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
