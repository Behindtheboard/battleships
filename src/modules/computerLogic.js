const hits = [];
const hitShips = [];

export default function computerLogic(opponentBoard) {
  const oppBoard = opponentBoard.board;
  function checkMissed(coordinate) {
    const [row, col] = coordinate.split("").map((n) => Number(n));
    // console.log("checkmissed " + oppBoard[row][col]);
    // console.log("checkmissed " + coordinate);
    if (oppBoard[row][col] === "missed") {
      return true;
    } else {
      return false;
    }
  }

  function addIfHit(coordinate) {
    const [row, col] = coordinate.split("").map((n) => Number(n));
    const coord = oppBoard[row][col];
    // console.log("addifhit " + oppBoard[row][col]);
    // console.log("addifhit " + coordinate);
    if (coord !== "missed" && coord !== "hit" && coord !== null) {
      hits.push(coordinate);
      hitShips.push(coord);
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
    const lastHitShip = hitShips[hitShips.length - 1];
    // console.log(lastHitShip.isSunk());
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
