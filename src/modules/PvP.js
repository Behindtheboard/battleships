import Player from "./gameboard";
import { renderBoard, renderShips } from "./renderUI";
import EventManager from "./eventManager";
import randomizeShipPlacement from "./randomizeShipPlacement";
import { playerShipPlacement } from "./playerShipPlacement";
import { win } from "./init";

const eventManager = new EventManager();

// Battleship Game with computer as opponent
export function initPvP() {
  let gameover = false;
  const player1 = new Player("player1", "1", false);
  const computer = new Player("computer", "robo", false);

  renderBoard(player1, true);
  renderBoard(computer, true);
  renderShips(player1, true);

  playerShipPlacement(player1, computer);
  randomizeShipPlacement(computer);

  function turnSequence(e) {
    if (player1.turn) {
      const coordinate = e.target.id;
      let i = true;
      while (i) {
        try {
          computer.receiveAttack(coordinate);
        } catch (error) {
          return alert(error.message);
        }
        i = false;
      }
      renderBoard(computer);
      if (computer.fleetSunk()) {
        gameover = true;
        return win(player1);
      }
      player1.turn = false;
      computer.turn = true;
    }
    if (computer.turn) {
      const coordinate = computerLogic(player1);
      setTimeout(() => {
        try {
          player1.receiveAttack(coordinate);
        } catch (error) {
          alert(error.message);
        }
        renderBoard(player1);
      }, 200);
      if (player1.fleetSunk()) {
        gameover = true;
        return win(computer);
      }
      computer.turn = false;
      player1.turn = true;
    }
    if (gameover) {
      document
        .getElementById("right-board")
        .removeEventListener("mousedown", turnSequence);
      return;
    }
  }
  document
    .getElementById("right-board")
    .addEventListener("mousedown", turnSequence);
}
