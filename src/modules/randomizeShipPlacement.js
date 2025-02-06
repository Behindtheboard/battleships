import Player from "./gameboard";

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

  const shipIdToClass = Player.shipIdToClass;

  for (let key in shipIdToClass) {
    while (true) {
      const coord = generateCoordinate();
      generateOrientation();
      try {
        player.placeShip(
          coord,
          Reflect.construct(shipIdToClass[key], [isVertical])
        );
      } catch (error) {
        continue;
      }
      break;
    }
  }
}
