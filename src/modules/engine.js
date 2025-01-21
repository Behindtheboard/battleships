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
    this.fleet = []
  }

  createBoard(n) {
    return [...Array(n)].map((row) => Array(n).fill(null));
  }

  placeShip(coordinate, ship) {
    const row = coordinate[0];
    const col = coordinate[1];
    const length = ship.length;
    if (Number(row) + length > 9 || Number(col) + length > 9) {
      return console.error("out of bounds");
    }
    this.fleet.push(ship)
    if (ship.isVertical) {
      for (let i = row; i <= ship.length; i++) {
        this.board[i][col] = ship;
      }
    } else {
      for (let i = col; i <= ship.length; i++) {
        this.board[row][i] = ship;
      }
    }
  }

  recieveAttack(coordinate) {
    const hitBox = this.board[coordinate[0]][coordinate[1]];
    console.log(hitBox);
    if (hitBox !== null) {
      hitBox.hit();
      return (this.board[coordinate[0]][
        coordinate[1]
      ] = `hit ${hitBox.name[0]}`);
    } else {
      if (hitBox === "hit") {
        return console.error("already attacked");
      }
      this.board[coordinate[0]][coordinate[1]] = "missed";
    }
  }

  fleetSunk() {

  }
}



const carrier = new Ship("carrier", false);
const test = new Gameboard();

test.placeShip("00", carrier);
test.recieveAttack("00");

console.log(test.board);

module.exports = { Ship, Gameboard };
