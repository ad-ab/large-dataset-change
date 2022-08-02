const { generateNewItem, regenerateItem } = require("./generators");
const diff = require("./algorithms/diff");
const config = require("./config");
const start = require("./server");

// let data = [];
// let previousData = [];
// console.time();
// for (let i = 0; i < SAMPLE_SIZE; i++) {
//   data.push(generateNewItem());
// }
// const startData = [...data];
// let i = 0;
// console.log(data[0]);
// while (i < 100) {
//   previousData = [...data];
//   data = data.map(regenerateItem);
//   i++;
//   diff(previousData, data);localhost
// }
// console.log(i, "----------", data.length, previousData.length);

// console.timeEnd();
start(config);
