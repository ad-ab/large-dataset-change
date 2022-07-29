const Joi = require("joi");
const INITIAL_CLIENT_COUNT = 8000;

const HEADER_DEFINITION = [
  { name: "id", p: 0, type: "id" },
  { name: "stat1", p: 80, type: "number" },
  { name: "stat2", p: 90, type: "number" },
  { name: "stat3", p: 82, type: "number" },
  { name: "stat4", p: 68, type: "number" },
  { name: "stat5", p: 51, type: "number" },
  { name: "stat6", p: 49, type: "number" },
  { name: "name", p: 0.1, type: "name" },
  { name: "ip", p: 0.2, type: "ip" },
  { name: "fw", p: 0.01, type: "fw" },
  { name: "parentId", p: 0.1, type: "existingId" },
  { name: "location", p: 0.1, type: "location" },
];

module.exports = {
  INITIAL_CLIENT_COUNT,
  HEADER_DEFINITION,
};
