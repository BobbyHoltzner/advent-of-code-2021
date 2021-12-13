const file = require("../loadFile");

const dataset = file
  .toString()
  .split("\n")
  .filter((v) => v)
  .map((line: string) => line.split("").map((v) => parseInt(v)));

const totalSteps = 100;
let synchronizedFlash = null;
let flashes = 0;
let currentStep = 0;

const createKey = (i: number, j: number) => {
  return `${i}-${j}`;
};

const increaseEnergy = ({ i, j, set }) => {
  if (
    typeof dataset[i] !== "undefined" &&
    typeof dataset[i][j] !== "undefined"
  ) {
    const key = createKey(i, j);
    if (set.has(key)) return;

    dataset[i][j]++;

    // If greater than 9 then it's flashing
    if (dataset[i][j] > 9) {
      dataset[i][j] = 0;
      set.add(key);
      flashes++;

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) continue;

          increaseEnergy({ i: i + x, j: j + y, set });
        }
      }
      return;
    }
  }
};

const step = () => {
  currentStep += 1;
  const s = new Set();

  for (let i = 0; i < dataset.length; i++) {
    const line = dataset[i];
    for (let j = 0; j < line.length; j++) {
      increaseEnergy({ i, j, set: s });
    }
  }

  if (!synchronizedFlash && s.size === dataset.length * dataset[0].length) {
    synchronizedFlash = currentStep;
  }
};

for (let i = 0; i < totalSteps; i++) {
  step();
}

console.log(flashes);

if (!synchronizedFlash) {
  while (!synchronizedFlash) {
    step();
  }
}

console.log(synchronizedFlash);
