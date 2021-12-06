const file = require("../loadFile");

const lines = file
  .toString()
  .split("\n")
  .map((l) => l.replace("->", ","));

const convertToKey = (x: number, y: number) => {
  return `${x}-${y}`;
};

const convertFromKey = (key: string) => {
  return key.split("-").map((v) => parseInt(v));
};

let map: Object = {};

const addToMap = (x: number, y: number) => {
  const key = convertToKey(x, y);
  const found = map[key];
  if (found) {
    map[key] += 1;
  } else {
    map[key] = 1;
  }
};

const part1 = () => {
  lines.forEach((line) => {
    const [x1, y1, x2, y2] = line
      .split(",")
      .map((v) => v.trim())
      .map((v) => parseInt(v));

    let difference = 0;
    if (x1 === x2 || y1 === y2) {
      if (x1 !== x2) {
        difference = Math.abs(x2 - x1);
        const start = Math.min(x1, x2);
        for (let i = 0; i <= difference; i++) {
          addToMap(start + i, y1);
        }
      } else if (y1 !== y2) {
        difference = Math.abs(y2 - y1);
        const start = Math.min(y1, y2);
        for (let i = 0; i <= difference; i++) {
          addToMap(x1, start + i);
        }
      }
    }
  });
  return Object.keys(map)
    .map((key) => map[key])
    .filter((v) => v > 1).length;
};

const part2 = () => {
  map = {};
  lines.forEach((line) => {
    const [x1, y1, x2, y2] = line
      .split(",")
      .map((v) => v.trim())
      .map((v) => parseInt(v));
    let difference = 0;
    if (x1 === x2 || y1 === y2) {
      if (x1 !== x2) {
        difference = Math.abs(x2 - x1);
        const start = Math.min(x1, x2);
        for (let i = 0; i <= difference; i++) {
          addToMap(start + i, y1);
        }
      }
      if (y1 !== y2) {
        difference = Math.abs(y2 - y1);
        const start = Math.min(y1, y2);
        for (let i = 0; i <= difference; i++) {
          addToMap(x1, start + i);
        }
      }
    } else {
      difference = Math.abs(parseInt(y2) - parseInt(y1));
      let negativeX = false;
      if (x2 < x1) {
        negativeX = true;
      }
      let negativeY = false;
      if (y2 < y1) {
        negativeY = true;
      }
      for (let i = 0; i <= difference; i++) {
        const newX = negativeX ? x1 - i : x1 + i;
        const newY = negativeY ? y1 - i : y1 + i;
        addToMap(newX, newY);
      }
    }
  });
  return Object.keys(map)
    .map((key) => map[key])
    .filter((v) => v > 1).length;
};

let now = Date.now();
let answer = part1();
let finished = Date.now();
console.log("Part 1: ", answer);
console.log("Took: ", (finished - now) / 1000);

now = Date.now();
answer = part2();
finished = Date.now();
console.log("Part 2: ", answer);
console.log("Took: ", (finished - now) / 1000);
