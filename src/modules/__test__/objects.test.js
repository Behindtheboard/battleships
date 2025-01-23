const { Ship, Gameboard } = require("../objects");

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

  test("recievattack on 00 should hit carrier", () => {
    gameboard.receiveAttack("00");
    expect(gameboard.board[0][0]).toBe("hit");
  });

  test("should say already attacked", () => {
    gameboard.receiveAttack("01");
    expect(() => {
      gameboard.receiveAttack("01");
    }).toThrow("already attacked");
  });

  test("receiveattack should return false if miss", () => {
    gameboard.receiveAttack("99");
    console.log(gameboard.board)
    expect(gameboard.board[9][9]).toBe('missed');
  });
  
  test("receiveAttack should be true", () => {
    gameboard.receiveAttack("00");
    gameboard.receiveAttack("01");
    gameboard.receiveAttack("02");
    gameboard.receiveAttack("03");
    gameboard.receiveAttack("04");
    gameboard.receiveAttack("20");
    gameboard.receiveAttack("30");
    gameboard.receiveAttack("40");
    expect(gameboard.receiveAttack("50")).toBeTruthy()
  })

  test("fleetSunk should be true", () => {
    gameboard.receiveAttack("00");
    gameboard.receiveAttack("01");
    gameboard.receiveAttack("02");
    gameboard.receiveAttack("03");
    gameboard.receiveAttack("04");
    gameboard.receiveAttack("20");
    gameboard.receiveAttack("30");
    gameboard.receiveAttack("40");
    gameboard.receiveAttack("50");
    expect(gameboard.fleetSunk()).toBeTruthy()
  })
});
