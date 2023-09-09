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

   constructor(model, type) {
      this.model = model;
      this.type = type;
      this.#serialNumber = "serial number here...";
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

   getAll() {
      return this.#items;
   }
}

const g1 = new Guitar(GuitarModels.FENDER, GuitarTypes.ELECTRIC);
const g2 = new Guitar(GuitarModels.TAYLOR, GuitarTypes.ACOUSTIC);

console.log(g1);
console.log(g2);
