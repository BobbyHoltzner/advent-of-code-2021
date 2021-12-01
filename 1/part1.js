const fs = require("fs");

const file = fs.readFileSync("./dataset.txt");

const lines = file.toString().split("\n");

let current = null;
let increaseCount = 0;
let decreaseCount = 0;

// Part 1
lines.forEach((l) => {
  l = parseInt(l);
  if (current === null) {
    current = l;
  } else if (current < l) {
    increaseCount += 1;
    current = l;
  } else {
    decreaseCount += 1;
    current = l;
  }
});

console.log(increaseCount);
