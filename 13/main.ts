const file = require("../loadFile");

let [dots, instructions] = file
  .toString()
  .split("\n\n")
  .map((l) => l.split("\n"));

const createKey = (x: number, y: number) => {
  return `${x}-${y}`;
};

const createMap = (dataset) => {
  const map = {};
  dataset.forEach((d) => {
    const [x, y] = d.split(",").map((v) => parseInt(v));
    const key = createKey(x, y);
    map[key] = 1;
  });
  return map;
};

const parseInstruction = (instruction: string) => {
  const split = instruction.split("=");
  const axis = split[0].charAt(split[0].length - 1);
  const position = parseInt(split[1]);
  return { axis, position };
};

const getVisibleDots = (map) => {
  return Object.keys(map)
    .map((v) => map[v] > 0 && v)
    .filter((v) => v);
};

const decodeMessage = (map) => {
  const max = getMaxFromMap(map);
  // Add one to the max to get the right spacing
  const messageGrid = Array.from(Array(max.y + 1), () =>
    Array(max.x + 1).fill(" ")
  );
  const visible = getVisibleDots(map);
  visible.forEach((v) => {
    const [x, y] = v.split("-").map((s) => parseInt(s));
    messageGrid[y][x] = "#";
  });
  console.log(messageGrid.map((row) => row.join("")).join("\n"));
};

const partOne = (data) => {
  const map = createMap(data);
  instructions.forEach((instruction, index) => {
    const { axis, position } = parseInstruction(instruction);
    const keysToDelete: Set<string> = new Set();
    Object.keys(map).forEach((key) => {
      const oldKey = key;
      const value = map[oldKey];
      const [oldX, oldY] = key.split("-").map((v) => parseInt(v));
      if (axis === "x") {
        if (oldX >= position) {
          if (value > 0) {
            const newX = position * 2 - oldX;
            const newKey = createKey(newX, oldY);
            if (map[newKey]) {
              map[newKey] += 1;
            } else {
              map[newKey] = 1;
            }
          }
          keysToDelete.add(oldKey);
        }
      } else if (axis === "y") {
        if (oldY >= position) {
          if (value > 0) {
            const newY = position * 2 - oldY;
            const newKey = createKey(oldX, newY);
            if (map[newKey]) {
              map[newKey] += 1;
            } else {
              map[newKey] = 1;
            }
          }
          keysToDelete.add(oldKey);
        }
      }
      Array.from(keysToDelete).forEach((key) => {
        delete map[key];
      });
    });
    console.log("Step: ", index + 1, getVisibleDots(map).length);
  });
  return map;
};

const getMaxFromMap = (map) => {
  const xValues: Set<number> = new Set();
  const yValues: Set<number> = new Set();
  Object.keys(map).forEach((key) => {
    const [x, y] = key.split("-");
    xValues.add(parseInt(x));
    yValues.add(parseInt(y));
  });
  return {
    x: Math.max(...Array.from(xValues)),
    y: Math.max(...Array.from(yValues)),
  };
};

const fillMap = (map) => {
  const max = getMaxFromMap(map);
  for (let i = 0; i <= max.x; i++) {
    for (let j = 0; j <= max.y; j++) {
      const key = createKey(i, j);
      map[key] = map[key] || 0;
    }
  }
};

const map = partOne(dots);

decodeMessage(map);
