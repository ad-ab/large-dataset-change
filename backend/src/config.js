const { APP_SIZE, APP_PORT, APP_RANDOM_SEED } = process.env;

module.exports.SAMPLE_SIZE = APP_SIZE || 8000;
module.exports.PORT = APP_PORT || 3001;
module.exports.SEED = APP_RANDOM_SEED || "RANDOM";
