const fs = require("fs");

const file = fs.readFileSync("./dataset.txt");

const lines = file.toString().split("\n");

let current = null;
let increaseCount = 0;
let decreaseCount = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i + 2]) {
    const sum =
      parseInt(lines[i]) + parseInt(lines[i + 1]) + parseInt(lines[i + 2]);
    if (current == null) {
      current = sum;
    } else if (current < sum) {
      increaseCount += 1;
      current = sum;
    } else {
      decreaseCount += 1;
      current = sum;
    }
  }
}

console.log(increaseCount); // 1734
