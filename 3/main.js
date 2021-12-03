// Run this from the /3 directory because paths are relative
const file = require("../loadFile");
const dataset = file.toString().split("\n");

const splitToColumns = (lines) => {
  const columns = {};
  lines.forEach((line) => {
    const columnArr = line.split("");
    columnArr.forEach((column, index) => {
      if (!columns[index]) {
        columns[index] = [];
      }
      columns[index].push(column);
    });
  });
  return columns;
};

const getBitCounts = (arr) => {
  const bitCounts = {};
  arr.forEach((bit) => {
    if (!bitCounts[bit]) {
      bitCounts[bit] = 1;
    } else {
      bitCounts[bit] += 1;
    }
  });
  return bitCounts;
};

const getCommonBit = (bitCount) => {
  const arr = Object.values(bitCount);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const mostCommon = Object.keys(bitCount).find((key) => bitCount[key] === max);
  const leastCommon = Object.keys(bitCount).find(
    (key) => bitCount[key] === min
  );
  return {
    most: mostCommon,
    least: leastCommon,
  };
};

const convertBinaryToDecimal = (binary) => {
  return parseInt(binary, 2);
};

const part1 = (rows) => {
  const columns = splitToColumns(rows);
  let gammaRate = "";
  let epsilonRate = "";
  Object.keys(columns).forEach((key) => {
    const column = columns[key];
    const bitCounts = getBitCounts(column);
    const { most: gammaBit, least: epsilonBit } = getCommonBit(bitCounts);
    gammaRate += gammaBit;
    epsilonRate += epsilonBit;
  });
  const gammaDecimal = convertBinaryToDecimal(gammaRate);
  const epsilonDecimal = convertBinaryToDecimal(epsilonRate);

  const powerConsumption = gammaDecimal * epsilonDecimal;
  console.log(powerConsumption); // 1540244
};

const getRating = (type, values) => {
  let param = null;
  let equalValue = null;
  if (type === "oxygen") {
    param = "most";
    equalValue = "1";
  } else if (type === "co2") {
    param = "least";
    equalValue = "0";
  }

  const columnCount = values[0].length;

  for (let i = 0; i < columnCount; i++) {
    let columns = splitToColumns(values);
    const counts = getBitCounts(columns[i]);
    const bit = getCommonBit(counts);
    if (bit.most === bit.least) {
      bit[param] = equalValue;
    }
    values = values.filter((row) => row[i] === bit[param]);
    if (values.length === 1) {
      break;
    }
  }
  return values;
};

const part2 = (values) => {
  const oxygenRating = getRating("oxygen", values);
  const co2Rating = getRating("co2", values);

  const lifeSupportRating =
    convertBinaryToDecimal(oxygenRating) * convertBinaryToDecimal(co2Rating);

  console.log(lifeSupportRating); // 4203981
};

part1(dataset); // 1540244
part2(dataset); // 4203981
