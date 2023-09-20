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

function capitalizeFirstLetter(string) {
  let firstLetter = string.slice(0, 1).toUpperCase();
  let rest = string.slice(1);
  return firstLetter.concat(rest);
}

class GuitarSpec {
  constructor({ model, type, wood, numStrings }) {
    this.model = model;
    this.type = type;
    this.wood = wood;
    this.numStrings = numStrings;
  }

  checkIfMatchesAnyProperty({ model, type, wood, numStrings }) {
    return (
      this.type === type ||
      this.model === model ||
      this.wood == wood ||
      this.numStrings === numStrings
    );
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

  search(clientPreferences) {
    const results = [];
    this.#items.forEach((guitar) => {
      const guitarSpec = guitar.getSpec();
      if (guitarSpec.checkIfMatchesAnyProperty(clientPreferences)) {
        results.push(guitar);
      }
    });

    results.forEach((res) => {
      const spec = res.getSpec();
      console.log(`
            We have a ${spec.model} ${spec.numStrings}-strings ${
        spec.type
      } guitar:
               ${capitalizeFirstLetter(spec.wood)} on the front and back.
            You can have it for only $${res.price.toFixed(2)}!   
            ----
         `);
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
  type: GuitarTypes.ELECTRIC,
  model: GuitarModels.TAYLOR,
});

function GuitarsOnlineStore() {
  return (
    <>
      <h1>Guitars Online Store</h1>
      <AddGuitarForm />
    </>
  );
}

function AddGuitarForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input id="serial-number" label="Serial Number" />
      <Select options={Object.values(GuitarTypes)} label="Type" id="type" />
      <Select options={Object.values(GuitarModels)} label="Model" id="model" />
      <button className="form-button">Submit</button>
    </form>
  );
}

function Input({ id, label }) {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}: </label>
      <input required type="text" id={id} />
    </div>
  );
}

function Select({ options, label, id }) {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}: </label>
      <select id={id}>
        {options.map((model) => (
          <option value={model} key={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}

ReactDOM.render(<GuitarsOnlineStore />, document.getElementById("root"));
