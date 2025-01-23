export class Ship {
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

export class Gameboard {
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
    if (row + length > 9 || col + length > 9) {
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
  }

  receiveAttack(coordinate) {
    const hitBox = this.board[coordinate[0]][coordinate[1]];
    if (hitBox === null) {
      return (this.board[coordinate[0]][coordinate[1]] = "missed");
    }
    if (hitBox === "hit" || hitBox === "missed") {
      throw new Error("already attacked");
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

export class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }
}

module.exports = { Ship, Gameboard };


