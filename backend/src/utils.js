const { SEED } = require("./config");

const rand = require("random-seed").create(SEED);
console.log("rand seed used:", SEED);

module.exports.rand = rand;
