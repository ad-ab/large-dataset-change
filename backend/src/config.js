const Joi = require("joi");

const configSchema = Joi.object({
  APP_SIZE: Joi.number().default(1000),
  APP_PORT: Joi.number().default(3001),
  APP_RANDOM_SEED: Joi.string().default("RANDOM"),
});

// Validate important ENV variables
const { value, error } = configSchema.validate(process.env, {
  allowUnknown: true,
});

if (error) throw error;

const { APP_SIZE, APP_PORT, APP_RANDOM_SEED } = value;

module.exports.SAMPLE_SIZE = APP_SIZE;
module.exports.PORT = APP_PORT;
module.exports.SEED = APP_RANDOM_SEED;
