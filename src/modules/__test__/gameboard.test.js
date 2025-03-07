const { Gameboard, Player } = require("../gameboard");

const { Carrier, Battleship, Destroyer } = require("../ship");

describe("Gameboard object class methods and properties", () => {
  let gameboard;
  let carrier;
  let battleship;
  let person;

  beforeEach(() => {
    person = new Player("person", false);
    gameboard = new Gameboard();
    carrier = new Carrier(false);
    battleship = new Battleship(true);
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
    let destroyer = new Destroyer(true);
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
    expect(gameboard.board[9][9]).toBe("missed");
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
    expect(gameboard.receiveAttack("50")).toBeTruthy();
  });

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
    expect(gameboard.fleetSunk()).toBeTruthy();
  });

  describe("Player object class methods and properties", () => {
    beforeEach(() => {
      person.placeShip("00", new Carrier(false));
    });

    test("person.fleet should access superclass gameboard fleet", () => {
      expect(person.fleet.length).toBe(1);
    });

    test("carrier at coordinate 00 should fill first 5 indecies in first array", () => {
      expect(person.board[0]).toEqual([
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

    test("recievattack on 00 should hit carrier", () => {
      person.receiveAttack("00");
      expect(person.board[0][0]).toBe("hit");
    });
  });
});
