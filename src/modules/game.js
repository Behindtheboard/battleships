import { initComputerGame, resetHitsList } from "./computerGame";
import {
  renderXY,
  renderWinnerMenu,
  renderStartMenu,
  replaceRightBoard,
} from "./renderUI";
import EventManager from "./eventManager";

const eventManager = new EventManager();
// Game initialization
export default function init() {
  renderXY();
  renderStartMenu();
  eventManager.addListener("#left-btn", "click", startComputerGame);
  // initComputerGame();
}
// Start computer game when "computer" button pressed
function startComputerGame() {
  const dialog = document.getElementById("modal");
  dialog.close();
  dialog.remove();
  document.getElementById("modal-overlay").remove();
  eventManager.removeListener("#left-btn", "click");
  return initComputerGame();
}

export function win(wonPlayer) {
  renderWinnerMenu(wonPlayer);
  const dialog = document.getElementById("modal");
  eventManager.addListener("#left-btn", "click", reset);

  function reset() {
    document.querySelectorAll;
    resetHitsList();
    dialog.close();
    dialog.remove();
    eventManager.removeListener("#left-btn", "click");
    setTimeout(() => {
      eventManager.addListener("#left-btn", "click", startComputerGame);
    }, 100);
    return renderStartMenu();
  }
}

// window.addEventListener("mousemove", (event) => {
//   console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
// });
