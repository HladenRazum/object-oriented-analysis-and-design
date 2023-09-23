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

class StringInstrumentSpec {
  constructor({ model, type, wood }) {
    this.model = model;
    this.type = type;
    this.wood = wood;
  }

  checkIfMatchesAnyProperty() {}
}

class GuitarSpec extends StringInstrumentSpec {
  constructor({ model, type, wood, numStrings }) {
    super({ model, type, wood });
    this.numStrings = numStrings;
  }

  checkIfMatchesAnyProperty({ model, type, wood, numStrings }) {
    return (
      this.type === type ||
      this.model === model ||
      this.wood === wood ||
      this.numStrings === numStrings
    );
  }
}
class MandolinSpec extends StringInstrumentSpec {
  constructor({ model, type, wood, style }) {
    super({ model, type, wood });
    this.style = style;
  }

  checkIfMatchesAnyProperty({ model, type, wood, style }) {
    return (
      this.type === type ||
      this.model === model ||
      this.wood === wood ||
      this.style === style
    );
  }
}

class Instrument {
  #specification;

  constructor({ spec, serialNumber, price }) {
    this.#specification = spec;
    this.serialNumber = serialNumber;
    this.price = price;
    this.specType = spec.constructor.name;
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

  search(clientPreferences) {
    const results = [];
    this.#items.forEach((item) => {
      const itemSpec = item.getSpec();
      if (itemSpec.checkIfMatchesAnyProperty(clientPreferences)) {
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

const g1 = new Instrument({
  serialNumber: "122234",
  price: 1840.0,
  spec: new GuitarSpec({
    model: GuitarModels.FENDER,
    type: GuitarTypes.ELECTRIC,
    wood: WoodTypes.WALNUT,
    numStrings: 44,
  }),
});

const g2 = new Instrument({
  serialNumber: "1234",
  price: 840.0,
  spec: new GuitarSpec({
    model: GuitarModels.TAYLOR,
    type: GuitarTypes.ACOUSTIC,
    wood: WoodTypes.MAHAGONY,
    numStrings: 12,
  }),
});

const m1 = new Instrument({
  spec: new MandolinSpec({
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

const result = inventory.search({
  wood: WoodTypes.MAHAGONY,
  style: MandolinStyles.A,
});

console.log(result);

function GuitarsOnlineStore() {
  const [items, setItems] = React.useState(inventory.getAll());

  return (
    <>
      <h1>Guitars Online Store</h1>
      <AddGuitarForm setItems={setItems} />
      <InventoryList items={items} />
    </>
  );
}

function AddGuitarForm({ setItems }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const serialNumber = data.get("serial-number");
    const type = data.get("type");
    const model = data.get("model");
    const price = data.get("price");

    if (serialNumber && type && model) {
      const guitar = new Guitar({
        spec: new GuitarSpec({
          model,
          type,
          wood: WoodTypes.MAHAGONY,
          numStrings: 999,
        }),
        serialNumber,
        price,
      });
      setItems((prev) => [...prev, guitar]);
      inventory.add(guitar);
    }
  };

  const instrumentTypes = inventory.getAll().map((item) => item.getSpec().type);
  const instrumentModels = inventory
    .getAll()
    .map((item) => item.getSpec().model);

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

function InventoryList({ items }) {
  const updatedItems = items.map((guitar) => {
    const spec = guitar.getSpec();
    return {
      model: spec.model,
      price: guitar.price,
      type: spec.type,
      serialNumber: guitar.serialNumber,
    };
  });

  return (
    <ul>
      {updatedItems.map((item) => (
        <li className="inventory-list-item" key={item.serialNumber}>
          <h4>{item.model}</h4>
          <span>{item.type}</span>
          <br />
          <strong>{item.price}</strong>
          <br />
        </li>
      ))}
    </ul>
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
