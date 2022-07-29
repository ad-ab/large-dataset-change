const { generateNewItem, regenerateItem } = require("./generators");
const diff = require("./algorithms/diff");
const JSum = require("jsum");

const { APP_SIZE } = process.env;

let data = [];
let previousData = [];
console.time();
for (let i = 0; i < APP_SIZE; i++) {
  data.push(generateNewItem());
}
const startData = [...data];
let i = 0;
console.log(data[0]);
while (i < 100) {
  previousData = [...data];
  data = data.map(regenerateItem);
  i++;
  diff(previousData, data);
}
console.log(i, "----------", data.length, previousData.length);

console.timeEnd();
