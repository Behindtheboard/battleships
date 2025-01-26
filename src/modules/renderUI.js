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

export function renderUI() {
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

export function renderBoard(player) {
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
        leftBoard.appendChild(boxDiv);
      }
    });
  });
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
