import { Ship, Gameboard, Player } from "./objects";

const test = new Player("test", false);

const hits = [];

export default function computerLogic(opponentBoard) {
  const oppBoard = opponentBoard.board;

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
    const nextAttack = oppBoard[row][col];
    if (
      nextAttack !== "missed" &&
      nextAttack !== "hit" &&
      nextAttack !== null
    ) {
      hits.push(coordinate);
    }
  }

  function generateCoordinate() {
    let i = 0;
    while (i < 1) {
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
    oppBoard[row][col].isSunk() ? true : false;
  }

  if (hits.length === 0) {
    return generateCoordinate();
  }

  const lastHit = hits[hits.length - 1];

  if (checkIsSunk(lastHit)) {
    return generateCoordinate();
  }

  const [row, col] = lastHit.split("").map((n) => Number(n));

  if (
    !checkMissed(oppBoard[row + 1][col]) &&
    !hits.includes([row + 1] + [col])
  ) {
    addIfHit([row + 1] + [col]);
    return [row + 1] + [col];
  }

  if (
    !checkMissed(oppBoard[row - 1][col]) &&
    !hits.includes([row - 1] + [col])
  ) {
    addIfHit([row + 1] + [col]);
    return [row + 1] + [col];
  }

  if (
    !checkMissed(oppBoard[row][col + 1]) &&
    !hits.includes([row] + [col + 1])
  ) {
    addIfHit([row] + [col + 1]);
    return [row] + [col + 1];
  }
  
  if (
    !checkMissed(oppBoard[row][col - 1]) &&
    !hits.includes([row] + [col - 1])
  ) {
    addIfHit([row] + [col - 1]);
    return [row] + [col - 1];
  }
}

computerLogic(test.board);
