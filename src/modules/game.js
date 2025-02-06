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
  // initComputerGame();
}
// Start computer game when "computer" button pressed
function startComputerGame() {
  const dialog = document.getElementById("modal");
  dialog.close();
  dialog.remove();
  document.getElementById("modal-overlay").remove();
  return initComputerGame();
}
eventManager.addListener("#left-btn", "click", startComputerGame);

export function win(wonPlayer) {
  renderWinnerMenu(wonPlayer);
  const dialog = document.getElementById("modal");
  document.getElementById("button-container").addEventListener("click", (e) => {
    if (e.target.id === "left-btn") {
      e.preventDefault();
      replaceRightBoard();
      resetHitsList();
      dialog.close();
      dialog.remove();
      return renderStartMenu(startHandler);
    }
  });
}

// window.addEventListener("mousemove", (event) => {
//   console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
// });
