export default function randomizeShipPlacement(player) {
  function generateCoordinate() {
    const row = Math.floor(Math.random() * 10).toString();
    const col = Math.floor(Math.random() * 10).toString();
    const coord = row + col;
    return coord;
  }

  let isVertical;
  function generateOrientation() {
    const random = Math.random() < 0.5 ? 0 : 1;
    random === 1 ? (isVertical = true) : (isVertical = false);
  }

  while (true) {
    const coord = generateCoordinate();
    generateOrientation();
    try {
      if (player.board.fleet.length === 0) {
        player.placeCarrier(coord, isVertical);
        continue;
      }
      if (player.board.fleet.length === 1) {
        player.placeBattleship(coord, isVertical);
        continue;
      }
      if (player.board.fleet.length === 2) {
        player.placeDestroyer(coord, isVertical);
        continue;
      }
      if (player.board.fleet.length === 3) {
        player.placeSubmarine(coord, isVertical);
        continue;
      }
      if (player.board.fleet.length === 4) {
        player.placePatrol(coord, isVertical);
        continue;
      }
    } catch {
      continue;
    }
    console.log(player.board.board)
    if (player.board.fleet.length === 5) return;
  }
}
