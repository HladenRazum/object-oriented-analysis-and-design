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
   wood: WoodTypes.WALNUT,
});

console.log(results);

// UI
const populateUI = () => {
   const form = document.getElementById("add-guitar-form");

   form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const guitarObj = Object.fromEntries(formData);

      // Add a new Guitar
      const g = new Guitar({
         model: guitarObj["guitar-model"],
         type: guitarObj["guitar-type"],
         wood: guitarObj["wood-type"],
      });

      // Add the guitar to inventory
      inventory.add(g);
      form.reset();
   });

   // Guitar Types Select
   const row1 = document.createElement("div");
   const guitarTypeLabel = document.createElement("label");
   const guitarTypeSelect = document.createElement("select");

   guitarTypeSelect.setAttribute("id", "guitar-type");
   guitarTypeSelect.setAttribute("name", "guitar-type");
   guitarTypeLabel.setAttribute("for", "guitar-type");
   guitarTypeLabel.textContent = "Guitar type";

   const guitarTypes = Object.values(GuitarTypes);
   for (const guitarType of guitarTypes) {
      const option = document.createElement("option");
      option.setAttribute("id", guitarType);
      option.setAttribute("value", guitarType);
      option.text = guitarType;
      guitarTypeSelect.add(option);
   }

   row1.append(guitarTypeLabel, guitarTypeSelect);

   // Guitar Model Select
   const row2 = document.createElement("div");
   const guitarModelLabel = document.createElement("label");
   const guitarModelSelect = document.createElement("select");

   guitarModelSelect.setAttribute("id", "guitar-model");
   guitarModelSelect.setAttribute("name", "guitar-model");
   guitarModelLabel.setAttribute("for", "guitar-model");
   guitarModelLabel.textContent = "Model";

   const guitarModels = Object.values(GuitarModels);
   for (const guitarModel of guitarModels) {
      const option = document.createElement("option");
      option.setAttribute("id", guitarModel);
      option.setAttribute("value", guitarModel);
      option.text = guitarModel;
      guitarModelSelect.add(option);
   }

   row2.append(guitarModelLabel, guitarModelSelect);
   // Guitar Wood Select
   const row3 = document.createElement("div");
   const woodLabel = document.createElement("label");
   const woodSelect = document.createElement("select");

   woodSelect.setAttribute("id", "wood-type");
   woodSelect.setAttribute("name", "wood-type");
   woodLabel.setAttribute("for", "wood-model");
   woodLabel.textContent = "Wood type";

   const woodTypes = Object.values(WoodTypes);
   for (const woodType of woodTypes) {
      const option = document.createElement("option");
      option.setAttribute("id", woodType);
      option.setAttribute("value", woodType);
      option.text = woodType;
      woodSelect.add(option);
   }

   row3.append(woodLabel, woodSelect);
   // Submit button
   const submitButtn = document.createElement("button");
   submitButtn.textContent = "Add Guitar";
   submitButtn.setAttribute("type", "submit");

   form.appendChild(row1);
   form.appendChild(row2);
   form.appendChild(row3);
   form.appendChild(submitButtn);

   form.querySelectorAll("div").forEach((div) => div.classList.add("form-row"));
};

populateUI();
