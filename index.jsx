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

const MandolinStyles = {
  A: "A",
  B: "B",
  C: "C",
  F: "F",
};

function capitalizeFirstLetter(string) {
  let firstLetter = string.slice(0, 1).toUpperCase();
  let rest = string.slice(1);
  return firstLetter.concat(rest);
}

class InstrumentSpec {
  constructor(props) {
    this.spec = new Map();
    for (const [key, value] of Object.entries(props)) {
      this.spec.set(key, value);
    }
  }

  get(key) {
    return this.spec.get(key);
  }

  match(searchSpec) {
    let results = [];

    for (const [key, value] of Object.entries(searchSpec)) {
      const result = this.spec.get(key);
      if (result === value || result === String(value).toUpperCase()) {
        results.push(result);
      }
    }

    return results.length > 0;
  }
}

class Instrument {
  #specification;

  constructor({ spec, serialNumber, price, type }) {
    this.#specification = spec;
    this.serialNumber = serialNumber;
    this.price = price;
    this.type = type;
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

  add(item) {
    this.#items.push(item);
  }

  remove(item) {
    this.#items = this.#items.filter(
      (g) => g.getSerialNumber() !== item.getSerialNumber()
    );
  }

  getAll() {
    return this.#items;
  }

  search(searchSpec) {
    const results = [];

    this.#items.forEach((item) => {
      const itemSpec = item.getSpec();
      if (itemSpec.match(searchSpec)) {
        results.push(item);
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

const saxophone = new Instrument({
  type: "saxophone",
  serialNumber: "919231023",
  price: 2000,
  spec: new InstrumentSpec({
    color: "YELLOW",
    material: "IRON",
  }),
});

const g1 = new Instrument({
  type: "guitar",
  serialNumber: "122234",
  price: 1840.0,
  spec: new InstrumentSpec({
    model: GuitarModels.FENDER,
    type: GuitarTypes.ELECTRIC,
    wood: WoodTypes.MAHAGONY,
    numStrings: 44,
  }),
});

const g2 = new Instrument({
  type: "guitar",
  serialNumber: "1234",
  price: 840.0,
  spec: new InstrumentSpec({
    model: GuitarModels.TAYLOR,
    type: GuitarTypes.ACOUSTIC,
    wood: WoodTypes.MAHAGONY,
    numStrings: 12,
  }),
});

const m1 = new Instrument({
  type: "mandolin",
  spec: new InstrumentSpec({
    model: "Mandoline Model 1",
    type: "mandoline type 3",
    wood: WoodTypes.MAPLE,
    style: MandolinStyles.A,
  }),
  serialNumber: "mandolin_1111",
  price: 475,
});

inventory.add(g1);
inventory.add(g2);
inventory.add(m1);
inventory.add(saxophone);

const result = inventory.search({
  style: "A",
  material: "IRon",
});

console.log(result);

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

  const instrumentTypes = [
    ...new Set(
      inventory
        .getAll()
        .map((item) => item.getSpec().get("type"))
        .filter((item) => item !== undefined)
    ),
  ];

  const instrumentModels = [
    ...new Set(
      inventory
        .getAll()
        .map((item) => item.getSpec().get("model"))
        .filter((item) => item !== undefined)
    ),
  ];

  return (
    <form className="form" id="form" onSubmit={handleSubmit}>
      <Input name="serial-number" id="serial-number" label="Serial Number" />
      <Select options={instrumentTypes} name="type" label="Type" id="type" />
      <Select
        options={instrumentModels}
        name="model"
        label="Model"
        id="model"
      />
      <PriceInput id="price" name="price" label="Price" />
      <button className="form-button">Submit</button>
    </form>
  );
}

function Input({ id, label, name }) {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}: </label>
      <input name={name} required type="text" id={id} />
    </div>
  );
}

function PriceInput({ id, label, name }) {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}: </label>
      <input
        name={name}
        required
        type="number"
        min={1}
        max={100000}
        defaultValue={500}
        id={id}
      />
    </div>
  );
}

function Select({ options, label, id, name }) {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}: </label>
      <select id={id} name={name}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

ReactDOM.render(<GuitarsOnlineStore />, document.getElementById("root"));
