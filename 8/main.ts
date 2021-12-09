const file = require("../loadFile");

const dataset: string[] = file.toString().split("\n");

const display = {
  topLeft: "",
  top: "",
  topRight: "",
  middle: "",
  bottomRight: "",
  bottom: "",
  bottomLeft: "",
};

const getDifference = (a, b) => {
  return a.filter((x) => !b.includes(x));
};

function symmetricDifference(a1, a2) {
  var result = [];
  for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
      result.push(a1[i]);
    }
  }
  for (i = 0; i < a2.length; i++) {
    if (a1.indexOf(a2[i]) === -1) {
      result.push(a2[i]);
    }
  }
  return result;
}

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

const createDisplay = (v) => {
  return {
    0: [v.top, v.topRight, v.bottomRight, v.bottom, v.bottomLeft, v.topLeft],
    1: [v.topRight, v.bottomRight],
    2: [v.top, v.topRight, v.middle, v.bottomLeft, v.bottom],
    3: [v.top, v.topRight, v.middle, v.bottomRight, v.bottom],
    4: [v.topLeft, v.middle, v.topRight, v.bottomRight],
    5: [v.top, v.topLeft, v.middle, v.bottomRight, v.bottom],
    6: [v.top, v.topLeft, v.bottomLeft, v.middle, v.bottom, v.bottomRight],
    7: [v.top, v.topRight, v.bottomRight],
    8: [
      v.top,
      v.topRight,
      v.bottomRight,
      v.middle,
      v.bottom,
      v.bottomLeft,
      v.topLeft,
    ],
    9: [v.top, v.topRight, v.bottomRight, v.middle, v.bottom, v.topLeft],
  };
};

const getSegmentCounts = (display) => {
  const map = {};
  Object.keys(display).forEach((key) => {
    map[key] = display[key].length;
  });
  return map;
};

const getTopRight = (digit1, digit6) => {
  const split1 = digit1.split("");
  return split1.find((v) => {
    return !digit6.includes(v);
  });
};

const getDisplay = (lineValues: string[]) => {
  let available = "abcdefg";
  const d = { ...display };
  const two = lineValues.find((v) => v.length === 2).split("");
  const three = lineValues.find((v) => v.length === 3).split("");
  const four = lineValues.find((v) => v.length === 4);
  const five = lineValues.filter((v) => v.length === 5);
  const six = lineValues.filter((v) => v.length === 6);
  const seven = lineValues.find((v) => v.length === 7);
  const digit8 = seven;
  // We can find 6 because it's the only one of the 6 segment digits that uses both of the segments from digit 1
  const digit1 = lineValues.find((v) => v.length === 2);
  const digit6 = six.find(
    (v) =>
      (v.includes(two[0]) || v.includes(two[1])) &&
      (!v.includes(two[0]) || !v.includes(two[1]))
  );
  // We can find 3 because it's the only one of the 5 segment digits that uses both of the segments from digit 1
  const digit3 = five.find((v) => v.includes(two[0]) && v.includes(two[1]));
  // Now that we have the segments for 6, we can figure out which one of digit one is not included and can assume it's the top right
  d.topRight = getTopRight(digit1, digit6);
  available = available.replace(d.topRight, "");
  d.bottomRight = digit1.replace(d.topRight, "");
  available = available.replace(d.bottomRight, "");

  // We know that two and five both include one of the segments from one but not both
  const twoAndFive = five.filter(
    (v) =>
      (v.includes(two[0]) || v.includes(two[1])) &&
      (!v.includes(two[0]) || !v.includes(two[1]))
  );
  // Since we figured out which segment was top right, we can determine which 5 segment is digit 2 and which is digit 5
  const digit5 = twoAndFive.find((v) => !v.includes(d.topRight));
  // Since we now have digit 5, we can get the difference between 5 and 6 and assume it's bottom left
  d.bottomLeft = symmetricDifference(digit5, digit6)[0];
  available = available.replace(d.bottomLeft, "");

  // Top is the difference between the two segment (digit 1) and three segment (digit 7)
  d.top = symmetricDifference(two, three).toString();
  available = available.replace(d.top, "");

  // We can get 0 because we know that it has both topRight and bottomLeft
  const digit0 = six.find(
    (v) => v.includes(d.topRight) && v.includes(d.bottomLeft)
  );
  d.middle = symmetricDifference(digit0, digit8)[0];
  available = available.replace(d.middle, "");

  d.topLeft = four
    .replace(d.middle, "")
    .replace(d.topRight, "")
    .replace(d.bottomRight, "");
  available = available.replace(d.topLeft, "");

  d.bottom = available;
  return createDisplay(d);
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
  return possibleValuesBasedOnLength.find((p) => {
    return stringSplit.every((v) => p.value.includes(v));
  });
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
  const segmentCounts = getSegmentCounts(displayPart1);
  let uniques = getUniques(segmentCounts);
  const instructions = [];
  const displayInstructions = dataset
    .map((d: string) => d.split("|")[0].trim())
    .map((v) => v.split(" "));

  // console.log(displayInstructions);
  dataset
    .map((d: string) => d.split("|")[1].trim())
    .map((v) => v.split(" "))
    .forEach((v) => instructions.push(v));

  const values = {};
  instructions.forEach((instruction, index) => {
    const display = getDisplay(displayInstructions[index]);
    instruction.forEach((single) => {
      if (!values[index]) {
        values[index] = [];
      }
      if (uniques.indexOf(single.length) !== -1) {
        values[index].push(getKeyByValue(segmentCounts, single.length));
      } else {
        // Pass the new display in, do we need to get segment counts for each?
        const value = getValueForString(display, single);
        if (value) {
          values[index].push(value.key);
        }
      }
    });
  });
  let total = 0;
  Object.keys(values).forEach((v) => {
    const value = values[v].toString().replace(/,/g, "");
    total += parseInt(value);
  });
  return total;
};

const count = partOne();
console.log(count); //255

const total = partTwo();
console.log(total); // 982158
