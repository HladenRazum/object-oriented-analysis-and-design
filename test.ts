interface Board {
  width: number;
  height: number;
  tiles: Tile[];
  build: () => void;
}

interface Tile {
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
  units: Unit[];
  getUnits: () => Unit[];
  addUnits: (units: Unit[]) => void;
}

type Unit = "Hero" | "Creep" | "Rune";

class BasicTile implements Tile {
  width: number;
  height: number;
  position: { x: number; y: number };
  units: Unit[];

  constructor(
    width: number,
    height: number,
    position: { x: number; y: number }
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  getUnits() {
    return [];
  }

  addUnits(units: Unit[]) {}
}

class BasicBoard implements Board {
  width: number;
  height: number;
  tiles: Tile[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = [];
  }

  build() {
    this.tiles = [];
  }
}
