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



module.exports = Ship;
