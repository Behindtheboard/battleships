class Ship {
  constructor(isVertical) {
    this.name = this.name;
    this.length = this.calcLength();
    this.isVertical = isVertical;
    this.damage = 0;
    this.sunk = false;
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
    if (this.length === this.damage) {
      this.sunk = true;
    }
  }

  hit() {
    if (!this.isSunk()) {
      this.damage++;
      this.isSunk();
    }
  }
}

