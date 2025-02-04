class Gameboard {
  constructor() {
    this.board = this.createBoard(10);
    this.fleet = [];
  }

  createBoard(n) {
    return [...Array(n)].map((row) => Array(n).fill(null));
  }

  placeShip(coordinate, ship) {
    const [row, col] = coordinate.split("").map((n) => Number(n));
    const length = ship.length;

    let ob;
    ship.isVertical ? (ob = row + length) : (ob = col + length);

    this.board.forEach((row, rindex) => {
      row.forEach((col, cindex) => {
        if (col !== null) {
          if (col.name === ship.name) {
            this.board[rindex][cindex] = null;
          }
        }
      });
    });

    if (ob > 10) {
      throw new Error("out of bounds");
    }

    let r = row;
    let c = col;
    for (let i = 0; i < length; i++) {
      ship.isVertical ? (r = row + i) : (c = col + i);
      if (this.board[r][c] !== null) {
        throw new Error("ship already there");
      }
    }

    for (let i = 0; i < length; i++) {
      ship.isVertical ? (r = row + i) : (c = col + i);
      this.board[r][c] = ship;
    }

    this.fleet.push(ship);
    console.log(this.board);
  }

  removeShip(shipID) {
    this.board.forEach((row, rindex) => {
      row.forEach((col, cindex) => {
        if (col !== null) {
          if (col.name === shipID) {
            this.board[rindex][cindex] = null;
          }
        }
      });
    });

    this.fleet.forEach((ship, index) => {
      if (ship.name === shipID) {
        this.fleet.splice(index, 1);
        console.log(this.fleet);
      }
    });
  }

  receiveAttack(coordinate) {
    const hitBox = this.board[coordinate[0]][coordinate[1]];
    if (hitBox === null) {
      return (this.board[coordinate[0]][coordinate[1]] = "missed");
    }
    if (hitBox === "hit" || hitBox === "missed") {
      throw new Error(`already attacked ${coordinate}`);
    }
    hitBox.hit();
    this.board[coordinate[0]][coordinate[1]] = `hit`;
    return this.fleetSunk();
  }

  fleetSunk() {
    return this.fleet.every((ship) => {
      return ship.isSunk() === true;
    });
  }
}

export default class Player extends Gameboard {
  constructor(name, alt, turn) {
    super();
    this.name = name;
    this.turn = turn;
    this.alt = alt;
  }
}

// module.exports = { Gameboard, Player };
