import { Carrier, Battleship, Destroyer, Submarine, Patrol } from "./ship";

// Start Menu UI

export function renderStartMenu() {
  createDialog("Computer or 1v1?", "Computer", "1v1");
  createOverlay();
}

function createDialog(titleTxt, leftbtn, rightbtn) {
  const modalContainer = document.getElementById("modal-container");

  const dialog = document.createElement("dialog");
  dialog.id = "modal";

  const title = document.createElement("h2");
  title.id = "modal-title";
  title.textContent = `${titleTxt}`;
  dialog.appendChild(title);

  const buttonContainer = document.createElement("div");
  buttonContainer.id = "button-container";

  const leftBtn = document.createElement("button");
  leftBtn.id = "left-btn";
  leftBtn.textContent = `${leftbtn}`;
  buttonContainer.appendChild(leftBtn);

  if (rightbtn) {
    const rightBtn = document.createElement("button");
    rightBtn.id = "right-btn";
    rightBtn.textContent = `${rightbtn}`;
    buttonContainer.appendChild(rightBtn);
  }
  dialog.appendChild(buttonContainer);
  modalContainer.appendChild(dialog);
  dialog.showModal();
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  document.body.appendChild(overlay);
}

// Board Grid Letter and Numbers
export function renderXY() {
  const leftRow = document.querySelector("div#left-row");
  const rightRow = document.querySelector("div#right-row");
  const row = [..."ABCDEFGHIJ"];
  row.forEach((letter) => {
    const letterDiv = document.createElement("div");
    letterDiv.textContent = letter;
    leftRow.appendChild(letterDiv);
    rightRow.appendChild(letterDiv.cloneNode(true));
  });

  const leftCol = document.querySelector("div#left-col");
  const rightCol = document.querySelector("div#right-col");
  const col = [..."123456789", "10"];
  col.forEach((letter) => {
    const letterDiv = document.createElement("div");
    letterDiv.textContent = letter;
    leftCol.appendChild(letterDiv);
    rightCol.appendChild(letterDiv.cloneNode(true));
  });
}

// Board Grid UI
export function renderBoard(player, isNewGame) {
  const leftBoard = document.getElementById("left-board");
  const rightBoard = document.getElementById("right-board");

  const board = player.board;
  const playerAlt = player.alt;
  let computer;

  playerAlt === "1" ? (leftBoard.innerHTML = "") : (rightBoard.innerHTML = "");

  board.forEach((row, rindex) => {
    row.forEach((col, cindex) => {
      const boxDiv = document.createElement("div");

      if (col === null) {
        boxDiv.style.backgroundColor = "grey";
      }
      if (col === "hit") {
        boxDiv.style.backgroundColor = "red";
      }
      if (col === "missed") {
        boxDiv.textContent = "X";
      }
      if (col !== null && col !== "hit" && col !== "missed") {
        playerAlt === "robo"
          ? (boxDiv.style.backgroundColor = "grey")
          : (boxDiv.style.backgroundColor = "green");
      }

      switch (playerAlt) {
        case "robo":
          if (!isNewGame) boxDiv.id = `${rindex}${cindex}`;
          rightBoard.appendChild(boxDiv);
          break;
        case "1":
          if (isNewGame) boxDiv.id = `${rindex}${cindex}`;
          leftBoard.appendChild(boxDiv);
          break;
        case "2":
          if (isNewGame) boxDiv.id = `${rindex}${cindex}`;
          rightBoard.appendChild(boxDiv);
          break;
      }
    });
  });
}

// Ship UI
export function renderShips(player, isNewGame) {
  const leftShipsContainer = document.getElementById("left-ships");
  const rightShipsContainer = document.getElementById("right-ships");
  const playerAlt = player.alt;
  playerAlt === "1"
    ? (leftShipsContainer.innerHTML = "")
    : (rightShipsContainer.innerHTML = "");

  // Render ships and # of inner boxes
  function buildShips(side, sideContainer) {
    const letter = side[0];
    const shipClasses = [Carrier, Battleship, Destroyer, Submarine, Patrol];
    shipClasses.forEach((ship) => {
      const shipName = ship.name[0].toLowerCase() + ship.name.slice(1);
      const newShip = document.createElement("div");
      newShip.id = `${letter}${shipName}`;
      newShip.style.cursor = "grab";
      newShip.classList.add("ships");
      for (let i = 0; i < ship.divLength; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = "shipBox";
        newShip.appendChild(newDiv);
      }
      sideContainer.appendChild(newShip);
    });
  }
  // Allow ship to be grabbable and flippable by changing style to absolute
  function activeSelect(isNewGame, side) {
    if (isNewGame) {
      document.querySelectorAll(`#${side}-ships .ships`).forEach((ship) => {
        ship.style.position = "absolute";
      });
      shipPosition(side);
    } else {
      document.querySelectorAll(`#${side}-ships .ships`).forEach((ship) => {
        ship.style.marginBottom = "20px";
        ship.style.cursor = "auto";
        ship.style.position = "none";
      });
    }
  }
  // Dynamically size ship inner boxes to board boxes
  function shipBoxSize(side) {
    const sourceSize = document.querySelector("#left-row > :first-child");
    const shipBoxes = document.querySelectorAll(`#${side}-ships .shipBox`);
    const rect = sourceSize.getBoundingClientRect();
    shipBoxes.forEach((shipBox) => {
      shipBox.style.width = `${rect.width - 2}px`;
      shipBox.style.height = `${rect.height - 1}px`;
    });
  }
  // Ship features depending on player
  let side;
  if (playerAlt === "robo") {
    side = "right";
    buildShips(side, rightShipsContainer);
    activeSelect(false, side);
  }
  if (playerAlt === "1") {
    side = "left";
    buildShips(side, leftShipsContainer);
    activeSelect(isNewGame, side);
  }
  if (playerAlt === "2") {
    side = "right";
    buildShips(side, rightShipsContainer);
    activeSelect(isNewGame, side);
  }
  shipBoxSize(side);
  // Resize and reposition ships when window resizes
  window.addEventListener("resize", () => shipBoxSize(side));
}

// Dynamically position grabbable ships relative to board
export function shipPosition(side, player) {
  const source = document.getElementById(`${side}-box`);
  const rect = source.getBoundingClientRect();
  const squareHeight = (rect.bottom - rect.top) / 11;
  const bottom = rect.bottom + 20;
  let leftPos = rect.left + squareHeight;
  let skip;
  document.querySelectorAll(`.ships`).forEach((ship) => {
    if (player) {
      player.fleet.forEach((shipObj) => {
        if (ship.id.includes(shipObj.name)) skip = true;
      });
    }
    if (skip) return;
    ship.style.top = `${bottom}px`;
    ship.style.left = `${leftPos}px`;
    ship.style.flexDirection = "column";
    leftPos += squareHeight * 2;
  });
}

// Flip ship vertically or horizontally
export function flipShip(isVertical, elementId, player) {
  let dir;
  let isPlaced = false;
  isVertical ? (dir = "column") : (dir = "row");
  player.fleet.forEach((ship) => {
    if (ship.name.includes(elementId.slice(1))) isPlaced = true;
  });
  if (!isPlaced) return;
  document.getElementById(`${elementId}`).style.flexDirection = `${dir}`;
}

// Start Battle Button UI
export function renderButtonUnderBoard(side, btnText) {
  const shipsContainer = document.getElementById(`${side}-ships`);
  const startBattleBtn = document.createElement("button");
  startBattleBtn.id = "btn-under-board";
  startBattleBtn.textContent = `${btnText}`;
  shipsContainer.appendChild(startBattleBtn);
}
// Blocks screen while player passes device to opponent
export function renderPassDevice() {
  createDialog('Click done when passed', 'Done')
  createOverlay()
}


// Winner Menu UI
export function renderWinnerMenu(wonPlayer) {
  createDialog(`${wonPlayer.name} wins! Start new game?`, "Yes!");
}

export function replaceRightBoard() {
  document.getElementById("right-board").remove();
  const rightBox = document.getElementById("right-box");
  const newBoard = document.createElement("div");
  newBoard.id = "right-board";
  rightBox.appendChild(newBoard);
}
