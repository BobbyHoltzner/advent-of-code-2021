const file = require("../loadFile");

const dataset: number[] = file
  .toString()
  .split(",")
  .map((v) => parseInt(v));

const part1 = (days) => {
  let fish = [...dataset];
  for (let i = 0; i < days; i++) {
    fish.forEach((f, index, a) => {
      if (f === 0) {
        a[index] = 6;
        fish.push(8);
      } else {
        a[index] = a[index] - 1;
      }
    });
    const memory = process.memoryUsage();
    console.log(i, (memory.heapUsed / 1024 / 1024 / 1024).toFixed(4), "GB");
  }
  return fish.length;
};

// const fishCount = part1(80); // 5934
// console.log(fishCount);

const fishCountPart2 = part1(256);
console.log(fishCountPart2);
