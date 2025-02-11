import { initComputerGame, resetHitsList } from "./computerGame";
import {
  renderXY,
  renderWinnerMenu,
  renderStartMenu,
} from "./renderUI";
import { initPvP } from "./PvP";
import EventManager from "./eventManager";

const eventManager = new EventManager();

// Game initialization
export default function init() {
  renderXY();
  renderStartMenu();
  eventManager.addListener("#left-btn", "click", startComputerGame);
  eventManager.addListener("#right-btn", "click", startPvP);
  // initComputerGame();
}
// Start computer game when "computer" button pressed
function startComputerGame() {
  const dialog = document.getElementById("modal");
  dialog.close();
  dialog.remove();
  document.getElementById("modal-overlay").remove();
  eventManager.cleanup()
  return initComputerGame();
}
// Start player vs player game when "1v1" button pressed
function startPvP() {
  const dialog = document.getElementById("modal");
  dialog.close();
  dialog.remove();
  document.getElementById("modal-overlay").remove();
  eventManager.cleanup()
  return initPvP();
}

// Menu pops up when a player wins
export function win(wonPlayer) {
  renderWinnerMenu(wonPlayer);
  const dialog = document.getElementById("modal");
  eventManager.addListener("#left-btn", "click", reset);

  function reset() {
    eventManager.cleanup()
    document.querySelectorAll;
    resetHitsList();
    dialog.close();
    dialog.remove();
    setTimeout(() => {
      eventManager.addListener("#left-btn", "click", startComputerGame);
      eventManager.addListener("#right-btn", "click", startPvP);
    }, 100);
    return renderStartMenu();
  }
}

// window.addEventListener("mousemove", (event) => {
//   console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
// });
