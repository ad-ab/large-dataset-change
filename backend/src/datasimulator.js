const JSum = require("jsum");
const diff = require("./algorithms/diff");

const { generateNewItem, regenerateItem } = require("./generators");

class DataSimulator {
  data = [];
  previousData = [];
  difference = [];
  checksum = null;
  interval = null;
  deleteQueue = [];
  counter = 0;
  tickEvent = () => {};

  constructor(config, event) {
    for (let i = 0; i < config.SAMPLE_SIZE; i++) {
      this.data.push(generateNewItem());
    }
    if (event) this.tickEvent = event;
  }

  generate() {
    this.previousData = [...this.data];
    this.data = this.data.filter((x) => !this.deleteQueue.includes(x.id));

    this.deleteQueue = [];
    this.data = this.data.map(regenerateItem);
    const checksum = JSum.digest(this.data, "MD5", "hex");
    this.difference = diff(this.previousData, this.data);

    return {
      data: this.data,
      difference: this.difference,
      checksum,
      counter: this.counter,
    };
  }

  remove(id) {
    this.deleteQueue.push(Number(id));
  }

  get() {
    return {
      data: this.data,
      difference: this.difference,
      counter: this.counter,
    };
  }

  setTickEvent(event) {
    this.tickEvent = event;
  }

  start = (time = 2000) => {
    this.tickEvent(this.generate());

    console.log(this.counter);
    this.interval = setInterval(() => {
      this.counter++;
      console.log(this.counter);
      this.tickEvent(this.generate());
    }, time);
  };

  stop = () => {
    clearInterval(this.interval);
  };
}
module.exports = DataSimulator;
