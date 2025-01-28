function createDialog(titleTxt, leftbtn, rightbtn) {
  const modalContainer = document.getElementById("modal-container");

  const dialog = document.createElement("dialog");
  dialog.id = "modal";
  dialog.style.zIndex = "1000";
  dialog.style.padding = "20px";
  dialog.style.borderRadius = "10px";
  dialog.style.width = "300px";
  dialog.style.textAlign = "center";

  const title = document.createElement("h2");
  title.id = "modal-title";
  title.textContent = `${titleTxt}`;
  dialog.appendChild(title);

  const buttonContainer = document.createElement("div");
  buttonContainer.id = "button-container";
  buttonContainer.style.textAlign = "center";
  buttonContainer.style.marginTop = "20px";

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
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(255, 255, 255)";
  overlay.style.zIndex = "999";
  document.body.appendChild(overlay);
}

export function renderXY() {
  const leftRow = document.querySelector("div#left-row");
  const rightRow = document.querySelector("div#right-row");
  const row = [..."ABCDEFGHIJ"];
  row.forEach((letter) => {
    const letterDiv = document.createElement("div");
    letterDiv.textContent = letter;
    letterDiv.style.display = "flex";
    letterDiv.style.justifyContent = "center";
    letterDiv.style.alignItems = "center";
    leftRow.appendChild(letterDiv);
    rightRow.appendChild(letterDiv.cloneNode(true));
  });

  const leftCol = document.querySelector("div#left-col");
  const rightCol = document.querySelector("div#right-col");
  const col = [..."123456789", "10"];
  col.forEach((letter) => {
    const letterDiv = document.createElement("div");
    letterDiv.textContent = letter;
    letterDiv.style.display = "flex";
    letterDiv.style.justifyContent = "center";
    letterDiv.style.alignItems = "center";
    leftCol.appendChild(letterDiv);
    rightCol.appendChild(letterDiv.cloneNode(true));
  });
}

export function renderStart(handler) {
  createDialog("Computer or 1v1?", "Computer", "1v1");
  createOverlay();
  handler();
}

export function renderBoard(player, needShips) {
  const leftBoard = document.getElementById("left-board");
  const rightBoard = document.getElementById("right-board");

  const board = player.board.board;
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

export function renderShips(leftplayer, rightplayer, newGame) {
  function addDivs(amount, parentDiv) {
    for (let i = 0; i < amount; i++) {
      const newDiv = document.createElement("div");
      newDiv.className = "ship";
      parentDiv.appendChild(newDiv);
    }
  }

  const leftShipsContainer = document.getElementById("left-ships");
  const rightShipsContainer = document.getElementById("right-ships");
  leftShipsContainer.innerHTML = "";
  rightShipsContainer.innerHTML = "";

  const battleShips = [
    ["carrier", "battleship", "destroyer", "submarine", "patrol"],
    ["carrier", "battleship", "destroyer", "submarine", "patrol"],
  ];

  battleShips.forEach((playerShips, index) => {
    playerShips.forEach((ship) => {
      const newDiv = document.createElement("div");
      let side;
      let sideContainer;
      if (index === 0) {
        side = "l";
        sideContainer = leftShipsContainer;
      } else {
        side = "r";
        sideContainer = rightShipsContainer;
      }
      newDiv.id = `${side}${ship}`;
      sideContainer.appendChild(newDiv);
    });
  });

  const shipsContainers = document.querySelectorAll(".ships-container");

  shipsContainers.forEach((container) => {
    const childNodes = container.childNodes;

    childNodes.forEach((ship) => {
      if (ship.id.includes("carrier")) {
        addDivs(5, ship);
        ship.style.left = "10vw";
        if (ship.id.includes("rcarrier")) {
          ship.style.left = "57.5vw";
        }
      }
      if (ship.id.includes("battleship")) {
        addDivs(4, ship);
        ship.style.left = "17.5vw";
        if (ship.id.includes("rbattleship")) {
          ship.style.left = "65vw";
        }
      }
      if (ship.id.includes("destroyer")) {
        addDivs(3, ship);
        ship.style.left = "25vw";
        if (ship.id.includes("rdestroyer")) {
          ship.style.left = "72.5vw";
        }
      }
      if (ship.id.includes("submarine")) {
        addDivs(3, ship);
        ship.style.left = "32.5vw";
        if (ship.id.includes("rsubmarine")) {
          ship.style.left = "80vw";
        }
      }
      if (ship.id.includes("patrol")) {
        addDivs(2, ship);
        ship.style.left = "40vw";
        if (ship.id.includes("rpatrol")) {
          ship.style.left = "87.5vw";
        }
      }
    });
  });

  const sizeSource = document.querySelector("#left-row + div");
  const targets = document.querySelectorAll(".ship");

  function matchSize() {
    const rect = sizeSource.getBoundingClientRect();
    const rectWidth = rect.width - 3;
    targets.forEach((target) => {
      target.style.width = `${rectWidth}px`;
      target.style.height = `${rectWidth}px`;
    });
  }
  matchSize();
  window.addEventListener("resize", matchSize);

  if (newGame === true) {
    const leftShips = document.querySelectorAll("#left-ships > div");
    leftShips.forEach((ship) => {
      dragHandler(ship.id);
    });
  }

  function dragHandler(elementId) {
    const draggable = document.getElementById(`${elementId}`);
    const draggableParent = draggable.parentNode;

    let isDragging = false;
    let originalX, originalY;

    originalX = draggable.style.left;
    originalY = draggable.style.top;

    draggable.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;

      draggable.style.transition = "";
    });

    document.addEventListener("mousemove", (e) => {
      e.preventDefault();
      const rect = sizeSource.getBoundingClientRect();
      if (!isDragging) return;

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      draggable.style.left = `${e.clientX + scrollX - rect.width / 2}px`;
      draggable.style.top = `${e.clientY + scrollY - rect.width / 2}px`;
    });

    document.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      let snapped = false;

      const boardDivs = document.querySelectorAll("#left-board div");

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      boardDivs.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const parentRect = draggableParent.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          draggable.style.left = `${rect.left + scrollX}px`;
          draggable.style.top = `${rect.top + scrollY}px`;
          snapped = true;
        }
      });

      if (!snapped) {
        draggable.style.left = `${originalX}`;
        draggable.style.top = `${originalY}`;
      }

      draggable.style.transition = "left 0.3s ease, top 0.3s ease";

      draggable.style.cursor = "grab";
    });

    // document.getElementById("left-board").addEventListener("mouseup", (e) => {
    //   if (!isDragging) return;
    //   console.log(e.target.id);
    //   if (elementId.includes("carrier")) {
    //     leftplayer.placeCarrier(e.target.id, false);
    //   }
    //   if (elementId.includes("battleship")) {
    //     leftplayer.placeBattleship(e.target.id, false);
    //   }
    //   if (elementId.includes("destroyer")) {
    //     leftplayer.placeDestroyer(e.target.id, false);
    //   }
    //   if (elementId.includes("submarine")) {
    //     leftplayer.placeSubmarine(e.target.id, false);
    //   }
    //   if (elementId.includes("patrol")) {
    //     leftplayer.placePatrol(e.target.id, false);
    //   }
    // });
  }
}

export function renderWin(wonPlayer) {
  createDialog(`${wonPlayer.name} wins! Start new game?`, "Yes!", "No");
}

export function replaceRightBoard() {
  document.getElementById("right-board").remove();
  const rightBox = document.getElementById("right-box");
  const newBoard = document.createElement("div");
  newBoard.id = "right-board";
  rightBox.appendChild(newBoard);
}
