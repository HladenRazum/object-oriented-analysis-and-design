/**
 *  GarysGames
 *    user = game designer
 *
 *  1. User should be able to create a game board fill with tiles
 *    1.1. set board width and height
 *    1.2. set tile width and height
 *
 *  There should be some basic classes like BaseTiles and some that extends them like
 *    StarwarsTiles ( conaining some specific tiles )
 *
 *
 *
 *  2. Handle Unit
 *  3. Handle Moves
 *  4. Handle Turns
 *
 *  Unit
 *    type: "Hero" | "NPC" | "dog" | "car"
 *    fraction: ally | enemy | neutral
 *    position: x, y
 *
 *  Board
 *    numberOfTiles
 *
 *  Tile
 *    width
 *    height
 *    type: "Sand" | "Water" | "Road" .... any
 *
 *
 */

// UI
function GarysGames() {
  return (
    <>
      <h1>Gary's Games</h1>
      <p>Vision statement</p>
    </>
  );
}

ReactDOM.render(<GarysGames />, document.getElementById("root"));
