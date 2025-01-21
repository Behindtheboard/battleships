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
  let carrier;
  let battleship;

  beforeEach(() => {
    gameboard = new Gameboard();
    carrier = new Ship("carrier", false);
    battleship = new Ship("battleship", true);
    gameboard.placeShip("00", carrier);
    gameboard.placeShip("20", battleship);
  });

  test("carrier at coordinate 00 should fill first 5 indecies in first array", () => {
    expect(gameboard.board[0]).toEqual([
      carrier,
      carrier,
      carrier,
      carrier,
      carrier,
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  test("battleship should fill the first index of 4 arrays from the 2nd", () => {
    const test = gameboard.board.slice(2, 4).every((row) => {
      console.log(row[0]);
      return row[0] === battleship;
    });
    expect(test).toBeTruthy();
  });

  test("should return error when trying to place ship on another ship", () => {
    let destroyer = new Ship("destroyer", true);
    expect(() => {
      gameboard.placeShip("01", destroyer);
    }).toThrow("ship already there");
  });

});
