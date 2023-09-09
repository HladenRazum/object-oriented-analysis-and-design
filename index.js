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

class GuitarSpec {
   constructor({ model, type, wood, numStrings }) {
      this.model = model;
      this.type = type;
      this.wood = wood;
      this.numStrings = numStrings;
   }
}

class Guitar {
   #specification;

   constructor({ model, type, wood, numStrings, serialNumber, price }) {
      this.#specification = new GuitarSpec({ model, type, wood, numStrings });
      this.serialNumber = serialNumber;
      this.price = price;
   }

   getSpec() {
      return this.#specification;
   }

   getSerialNumber() {
      return this.serialNumber;
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

   search({ type, model, wood, numStrings }) {
      const results = [];
      this.#items.forEach((guitar) => {
         const guitarSpec = guitar.getSpec();
         if (
            guitarSpec.type === type ||
            guitarSpec.model === model ||
            guitarSpec.wood == wood ||
            guitarSpec.numStrings === numStrings
         ) {
            results.push(guitar);
         }
      });

      return results;
   }

   checkIfSerialExists(serial) {
      const result = this.#items.filter(
         (item) => item.getSerialNumber().toLowerCase() === serial.toLowerCase()
      );

      return result.length > 0;
   }
}

const inventory = new Inventory();

const g1 = new Guitar({
   serialNumber: "123",
   model: GuitarModels.FENDER,
   type: GuitarTypes.ELECTRIC,
   wood: WoodTypes.MAHAGONY,
   price: 1310.5,
   numStrings: 10,
});
const g2 = new Guitar({
   serialNumber: "1234",
   model: GuitarModels.TAYLOR,
   type: GuitarTypes.ACOUSTIC,
   wood: WoodTypes.MAPLE,
   price: 840.0,
   numStrings: 12,
});
const g3 = new Guitar({
   serialNumber: "12346",
   model: GuitarModels.GIBSON,
   type: GuitarTypes.ACOUSTIC,
   wood: WoodTypes.WALNUT,
   price: 120.0,
   numStrings: 8,
});

const g4 = new Guitar({
   serialNumber: "122346",
   model: GuitarModels.TAYLOR,
   type: GuitarTypes.ACOUSTIC,
   wood: WoodTypes.WALNUT,
   price: 475.8,
   numStrings: 8,
});

inventory.add(g1);
inventory.add(g2);
inventory.add(g3);
inventory.add(g4);

const result = inventory.search({
   wood: WoodTypes.WALNUT,
   numStrings: 12,
});

console.log(result);

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
         price: parseInt(guitarObj["price"], 10),
         serialNumber: guitarObj["serial-number"],
         numStrings: parseInt(guitarObj["num-strings"], 10),
      });

      // Add the guitar to inventory
      inventory.add(g);
      form.reset();
   });

   // Guitart SerialNumber textfield
   const serialNumberRow = document.createElement("div");
   const serialNumberLabel = document.createElement("label");
   const serialNumberInput = document.createElement("input");

   serialNumberInput.setAttribute("type", "text");
   serialNumberInput.setAttribute("id", "serial-number");
   serialNumberInput.setAttribute("name", "serial-number");
   serialNumberLabel.setAttribute("for", "serial-number");
   serialNumberLabel.textContent = "Serial number";
   serialNumberInput.setAttribute("placeholder", "Serial number");
   serialNumberInput.setAttribute("autocomplete", "off");
   serialNumberInput.setAttribute("required", true);

   serialNumberRow.append(serialNumberLabel, serialNumberInput);

   // Guitar Types Select
   const typeRow = document.createElement("div");
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

   typeRow.append(guitarTypeLabel, guitarTypeSelect);

   // Guitar Model Select
   const modelRow = document.createElement("div");
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

   modelRow.append(guitarModelLabel, guitarModelSelect);
   // Guitar Wood Select
   const woodRow = document.createElement("div");
   const woodLabel = document.createElement("label");
   const woodSelect = document.createElement("select");

   woodSelect.setAttribute("id", "wood-type");
   woodSelect.setAttribute("name", "wood-type");
   woodLabel.setAttribute("for", "wood-type");
   woodLabel.textContent = "Wood type";

   const woodTypes = Object.values(WoodTypes);
   for (const woodType of woodTypes) {
      const option = document.createElement("option");
      option.setAttribute("id", woodType);
      option.setAttribute("value", woodType);
      option.text = woodType;
      woodSelect.add(option);
   }

   woodRow.append(woodLabel, woodSelect);

   // Price field
   const priceRow = document.createElement("div");
   const priceLabel = document.createElement("label");
   const priceInput = document.createElement("input");

   priceLabel.setAttribute("for", "price");
   priceLabel.textContent = "Price";
   priceInput.setAttribute("id", "price");
   priceInput.setAttribute("name", "price");
   priceInput.setAttribute("type", "number");
   priceInput.setAttribute("min", 0);
   priceInput.setAttribute("value", 500);
   priceInput.setAttribute("placeholder", "$");
   priceInput.setAttribute("required", true);
   priceRow.append(priceLabel, priceInput);
   // Number of strings field
   const numStringsRow = document.createElement("div");
   const numStringsLabel = document.createElement("label");
   const numStringsInput = document.createElement("input");

   numStringsInput.setAttribute("name", "num-strings");
   numStringsInput.setAttribute("id", "num-strings");
   numStringsInput.setAttribute("type", "number");
   numStringsInput.setAttribute("min", "4");
   numStringsInput.setAttribute("max", "20");
   numStringsInput.setAttribute("value", "10");
   numStringsInput.setAttribute("required", true);
   numStringsLabel.setAttribute("for", "num-strings");
   numStringsLabel.textContent = "Number of strings";
   numStringsRow.append(numStringsLabel, numStringsInput);

   // Submit button
   const submitButton = document.createElement("button");
   submitButton.textContent = "Add Guitar";
   submitButton.setAttribute("type", "submit");

   form.appendChild(serialNumberRow);
   form.appendChild(typeRow);
   form.appendChild(modelRow);
   form.appendChild(woodRow);
   form.appendChild(priceRow);
   form.appendChild(numStringsRow);
   form.appendChild(submitButton);

   form.querySelectorAll("div").forEach((div) => div.classList.add("form-row"));
};

populateUI();
