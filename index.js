const WoodTypes = {
   MAHAGONY: "mahagony",
   WALNUT: "walnut",
   MAPLE: "maple",
};

const GuitarModels = {
   FENDER: "Fender",
   TAYLOR: "Taylor",
   GIBSON: "Gibson",
};

const GuitarTypes = {
   ACOUSTIC: "acoustic",
   ELECTRIC: "electric",
};

class Guitar {
   #serialNumber;

   constructor({ model, type, wood }) {
      if (this.constructor.counter) {
         this.constructor.counter++;
      } else {
         this.constructor.counter = 1;
      }

      this.model = model;
      this.type = type;
      this.wood = wood;
      this.#serialNumber = `serial-${this.constructor.counter}`;
   }

   getSerialNumber() {
      return this.#serialNumber;
   }
}

class Inventory {
   #items = [];

   add(guitar) {
      this.#items.push(guitar);
   }

   remove(guitar) {
      this.#items = this.#items.filter(
         (g) => g.getSerialNumber() !== guitar.getSerialNumber()
      );
   }

   getAll() {
      return this.#items;
   }

   search({ type, model, wood }) {
      const results = [];
      this.#items.forEach((guitar) => {
         if (
            guitar.type === type ||
            guitar.model === model ||
            guitar.wood == wood
         ) {
            results.push(guitar);
         }
      });

      return results;
   }
}

const inventory = new Inventory();

const g1 = new Guitar({
   model: GuitarModels.FENDER,
   type: GuitarTypes.ELECTRIC,
   wood: WoodTypes.MAHAGONY,
});
const g2 = new Guitar({
   model: GuitarModels.TAYLOR,
   type: GuitarTypes.ACOUSTIC,
   wood: WoodTypes.MAPLE,
});
const g3 = new Guitar({
   model: GuitarModels.GIBSON,
   type: GuitarTypes.ACOUSTIC,
   wood: WoodTypes.WALNUT,
});

const g4 = new Guitar({
   model: GuitarModels.TAYLOR,
   type: GuitarTypes.ACOUSTIC,
   wood: WoodTypes.WALNUT,
});

inventory.add(g1);
inventory.add(g2);
inventory.add(g3);
inventory.add(g4);

const results = inventory.search({
   type: GuitarTypes.ELECTRIC,
   model: GuitarModels.TAYLOR,
   wood: WoodTypes.WALNUT,
});
