const file = require("../loadFile");
import Grid from "./grid";

const lines = file
  .toString()
  .split("\n")
  .map((l) => l.replace("->", ","));

let board: Grid[] = [];

const addCard = (x: string, y: string) => {
  const exists = board.find((g) => g.getX() === x && g.getY() === y);
  if (exists) {
    exists.setValue(exists.getValue() + 1);
  } else {
    const grid = new Grid(x, y);
    grid.setValue(1);
    board.push(grid);
  }
};

const part1 = () => {
  lines.forEach((line) => {
    const [x1, y1, x2, y2] = line.split(",").map((v) => v.trim());
    let difference = 0;
    if (x1 === x2 || y1 === y2) {
      if (x1 !== x2) {
        difference = Math.abs(parseInt(x2) - parseInt(x1));
        const start = Math.min(parseInt(x1), parseInt(x2));
        for (let i = 0; i <= difference; i++) {
          addCard((start + i).toString(), y1);
        }
      } else if (y1 !== y2) {
        difference = Math.abs(parseInt(y2) - parseInt(y1));
        const start = Math.min(parseInt(y1), parseInt(y2));
        for (let i = 0; i <= difference; i++) {
          addCard(x1, (start + i).toString());
        }
      }
    }
  });
  const gridsWithGreaterThanOne = board.filter((grid) => grid.getValue() > 1);

  return gridsWithGreaterThanOne.length;
};

const part2 = () => {
  board = [];
  lines.forEach((line) => {
    const [x1, y1, x2, y2] = line.split(",").map((v) => v.trim());
    let difference = 0;
    if (x1 === x2 || y1 === y2) {
      if (x1 !== x2) {
        difference = Math.abs(parseInt(x2) - parseInt(x1));
        const start = Math.min(parseInt(x1), parseInt(x2));
        for (let i = 0; i <= difference; i++) {
          addCard((start + i).toString(), y1);
        }
      }
      if (y1 !== y2) {
        difference = Math.abs(parseInt(y2) - parseInt(y1));
        const start = Math.min(parseInt(y1), parseInt(y2));
        for (let i = 0; i <= difference; i++) {
          addCard(x1, (start + i).toString());
        }
      }
    } else {
      difference = Math.abs(parseInt(y2) - parseInt(y1));
      let negativeX = false;
      if (parseInt(x2) < parseInt(x1)) {
        negativeX = true;
      }
      let negativeY = false;
      if (parseInt(y2) < parseInt(y1)) {
        negativeY = true;
      }
      for (let i = 0; i <= difference; i++) {
        const newX = negativeX ? parseInt(x1) - i : parseInt(x1) + i;
        const newY = negativeY ? parseInt(y1) - i : parseInt(y1) + i;
        addCard(newX.toString(), newY.toString());
      }
    }
  });
  const gridsWithGreaterThanOne = board.filter((grid) => grid.getValue() > 1);

  return gridsWithGreaterThanOne.length;
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
