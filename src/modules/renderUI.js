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
  const col = [..."123456789","10"]; 
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


const leftBoard = document.getElementById("left-board");
const rightBoard = document.getElementById("right-board");

export function renderBoard(player) {
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