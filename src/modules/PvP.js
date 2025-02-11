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

// initialize event delegation class
const pvpEventManager = new EventManager();

// Battleship Game with computer as opponent
export function initPvP() {
  const player1 = new Player("player1", "1", false);
  const player2 = new Player("player2", "2", false);

  // Player 1 place ships
  renderBoard(player1, true);
  renderShips(player1, true);
  playerShipPlacement(player1, player2);
  // Start game turn sequence
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
        pvpEventManager.addListener(`#${div.id}`, "mousedown", turnSequence);
        // div.addEventListener("click", (e) => turnSequence(e));
      });
      setTimeout(() => {
        pvpEventManager.addListener("#left-btn", "click", passDevice);
      }, 200);
      player1.turn = true;
    }
  }
  // Logic for players to take turns attacking
  function turnSequence(matchingElement, e) {
    const coordinate = e.target.id;
    if (coordinate === "") return;
    let i = true;
    if (player1.turn) {
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
        pvpEventManager.cleanup()
        return win(player1);
      }
      setTimeout(() => {
        pvpEventManager.addListener("#left-btn", "click", passDevice);
      }, 200);
      renderDoneTurn();
    }
    if (player2.turn) {
      while (i) {
        try {
          player1.receiveAttack(coordinate);
        } catch (error) {
          return alert(error.message);
        }
        i = false;
      }
      renderBoard(player1, false, true);
      if (player1.fleetSunk()) {
        pvpEventManager.cleanup()
        return win(player2);
      }
      setTimeout(() => {
        pvpEventManager.addListener("#left-btn", "click", passDevice);
      }, 200);
      renderDoneTurn();
    }
    return;
  }
  // Button to finish turn and pass device
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
  // Triggered by opponent player once device is passed
  function switchPlayer(matchingElement, e) {
    if (matchingElement.textContent === "Done") {
      pvpEventManager.removeListener("#left-btn", "click", switchPlayer);
      if (player1.turn === true) {
        player1.turn = false;
        player2.turn = true;
        renderBoard(player1, false, true);
        renderBoard(player2, false, false);
      } else {
        player2.turn = false;
        player1.turn = true;
        renderBoard(player1, false, false);
        renderBoard(player2, false, true);
      }

      const dialog = document.getElementById("modal");
      dialog.close();
      dialog.remove();
      document.getElementById("modal-overlay").remove();
    }
  }
}
