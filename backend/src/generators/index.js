const HEADER_DEFINITION = require("../constants").HEADER_DEFINITION;
const { rand } = require("../utils");

const typeGenerators = HEADER_DEFINITION.reduce((acc, { type, p }) => {
  if (type === "id") return acc;
  acc[type] = require(`./types/${type}`);
  return acc;
}, {});

const columnNames = HEADER_DEFINITION.map((x) => x.name);
const columns = HEADER_DEFINITION.reduce((acc, { name, p, type }) => {
  acc[name] = {
    generate: typeGenerators[type],
    probability: p,
  };
  return acc;
}, {});

let i = 1;
const generateNewItem = () =>
  HEADER_DEFINITION.reduce(
    (prev, cur) => {
      const { name, type } = cur;

      if (type === "id") return prev;
      const value = typeGenerators[type]();

      return { ...prev, [name]: value };
    },
    { id: i++ }
  );

const regenerateItem = (row) => {
  const newItem = { id: row.id };

  HEADER_DEFINITION.forEach(({ name }) => {
    if (name === "id") return;
    const value = row[name];
    const { generate, probability } = columns[name];
    newItem[name] =
      probability && rand(1000) <= probability * 10 ? generate() : value;
  });
  return newItem;
};

module.exports = {
  generateNewItem,
  regenerateItem,
};
