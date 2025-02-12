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

  // renderBoard(player1, true, false);
  // renderShips(player1, true);
  // playerShipPlacement(player1, computer);
  randomizeShipPlacement(computer);

  // * for testing
  randomizeShipPlacement(player1);
  renderBoard(player1, false, false);
  renderShips(player1, false);
  renderBoard(computer, false, true);
  renderShips(computer, false);

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
        const test = computerLogic(player1);
        console.log(test)
        player1.receiveAttack(test);
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
// object that saves hit ships with {coordinate:shipObj} pair
const hits = {};
let lastCoord;
// Returns coordinates of computer
export function computerLogic(opponent) {
  console.log("-------New coord-----");
  const oppBoard = opponent.board;
  // returns random coordinate when there's no last hit ship
  if (Object.keys(hits).length < 1) return genRandomCoord();
  // if last hit ship is sunk then generate random coordinate
  if (lastIsSunk()) {
    // ** I think this is a spot where we check last hit ship length
    return genRandomCoord();
  }
  // returns last hit ship front and end coordinate
  const shipEnds = dmgShipCoords();
  if (shipEnds) return shipEnds;
  // Get the coordinates around the coordinate of last hit ship
  const nextHit = adjacentAtk();
  if (nextHit) return nextHit;

  // generates random coordinates
  function genRandomCoord() {
    while (true) {
      const row = Math.floor(Math.random() * 10).toString();
      const col = Math.floor(Math.random() * 10).toString();
      const coordStr = row + col;
      if (!checkMissed(coordStr) && !hasHitShip(coordStr)) {
        addIfHit(coordStr);
        return coordStr;
      }
    }
  }
  // checks if coordinate missed opponent ship
  function checkMissed(coordStr) {
    const [row, col] = coordStr.split("").map((n) => Number(n));
    if (oppBoard[row][col] === "missed") {
      return true;
    } else {
      return false;
    }
  }
  // add to hit's array if coordinate hits
  function addIfHit(coordStr) {
    const [row, col] = coordStr.split("").map((n) => Number(n));
    const coordObj = oppBoard[row][col];
    if (coordObj !== "missed" && coordObj !== "hit" && coordObj !== null) {
      hits[coordStr] = coordObj;
      lastCoord = coordStr;
    }
  }
  // checks if coordinate has already hit ship
  function hasHitShip(coordStr) {
    return coordStr in hits;
  }
  // checks if all ships sunk in hits obj
  function lastIsSunk() {
    return hits[lastCoord].isSunk();
  }
  // returns the string coordinate of last hit ship
  function lastHitStr() {
    return lastCoord;
  }
  // returns coordinate of the rest of last hit ships
  function dmgShipCoords() {
    const lastHitShipDmg = hits[lastHitStr()].damage;
    if (lastHitShipDmg < 2) return false;
    const shipCoords = Object.fromEntries(
      Object.entries(hits).filter(
        ([coord, ship]) => ship === hits[lastHitStr()]
      )
    );
    const rObj = {};
    const cObj = {};
    let row;
    let col;
    Object.keys(shipCoords).forEach((coord) => {
      rObj[coord[0]] = (rObj[coord[0]] || 0) + 1;
      cObj[coord[1]] = (cObj[coord[1]] || 0) + 1;
    });
    for (let num in rObj) {
      if (rObj[num] > 1) row = num;
    }
    for (let num in cObj) {
      if (cObj[num] > 1) col = num;
    }
    if (row) {
      const colArr = Object.keys(cObj);
      const cMin = Number(Math.min(...colArr));
      const cMax = Number(Math.max(...colArr));
      const minCoord = row.toString() + (cMin - 1).toString();
      const maxCoord = row.toString() + (cMax + 1).toString();
      if (cMin >= 0 && !checkMissed(minCoord) && !hasHitShip(minCoord)) {
        addIfHit(minCoord);
        return minCoord;
      }
      if (cMax <= 9 && !checkMissed(maxCoord) && !hasHitShip(maxCoord)) {
        addIfHit(maxCoord);
        return maxCoord;
      }
    }
    if (col) {
      const rowArr = Object.keys(rObj);
      const rMin = Number(Math.min(...rowArr));
      const rMax = Number(Math.max(...rowArr));
      const minCoord = (rMin - 1).toString() + col.toString();
      const maxCoord = (rMax + 1).toString() + col.toString();
      if (rMin >= 0 && !checkMissed(minCoord) && !hasHitShip(minCoord)) {
        addIfHit(minCoord);
        return minCoord;
      }
      if (rMax <= 9 && !checkMissed(maxCoord) && !hasHitShip(maxCoord)) {
        addIfHit(maxCoord);
        return maxCoord;
      }
    }
    return null;
  }
  // returns adjecent coordinates of last hit spot of ship
  function adjacentAtk() {
    const [row, col] = lastHitStr()
      .split("")
      .map((n) => Number(n));
    const moves = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    let adjacentCoord = false;
    moves.forEach((nextAtk) => {
      const coordStr = nextAtk.join("");
      if (adjacentCoord) return;
      if (
        nextAtk[0] + nextAtk[1] < 19 &&
        nextAtk[0] * nextAtk[1] >= 0 &&
        coordStr < 100 &&
        !checkMissed(coordStr) &&
        !hasHitShip(coordStr)
      ) {
        addIfHit(coordStr);
        adjacentCoord = coordStr;
        return;
      }
    });
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
          !hasHitShip(`${rindex}${cindex}`)
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
  for (let coord in hits) {
    delete hits[coord];
  }
}

export function autoWin(player) {
  const hits = [];
  player.board.forEach((row, rindex) => {
    row.forEach((col, cindex) => {
      if (
        col !== "missed" &&
        col !== "hit" &&
        col !== null &&
        !hasHitShip(`${rindex}${cindex}`)
      ) {
        hits.push(`${rindex}${cindex}`);
        player.receiveAttack(`${rindex}${cindex}`);
      }
    });
  });
}
