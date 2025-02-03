class Ship {
  constructor(isVertical) {
    this.isVertical = isVertical;
    this.damage = 0;
  }

  isSunk() {
    return this.length === this.damage;
  }

  hit() {
    if (!this.isSunk()) {
      this.damage++;
      this.isSunk;
    }
  }
}

// Ship SubClasses with lengths

export class Carrier extends Ship {
  constructor(isVertical) {
    super(isVertical);
    this.name = "carrier";
    this.length = 5;
  }
}

export class Battleship extends Ship {
  constructor(isVertical) {
    super(isVertical);
    this.name = "battleship";
    this.length = 4;
  }
}

export class Destroyer extends Ship {
  constructor(isVertical) {
    super(isVertical);
    this.name = "destroyer";
    this.length = 3;
  }
}

export class Submarine extends Ship {
  constructor(isVertical) {
    super(isVertical);
    this.name = "submarine";
    this.length = 3;
  }
}

export class Patrol extends Ship {
  constructor(isVertical) {
    super(isVertical);
    this.name = "patrol";
    this.length = 2;
  }
}

// module.exports = { Ship, Carrier, Battleship, Destroyer, Submarine, Patrol };
