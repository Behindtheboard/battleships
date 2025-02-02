const { Carrier, Battleship } = require("../ship");

describe("Ship object class methods and properties", () => {
  let carrier;
  let battleship;

  beforeEach(() => {
    carrier = new Carrier(false);
    battleship = new Battleship(true);
  });

  it("should output the name", () => {
    expect(carrier.name).toBe("carrier");
  });

  it("should output the name", () => {
    expect(battleship.name).toBe("battleship");
  });

  it("should have length of 5", () => {
    expect(carrier.length).toEqual(5);
  });

  it("should have length of 5", () => {
    expect(battleship.length).toEqual(4);
  });

  test("isSunk() should be false", () => {
    expect(carrier.isSunk()).toBeFalsy();
  });

  test("isSunk() should be false", () => {
    expect(battleship.isSunk()).toBeFalsy();
  });

  test("hit() should add to damage property", () => {
    carrier.hit();
    expect(carrier.damage).toEqual(1);
  });

  test("hit() should add to damage property", () => {
    battleship.hit();
    expect(battleship.damage).toEqual(1);
  });

  test("isVertical should be true", () => {
    expect(battleship.isVertical).toBeTruthy();
  });
});
