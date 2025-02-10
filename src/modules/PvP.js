import Player from "./gameboard";
import {
  renderBoard,
  renderShips,
  renderPassDevice,
  renderPlayerStart,
  renderDoneTurn,
} from "./renderUI";
import EventManager from "./eventManager";
import { playerShipPlacement } from "./playerShipPlacement";
import { win } from "./init";
import randomizeShipPlacement from "./randomizeShipPlacement";

const pvpEventManager = new EventManager();

// Battleship Game with computer as opponent
export function initPvP() {
  let gameover = false;
  const player1 = new Player("player1", "1", false);
  const player2 = new Player("player2", "2", false);

  // Player 1 place ships
  // renderBoard(player1, true);
  // renderShips(player1, true);
  // playerShipPlacement(player1, player2);

  randomizeShipPlacement(player1);
  randomizeShipPlacement(player2);
  renderBoard(player1, false, false);
  renderShips(player1, false);
  renderBoard(player2, false, true);
  renderShips(player2, false);
  renderPlayerStart(player1);

  pvpEventManager.addListener("#left-btn", "click", startTurnSquence);

  function startTurnSquence(matchingElement, e) {
    if (matchingElement.textContent === "Okay") {
      pvpEventManager.removeListener("#left-btn", "click", startTurnSquence);
      const dialog = document.getElementById("modal");
      dialog.close();
      dialog.remove();
      document.getElementById("modal-overlay").remove();
      // Listener on both boards and triggers play.turn to allow attack
      const boards = document.querySelectorAll(
        '#boards-container div[id$="-board"]'
      );
      boards.forEach((div) => {
        console.log(div.id);
        pvpEventManager.addListener(`#${div.id}`, "mousedown", turnSequence);
        // div.addEventListener("click", (e) => turnSequence(e));
      });
      setTimeout(() => {
        pvpEventManager.addListener("#left-btn", "click", passDevice);
      }, 200);
      player1.turn = true;
    }
  }

  function turnSequence(matchingElement, e) {
    console.log(matchingElement.id);
    console.log(e.target.id);
    if (player1.turn) {
      const coordinate = e.target.id;
      let i = true;
      while (i) {
        try {
          player2.receiveAttack(coordinate);
        } catch (error) {
          alert(error.message);
          return;
        }
        i = false;
      }
      renderBoard(player2, false, true);
      if (player2.fleetSunk()) {
        gameover = true;
        return win(player1);
      }
      player1.turn = false;
      renderDoneTurn();
    }
    if (player2.turn) {
      const coordinate = e.target.id;
      let i = true;
      while (i) {
        try {
          player2.receiveAttack(coordinate);
        } catch (error) {
          return alert(error.message);
        }
        i = false;
      }
      renderBoard(player1, false, true);
      if (player1.fleetSunk()) {
        gameover = true;
        return win(computer);
      }
      player2.turn = false;
      renderDoneTurn();
    }
    if (gameover) {
      document
        .getElementById("right-board")
        .removeEventListener("mousedown", turnSequence);
      return;
    }
    return;
  }

  function passDevice(matchingElement, e) {
    if (matchingElement.textContent === "Done") {
      pvpEventManager.removeListener("#left-btn", "click", passDevice);
      const dialog = document.getElementById("modal");
      dialog.close();
      dialog.remove();
      renderPassDevice();
      setTimeout(() => {
        pvpEventManager.addListener("#left-btn", "click", switchPlayer);
      }, 200);
    }
  }

  function switchPlayer(matchingElement, e) {
    if (matchingElement.textContent === "Done") {
      pvpEventManager.removeListener("#left-btn", "click", switchPlayer);

      if (player1.turn === true) {
        player1.turn === false;
        renderBoard(player1, false, false);
        renderBoard(player2, false, true);
      }
      if (player2.turn === true) {
        player2.turn === false;
        renderBoard(player1, false, true);
        renderBoard(player2, false, false);
      }

      const dialog = document.getElementById("modal");
      dialog.close();
      dialog.remove();
      document.getElementById("modal-overlay").remove();
    }
  }
}
