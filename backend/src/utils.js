const { APP_RANDOM_SEED } = process.env;

const rand = require("random-seed").create(APP_RANDOM_SEED);

console.log("Rand seed used:", APP_RANDOM_SEED);
module.exports.rand = rand;
