const file = require("../loadFile");

const data = file
  .toString()
  .split(",")
  .map((v) => parseInt(v));

const generateMap = () => {
  const map = {};
  // We know we can use any number from 0 to the max
  const max = Math.max(...data);
  for (let i = 0; i <= max; i++) {
    map[i.toString()] = 0;
  }
  return map;
};

// Get the cost per each step 1 = 1, 2 = 2, etc.
const getCostForSteps = (steps: number) => {
  let cost = 0;
  for (let i = 1; i <= steps; i++) {
    cost += i;
  }
  return cost;
};

const getOptimalFuel = (cost_per_step?: number) => {
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
  return Math.min(...mapValues);
};

const part1 = getOptimalFuel(1); //352254
console.log(part1);

const part2 = getOptimalFuel(); //99053143
console.log(part2);
