const file = require("../loadFile");

const data = file
  .toString()
  .split(",")
  .map((v) => parseInt(v));

const generateMap = () => {
  const map = {};
  // Make the dataset unique values
  const set = new Set(data);
  Array.from(set).forEach((v) => {
    map[v.toString()] = 0;
  });
  return map;
};

const getCostForSteps = (steps: number) => {
  let cost = 0;
  for (let i = 1; i <= steps; i++) {
    cost += i;
  }
  return cost;
};

const partOne = (cost_per_step?: number) => {
  const map = generateMap();
  Object.keys(map).forEach((key) => {
    let total = 0;
    const position = parseInt(key);
    data.forEach((val) => {
      // Get cost per step
      const steps = Math.abs(position - val);
      if (cost_per_step == 1) {
        total += steps;
      } else {
        const cost = getCostForSteps(steps);
        total += cost;
      }
    });
    map[key] = total;
  });
  const mapValues: number[] = Object.values(map);
  //   console.log(map);
  return Math.min(...mapValues);
};

const optimalFuel = partOne(1); //37
console.log(optimalFuel);

const optimalFuelPart2 = partOne();
console.log(optimalFuelPart2);
