const hits = [];
const hitShips = [];

export function computerLogic(opponentBoard) {
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
  player.board.board.forEach((row, rindex) => {
    row.forEach((col, cindex) => {
      if (
        col !== "missed" &&
        col !== "hit" &&
        col !== null &&
        !hits.includes(`${rindex}${cindex}`)
      ) {
        hits.push(`${rindex}${cindex}`);
        player.board.receiveAttack(`${rindex}${cindex}`);
      }
    });
  });
}
