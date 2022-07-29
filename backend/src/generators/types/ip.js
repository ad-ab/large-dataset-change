const { rand } = require("../../utils");

module.exports = () =>
  `${rand(246) + 10}.${rand(256)}.${rand(256)}.${rand(256)}`;
