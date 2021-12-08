const file = require("../loadFile");

const dataset: string[] = file.toString().split("\n");

const getCharactersPerSegment = (segment: string) => {
  switch (segment) {
    case "a":
    case "d":
    case "g":
      return 4;
    default:
      return 2;
  }
};

// Find the uniques and place them, we need to use the data before the pipe to determine the wires and reorganize the display per each
// Loop through each line and create the display
// Use that display

const displayPart1 = {
  0: ["a", "b", "c", "e", "f", "g"],
  1: ["c", "f"],
  2: ["a", "c", "d", "e", "g"],
  3: ["a", "c", "d", "f", "g"],
  4: ["b", "c", "d", "f"],
  5: ["a", "b", "d", "f", "g"],
  6: ["a", "b", "d", "e", "f", "g"],
  7: ["a", "c", "f"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"],
};

const displayPart2 = {
  0: ["e", "d", "a", "b", "c", "g"],
  1: ["a", "b"],
  2: ["d", "a", "f", "g", "c"],
  3: ["d", "a", "f", "b", "c"],
  4: ["e", "f", "a", "b"],
  5: ["d", "e", "f", "b", "c"],
  6: ["d", "e", "f", "g", "b", "c"],
  7: ["d", "a", "b"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["d", "e", "a", "f", "b", "c"],
};

const getSegmentCounts = (display) => {
  const map = {};
  Object.keys(display).forEach((key) => {
    map[key] = display[key].length;
  });
  return map;
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const getUniques = (segmentCounts: { [key: string]: number }) => {
  const map = {};
  Object.keys(segmentCounts).forEach((key) => {
    if (map[segmentCounts[key]]) {
      map[segmentCounts[key]] += 1;
    } else {
      map[segmentCounts[key]] = 1;
    }
  });

  return Object.keys(map)
    .map((key) => {
      if (map[key] === 1) {
        return Object.values(segmentCounts).find((v) => parseInt(key) === v);
      }
    })
    .filter((v) => v);
};

const getValueForString = (display: Object, str: string) => {
  const length = str.length;
  const possibleValuesBasedOnLength = Object.keys(display)
    .filter((key) => display[key].length === length)
    .map((key) => ({ key, value: display[key] }));
  const stringSplit = str.split("");
  console.log(str);
  const found = possibleValuesBasedOnLength.find((p) => {
    return stringSplit.every((v) => p.value.includes(v));
  });
  console.log("Found: ", found);
  return found;
};

const partOne = () => {
  const segmentCounts = getSegmentCounts(displayPart1);
  const uniques = getUniques(segmentCounts);
  const instructions = [];
  dataset
    .map((d: string) => d.split("|")[1].trim())
    .map((v) => v.split(" "))
    .forEach((v) => v.forEach((instruction) => instructions.push(instruction)));

  let count = 0;
  instructions.forEach((i) => {
    if (uniques.indexOf(i.length) !== -1) {
      count++;
    }
  });
  return count;
};

const partTwo = () => {
  const segmentCounts = getSegmentCounts(displayPart2);
  let uniques = getUniques(segmentCounts);
  const instructions = [];
  dataset
    .map((d: string) => d.split("|")[1].trim())
    .map((v) => v.split(" "))
    .forEach((v) => instructions.push(v));

  const values = {};
  instructions.forEach((instruction, index) => {
    // Create a display here...
    instruction.forEach((single) => {
      if (!values[index]) {
        values[index] = [];
      }
      if (uniques.indexOf(single.length) !== -1) {
        values[index].push(getKeyByValue(segmentCounts, single.length));
      } else {
        // Pass the new display in, do we need to get segment counts for each?
        const value = getValueForString(displayPart2, single);
        if (value) {
          values[index].push(value.key);
        }
      }
    });
  });
  let total = 0;
  console.log(values["3"]);
  Object.keys(values).forEach((v) => {
    const value = values[v].toString().replace(/,/g, "");
    total += parseInt(value);
  });
  return total;
};

const count = partOne();
console.log(count);

const total = partTwo();
console.log(total);

let checker = (arr, target) => target.every((v) => arr.includes(v));
const test = ["d", "e", "a", "f", "b", "c"];
const val = ["e", "f", "a", "b", "c", "d"];

console.log(checker(test, val));
