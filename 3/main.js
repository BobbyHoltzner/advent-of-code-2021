// Run this from the /3 directory because paths are relative
const file = require("../loadFile");
const lines = file.toString().split("\n");

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

const getMostCommonBit = (bitCount) => {};
const getLeastCommonBit = (bitCount) => {};

const part1 = (rows) => {
  const columns = splitToColumns(rows);
  Object.keys(columns).forEach((key) => {
    const column = columns[key];
    const bitCounts = getBitCounts(column);
    console.log(bitCounts);
  });
};

part1(lines);
