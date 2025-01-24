const hits = [];
const hitShips = []

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
    const coord = oppBoard[row][col];
    if (
      coord !== "missed" &&
      coord !== "hit" &&
      coord !== null
    ) {
      hits.push(coordinate);
      hitShips.push(coord)
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
    const lastHitShip = hitShips[hitShips.length-1]
    console.log(lastHitShip)
    lastHitShip.isSunk() ? true : false;
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
    !checkMissed([row + 1] + [col]) ||
    !hits.includes([row + 1] + [col])
  ) {
    addIfHit([row + 1] + [col]);
    return [row + 1] + [col];
  }

  if (
    !checkMissed([row - 1] + [col]) ||
    !hits.includes([row - 1] + [col])
  ) {
    addIfHit([row + 1] + [col]);
    return [row + 1] + [col];
  }

  if (
    !checkMissed([row] + [col + 1]) ||
    !hits.includes([row] + [col + 1])
  ) {
    addIfHit([row] + [col + 1]);
    return [row] + [col + 1];
  }
  
  if (
    !checkMissed([row] + [col - 1]) ||
    !hits.includes([row] + [col - 1])
  ) {
    addIfHit([row] + [col - 1]);
    return [row] + [col - 1];
  }
}