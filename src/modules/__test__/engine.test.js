const { Ship, Gameboard } = require("../engine");

describe("Ship object class methods and properties", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship("carrier", true);
  });

  it("should output the name", () => {
    expect(ship.name).toBe("carrier");
  });

  it("should have length of 5", () => {
    expect(ship.length).toEqual(5);
  });

  test("isSunk() should be false", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test("hit() should add to damage property", () => {
    ship.hit();
    expect(ship.damage).toEqual(1);
  });

  test("isVertical should be true", () => {
    expect(ship.isVertical).toBeTruthy();
  });
});

describe("Gameboard object class methods and properties", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });
});
