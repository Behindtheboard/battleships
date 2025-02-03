import { Carrier, Battleship, Destroyer, Submarine, Patrol } from "./ship";

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
      if (player.fleet.length === 0) {
        player.placeShip(coord, new Carrier(isVertical));
        continue;
      }
      if (player.fleet.length === 1) {
        player.placeShip(coord, new Battleship(isVertical));
        continue;
      }
      if (player.fleet.length === 2) {
        player.placeShip(coord, new Destroyer(isVertical));
        continue;
      }
      if (player.fleet.length === 3) {
        player.placeShip(coord, new Submarine(isVertical));
        continue;
      }
      if (player.fleet.length === 4) {
        player.placeShip(coord, new Patrol(isVertical));
        continue;
      }
    } catch {
      continue;
    }
    console.log(player.board)
    if (player.fleet.length === 5) return;
  }
}
