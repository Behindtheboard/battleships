class Ship {
  constructor(name, isVertical) {
    this.name = name;
    this.length = this.calcLength();
    this.isVertical = isVertical;
    this.damage = 0;
  }

  calcLength() {
    switch (this.name) {
      case "carrier":
        return 5;
      case "battleship":
        return 4;
      case "destroyer":
        return 3;
      case "submarine":
        return 3;
      case "patrolBoat":
        return 2;
    }
  }

  isSunk() {
    return this.length === this.damage;
  }

  hit() {
    if (!this.isSunk()) {
      this.damage++;
      this.isSunk();
    }
  }
}

class Gameboard {
  constructor() {
    this.board = this.createBoard(10);
  }

  createBoard(n) {
    return [...Array(n)].map((row) => Array(n).fill(null));
  }

  placeShip(coordinate, ship) {
    const row = coordinate[0];
    const col = coordinate[1];
    const length = ship.length;
    if (Number(row) + length > 9 || Number(col) + length > 9) {
      return console.error('out of bounds')
    }
    let i;
    if (ship.isVertical) {
      for (let i = row; i <= ship.length; i++) {
        this.board[i][col] = ship.name;
      }
    } else {
      for (let i = col; i <= ship.length; i++) {
        this.board[row][i] = ship.name;
      }
    }
  }
}

const carrier = new Ship("carrier", false);
const test = new Gameboard();

test.placeShip("12", carrier);
console.log(test.board);

module.exports = { Ship, Gameboard };
