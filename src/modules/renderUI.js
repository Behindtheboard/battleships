import { Carrier, Battleship, Destroyer, Submarine, Patrol } from "./ship";

// Start Menu UI

export function renderStartMenu(handler) {
  createDialog("Computer or 1v1?", "Computer", "1v1");
  createOverlay();
  handler();
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

  if (rightbtn !== "No") {
    const rightBtn = document.createElement("button");
    rightBtn.id = "right-btn";
    rightBtn.textContent = `${rightbtn}`;
    buttonContainer.appendChild(rightBtn);
  }

  buttonContainer.appendChild(leftBtn);
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

export function renderBoard(player, needShips) {
  const leftBoard = document.getElementById("left-board");
  const rightBoard = document.getElementById("right-board");

  const board = player.board;
  let computer;

  if (player.name === "computer") {
    computer = true;
    rightBoard.innerHTML = "";
  } else {
    computer = false;
    leftBoard.innerHTML = "";
  }

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
        computer
          ? (boxDiv.style.backgroundColor = "grey")
          : (boxDiv.style.backgroundColor = "green");
      }

      if (computer) {
        boxDiv.id = `${rindex}${cindex}`;
        rightBoard.appendChild(boxDiv);
      } else {
        if (needShips) {
          boxDiv.id = `${rindex}${cindex}`;
        }
        leftBoard.appendChild(boxDiv);
      }
    });
  });
}

// Ship UI

export function renderShips(isNewGame) {
  const shipsContainers = document.querySelectorAll(".ship-containers");
  shipsContainers.forEach((container) => {
    container.innerHTML = "";
  });

  // Render ships and ship lengths in each container
  const leftShipsContainer = document.getElementById("left-ships");
  const rightShipsContainer = document.getElementById("right-ships");
  const battleShips = [
    [Carrier, Battleship, Destroyer, Submarine, Patrol],
    [Carrier, Battleship, Destroyer, Submarine, Patrol],
  ];
  battleShips.forEach((playerShips, index) => {
    playerShips.forEach((ship) => {
      const shipName = ship.name[0].toLowerCase() + ship.name.slice(1);
      const newShip = document.createElement("div");
      let side;
      let sideContainer;
      if (index === 0) {
        side = "l";
        sideContainer = leftShipsContainer;
      } else {
        side = "r";
        sideContainer = rightShipsContainer;
      }
      newShip.id = `${side}${shipName}`;
      newShip.classList.add("ships");
      for (let i = 0; i < ship.divLength; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = "shipBox";
        newShip.appendChild(newDiv);
      }
      sideContainer.appendChild(newShip);
    });
  });

  const ships = document.querySelectorAll(".ships");
  if (isNewGame) {
    renderShipFlip(false);
    renderStartBattleBtn();
    ships.forEach((ship) => {
      ship.style.position = "absolute";
    });
  } else {
    ships.forEach((ship) => {
      ship.style.marginBottom = "20px";
      ship.style.position = "none";
    });
  }
  // Inner ship boxes dynamically match board boxes
  const sizeSource = document.querySelector("#left-row + div");
  const shipBoxes = document.querySelectorAll(".shipBox");
  function matchSize() {
    const rect = sizeSource.getBoundingClientRect();
    const rectWidth = rect.width - 3;
    shipBoxes.forEach((shipBox) => {
      shipBox.style.width = `${rectWidth}px`;
      shipBox.style.height = `${rectWidth}px`;
    });
  }
  matchSize();
  window.addEventListener("resize", matchSize);
}

export function renderShipFlip(
  isVertical,
  elementId,
  isDragging,
  player = null
) {
  const ships = document.querySelectorAll(".ships");
  let dir;
  let leftPos;
  let topPos;
  let rightShips = false;
  let isPlaced;

  if (isVertical) {
    dir = "column";
    leftPos = 6;
  } else {
    dir = "row";
    leftPos = 6;
    topPos = 70;
  }

  ships.forEach((ship) => {
    if (ship.id === elementId && isDragging === true) return;
    isPlaced = false;
    if (player !== null) {
      if (rightShips) return;
      player.fleet.forEach((shipObject) => {
        if (shipObject.name === ship.id.slice(1)) isPlaced = true;
      });
    }
    if (isPlaced) return;
    if (isVertical) {
      ship.style.left = `${leftPos}vw`;
      ship.style.top = `70vh`;
      leftPos += 5;
    } else {
      ship.style.left = `${leftPos}vw`;
      ship.style.top = `${topPos}vh`;
      topPos += 6;
    }
    ship.style.flexDirection = `${dir}`;
    if (ship.id.includes("lp")) {
      if (rightShips) return;
      if (isVertical) {
        leftPos = leftPos + 23;
      } else {
        leftPos = 53;
        topPos = 70;
      }
      rightShips = true;
    }
  });
}

// Start Battle Button UI

export function renderStartBattleBtn() {
  const leftShips = document.getElementById("left-ships");
  const startBattleBtn = document.createElement("button");
  startBattleBtn.id = "start-battle-btn";
  startBattleBtn.textContent = "Start Battle";
  startBattleBtn.style.display = "none";
  leftShips.appendChild(startBattleBtn);
}

// Winner Menu UI

export function renderWinnerMenu(wonPlayer) {
  createDialog(`${wonPlayer.name} wins! Start new game?`, "Yes!", "No");
}

export function replaceRightBoard() {
  document.getElementById("right-board").remove();
  const rightBox = document.getElementById("right-box");
  const newBoard = document.createElement("div");
  newBoard.id = "right-board";
  rightBox.appendChild(newBoard);
}
