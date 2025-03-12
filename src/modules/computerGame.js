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

  // * for testing
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
    try {
      computer.receiveAttack(coordinate);
    } catch (error) {
      return alert(error.message);
    }
    renderBoard(computer, false, true);
    if (computer.fleetSunk()) return triggerWin(player1);

    // Computer turn
    try {
      const test = computerLogic(player1);
      addIfHit(test, player1.board);
      player1.receiveAttack(test);
    } catch (error) {
      alert(error.message);
    }
    renderBoard(player1, false, false);
    if (player1.fleetSunk()) return triggerWin(computer);
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
// Add to hits object if computer coordinate hits ship
function addIfHit(coordStr, opponent) {
  const oppBoard = opponent;
  const [row, col] = coordStr.split("").map((n) => Number(n));
  const coordObj = oppBoard[row][col];
  if (coordObj !== "missed" && coordObj !== "hit" && coordObj !== null) {
    hits[coordStr] = coordObj;
    lastCoord = coordStr;
  }
}

// Returns coordinates of computer
export function computerLogic(opponent) {
  const oppBoard = opponent.board;
  // returns random coordinate when there's no last hit ship
  if (Object.keys(hits).length < 1) return genRandomCoord();
  // check for any remaining hit ships that are not sunk
  unsunkShip();
  // if last hit ship is sunk then generate coordinates avoiding sunk ship lengths
  if (lastIsSunk()) return genSmartCoord(opponent);
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
        return coordStr;
      }
    }
  }
  // checks if coordinate missed opponent ship
  function checkMissed(coordStr) {
    const [row, col] = coordStr.split("").map((n) => Number(n));
    return oppBoard[row][col] === "missed";
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
  // checks unsunk ship that was hit
  function unsunkShip() {
    for (let coordStr in hits) {
      if (!hits[coordStr].isSunk()) return (lastCoord = coordStr);
    }
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
      if (cMin - 1 >= 0 && !checkMissed(minCoord) && !hasHitShip(minCoord))
        return minCoord;

      if (cMax + 1 <= 9 && !checkMissed(maxCoord) && !hasHitShip(maxCoord))
        return maxCoord;
    }
    if (col) {
      const rowArr = Object.keys(rObj);
      const rMin = Number(Math.min(...rowArr));
      const rMax = Number(Math.max(...rowArr));
      const minCoord = (rMin - 1).toString() + col.toString();
      const maxCoord = (rMax + 1).toString() + col.toString();
      if (rMin - 1 >= 0 && !checkMissed(minCoord) && !hasHitShip(minCoord))
        return minCoord;

      if (rMax + 1 <= 9 && !checkMissed(maxCoord) && !hasHitShip(maxCoord))
        return maxCoord;
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
        return (adjacentCoord = coordStr);
      }
    });
    if (adjacentCoord) return adjacentCoord;
    return false;
  }
  // returns coordinates that avoid number of blanks spaces under sunk ship lengths
  function genSmartCoord(opponent) {
    let coordStr;
    const minLength = minShip();
    while (true) {
      coordStr = genRandomCoord();
      if (sideCheck(coordStr, minLength)) {
        return coordStr;
      }
    }
  }
  // returns a boolean if there are squares available
  function sideCheck(coordStr, minLength) {
    const moves = createMoves(coordStr, minLength);
    let emptyCnt = 0;
    let minLengthCnt = 0;
    for (let i = 0; i < moves.length - 1; i++) {
      const nextAtk = moves[i];
      const nextAtkStr = moves[i].join("");
      if (minLengthCnt === minLength) {
        emptyCnt = 0;
        minLengthCnt = 0;
      } else {
        minLengthCnt++;
      }
      if (
        nextAtk[0] >= 0 &&
        nextAtk[1] >= 0 &&
        nextAtk[0] + nextAtk[1] < 19 &&
        coordStr < 100 &&
        !checkMissed(nextAtkStr) &&
        !hasHitShip(nextAtkStr)
      ) {
        emptyCnt++;
      }
      if (emptyCnt === minLength) return true;
    }
    return false;
  }
  // Returns minimun square length to check
  function minShip() {
    const sunkShips = opponent.fleet
      .filter((ship) => ship.isSunk())
      .map((ship) => ship.length);
    const sunkShipsSort = [...sunkShips].sort();

    const five = [2, 3, 3, 4];
    if (sunkShipsSort === five) return 5;

    let count = 0;
    sunkShipsSort.forEach((num) => {
      if (num === 3) count++;
      if (num === 2) count++;
    });
    if (count === 3) return 4;

    if (sunkShipsSort.includes(2)) return 3;
    return 1;
  }
}

export function resetHitsList() {
  for (let coord in hits) {
    delete hits[coord];
  }
}

// return function with coordinate around a potential coordinate
function createMoves(coordStr, num) {
  const [row, col] = coordStr.split("").map((n) => Number(n));
  const queue = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j <= num; j++) {
      const moves = testAdj(j + 1);
      const coord = [row + moves[i][0], col + moves[i][1]];
      queue.push(coord);
    }
  }
  if (num > 2) {
    let cross;
    if (num === 3) cross = testThree();
    if (num === 4) cross = testFour();
    if (num === 5) cross = testFive();

    cross.forEach((e) => {
      const coord = [row + e[0], col + e[1]];
      queue.push(coord);
    });
  }

  function testAdj(num) {
    return [
      [-num, 0],
      [num, 0],
      [0, -num],
      [0, num],
    ];
  }

  function testThree() {
    return [
      [-1, 0],
      [0, 0],
      [+1, 0],
      [0, -1],
      [0, 0],
      [0, +1],
    ];
  }

  function testFour() {
    return [
      [-2, 0],
      [-1, 0],
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, 0],
      [1, 0],
      [2, 0],
      [0, -2],
      [0, -1],
      [0, 0],
      [0, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [0, 2],
    ];
  }

  function testFive() {
    return [
      [-2, 0],
      [-1, 0],
      [0, 0],
      [1, 0],
      [2, 0],
      [0, -2],
      [0, -1],
      [0, 0],
      [0, 1],
      [0, 2],
    ];
  }

  return queue;
}
