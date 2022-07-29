const HEADER_DEFINITION = require("../constants").HEADER_DEFINITION;
const JSum = require("jsum");

const columnNames = HEADER_DEFINITION.map((x) => x.name);

// Compares two objects and returns only fields with changes
const diffSameElements = (oldItem, newItem) => {
  const result = {};
  let change = false;
  // TODO: Optimize
  columnNames.forEach((c) => {
    change = true;
    if (oldItem[c] !== newItem[c]) result[c] = newItem[c];
  });

  if (!change) return undefined;
  result.id = newItem.id;
  return result;
};

// Compares two arrays, they have to be sorted by id or this
// algorithm wont work
const diff = (array1, array2) => {
  changes = [];
  deletions = [];
  let counter1 = 0,
    counter2 = 0;

  while (counter1 < array1.length && counter2 < array2.length) {
    // array1 has items that are not in array2
    while (array1[counter1].id < array2[counter2].id) {
      deletions.push(array1[counter1].id);
      counter1++;
    }

    if (counter1 >= array1.length) break;

    // array2 has items that were not in array 1
    while (array2[counter2].id < array1[counter1].id) {
      changes.push(array2[counter2]);
      counter2++;
    }

    if (counter2 >= array2.length) break;

    // if IDs are the same figure out the changes and add them
    // to the changeset
    while (
      counter1 < array1.length &&
      counter2 < array2.length &&
      array1[counter1].id === array2[counter2].id
    ) {
      const difference = diffSameElements(array1[counter1], array2[counter2]);
      if (difference) changes.push(difference);
      counter1++;
      counter2++;
    }
  }

  // cleanup if there are any elements left in array1
  while (counter1 < array1.length && counter2 >= array2.length) {
    deletions.push(array1[counter1].id);
    counter1++;
  }

  // cleanup if there are any elements left in array2
  while (counter1 >= array1.length && counter2 < array2.length) {
    changes.push(array2[counter2]);
    counter2++;
  }

  return {
    changes,
    deletions,
  };
};

module.exports = diff;
