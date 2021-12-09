const file = require("../loadFile");

const dataset: string[] = file.toString().split("\n");

const convertToKey = (x: number, y: number) => {
  return `${x}-${y}`;
};

const getColumnAndRowFromKey = (key: string) => {
  const [column, row] = key.split("-");
  return { column: parseInt(column), row: parseInt(row) };
};

const createMapFromData = () => {
  const map = {};
  dataset.forEach((row, rowIndex) => {
    row.split("").forEach((value, columnIndex) => {
      const key = convertToKey(columnIndex, rowIndex);
      map[key] = value;
    });
  });
  return map;
};

const getMaxRow = () => {
  return dataset.length - 1;
};
const getMaxColumn = () => {
  return dataset[0].length - 1;
};

const getLowPoints = () => {
  const lowPoints = [];
  const map = createMapFromData();
  const maxRow = getMaxRow();
  const maxColumn = getMaxColumn();
  Object.keys(map).forEach((key) => {
    const { column, row } = getColumnAndRowFromKey(key);
    const value = map[key];
    const below = map[convertToKey(column, row + 1)];
    const right = map[convertToKey(column + 1, row)];
    const above = map[convertToKey(column, row - 1)];
    const left = map[convertToKey(column - 1, row)];
    // Get the case for topLeft (2) Only check below, right
    if (row === 0 && column === 0) {
      if (value < below && value < right) {
        lowPoints.push({ column, row, value });
      }
    }
    // Get case for topRight (2), only check below, left
    else if (row === 0 && column === maxColumn) {
      if (value < below && value < left) {
        lowPoints.push({ column, row, value });
      }
    }
    // Get case for bottomLeft (2) Only check up, right
    else if (row === maxRow && column === 0) {
      if (value < above && value < right) {
        lowPoints.push({ column, row, value });
      }
    }
    // Get case for bottomRight (2) Only check up, left
    else if (row === maxRow && column === maxColumn) {
      if (value < above && value < left) {
        lowPoints.push({ column, row, value });
      }
    }
    /// Get the case for the top row (only check below, right, left)
    else if (row === 0) {
      if (value < below && value < left && value < right) {
        lowPoints.push({ column, row, value });
      }
    }
    /// Get the case for the bottom row (only check above, right, left)
    else if (row === maxRow) {
      if (value < above && value < left && value < right) {
        lowPoints.push({ column, row, value });
      }
    }
    /// Get the case for the first column (only check right, above, below)
    else if (column === 0) {
      if (value < below && value < above && value < right) {
        lowPoints.push({ column, row, value });
      }
    }
    /// Get the case for the last column (only check left, above, below)
    else if (column === maxColumn) {
      if (value < below && value < left && value < above) {
        lowPoints.push({ column, row, value });
      }
    }
    // Check all 4 sides
    else {
      if (value < below && value < left && value < right && value < above) {
        lowPoints.push({ column, row, value });
      }
    }
  });
  return lowPoints;
};

const getSumOfLowPoints = () => {
  const lowPoints = getLowPoints();
  return lowPoints.reduce((a, b) => a + parseInt(b.value) + 1, 0);
};

const sum = getSumOfLowPoints(); // 603
console.log(sum);

const getLargestBasins = () => {
  let basins = [];
  const map = createMapFromData();
  const lowPoints = getLowPoints();
  lowPoints.forEach((l, i) => {
    basins.push(findAllInBasin(map, l));
  });
  basins = Object.keys(basins)
    .map((b) => Object.values(basins[b]).length)
    .sort((a, b) => b - a);
  const one = basins[0];
  const two = basins[1];
  const three = basins[2];
  return one * two * three;
};

const findAllInBasin = (map, lowPoint) => {
  const basin = {};
  const { column, row, value } = lowPoint;
  const below = { column, row: row + 1 };
  const right = { column: column + 1, row };
  const above = { column, row: row - 1 };
  const left = { column: column - 1, row };
  [below, right, above, left]
    .filter((v) => v.row >= 0 && v.column >= 0)
    .map((v) => {
      v["value"] = map[convertToKey(v.column, v.row)];
      if (!v["value"] || parseInt(v["value"]) === 9) {
        return false;
      } else {
        basin[convertToKey(v.column, v.row)] = v["value"];
        return recursivelyFindBasins(map, basin, v);
      }
    });
  return basin;
};

const recursivelyFindBasins = (map, basins, point) => {
  const { column, row, value } = point;
  basins[convertToKey(column, row)] = value;
  const below = { column, row: row + 1 };
  const right = { column: column + 1, row };
  const above = { column, row: row - 1 };
  const left = { column: column - 1, row };
  below["value"] = map[convertToKey(below.column, below.row)];
  right["value"] = map[convertToKey(right.column, right.row)];
  above["value"] = map[convertToKey(above.column, above.row)];
  left["value"] = map[convertToKey(left.column, left.row)];
  if (below["value"] && parseInt(below["value"]) !== 9) {
    const key = convertToKey(below.column, below.row);
    if (key in basins) {
    } else {
      basins[convertToKey(below.column, below.row)] = below["value"];
      recursivelyFindBasins(map, basins, below);
    }
  }
  if (above["value"] && parseInt(above["value"]) !== 9) {
    const key = convertToKey(above.column, above.row);
    if (key in basins) {
    } else {
      basins[convertToKey(above.column, above.row)] = above["value"];
      recursivelyFindBasins(map, basins, above);
    }
  }
  if (right["value"] && parseInt(right["value"]) !== 9) {
    const key = convertToKey(right.column, right.row);
    if (key in basins) {
    } else {
      recursivelyFindBasins(map, basins, right);
      return true;
    }
  }
  if (left["value"] && parseInt(left["value"]) !== 9) {
    const key = convertToKey(left.column, left.row);
    if (key in basins) {
    } else {
      recursivelyFindBasins(map, basins, left);
      return true;
    }
  }
  return false;
};

const largestBasins = getLargestBasins();
console.log(largestBasins);
