var file = require("../loadFile");
var dataset = file.toString().split("\n");
var convertToKey = function (x, y) {
    return "".concat(x, "-").concat(y);
};
var getColumnAndRowFromKey = function (key) {
    var _a = key.split("-"), column = _a[0], row = _a[1];
    return { column: parseInt(column), row: parseInt(row) };
};
var createMapFromData = function () {
    var map = {};
    dataset.forEach(function (row, rowIndex) {
        row.split("").forEach(function (value, columnIndex) {
            var key = convertToKey(columnIndex, rowIndex);
            map[key] = value;
        });
    });
    return map;
};
var getMaxRow = function () {
    return dataset.length - 1;
};
var getMaxColumn = function () {
    return dataset[0].length - 1;
};
var getLowPoints = function () {
    var lowPoints = [];
    var map = createMapFromData();
    var maxRow = getMaxRow();
    var maxColumn = getMaxColumn();
    Object.keys(map).forEach(function (key) {
        var _a = getColumnAndRowFromKey(key), column = _a.column, row = _a.row;
        var value = map[key];
        var below = map[convertToKey(column, row + 1)];
        var right = map[convertToKey(column + 1, row)];
        var above = map[convertToKey(column, row - 1)];
        var left = map[convertToKey(column - 1, row)];
        // Get the case for topLeft (2) Only check below, right
        if (row === 0 && column === 0) {
            if (value < below && value < right) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
        // Get case for topRight (2), only check below, left
        else if (row === 0 && column === maxColumn) {
            if (value < below && value < left) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
        // Get case for bottomLeft (2) Only check up, right
        else if (row === maxRow && column === 0) {
            if (value < above && value < right) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
        // Get case for bottomRight (2) Only check up, left
        else if (row === maxRow && column === maxColumn) {
            if (value < above && value < left) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
        /// Get the case for the top row (only check below, right, left)
        else if (row === 0) {
            if (value < below && value < left && value < right) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
        /// Get the case for the bottom row (only check above, right, left)
        else if (row === maxRow) {
            if (value < above && value < left && value < right) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
        /// Get the case for the first column (only check right, above, below)
        else if (column === 0) {
            if (value < below && value < above && value < right) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
        /// Get the case for the last column (only check left, above, below)
        else if (column === maxColumn) {
            if (value < below && value < left && value < above) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
        // Check all 4 sides
        else {
            if (value < below && value < left && value < right && value < above) {
                lowPoints.push({ column: column, row: row, value: value });
            }
        }
    });
    return lowPoints;
};
var getSumOfLowPoints = function () {
    var lowPoints = getLowPoints();
    return lowPoints.reduce(function (a, b) { return a + parseInt(b.value) + 1; }, 0);
};
var sum = getSumOfLowPoints(); // 603
console.log(sum);
var getLargestBasins = function () {
    var basins = [];
    var map = createMapFromData();
    var lowPoints = getLowPoints();
    lowPoints.forEach(function (l, i) {
        basins.push(findAllInBasin(map, l));
    });
    basins = Object.keys(basins)
        .map(function (b) { return Object.values(basins[b]).length; })
        .sort(function (a, b) { return b - a; });
    var one = basins[0];
    var two = basins[1];
    var three = basins[2];
    return one * two * three;
};
var findAllInBasin = function (map, lowPoint) {
    var basin = {};
    var column = lowPoint.column, row = lowPoint.row, value = lowPoint.value;
    var below = { column: column, row: row + 1 };
    var right = { column: column + 1, row: row };
    var above = { column: column, row: row - 1 };
    var left = { column: column - 1, row: row };
    [below, right, above, left]
        .filter(function (v) { return v.row >= 0 && v.column >= 0; })
        .map(function (v) {
        v["value"] = map[convertToKey(v.column, v.row)];
        if (!v["value"] || parseInt(v["value"]) === 9) {
            return false;
        }
        else {
            basin[convertToKey(v.column, v.row)] = v["value"];
            return recursivelyFindBasins(map, basin, v);
        }
    });
    return basin;
};
var recursivelyFindBasins = function (map, basins, point) {
    var column = point.column, row = point.row, value = point.value;
    basins[convertToKey(column, row)] = value;
    var below = { column: column, row: row + 1 };
    var right = { column: column + 1, row: row };
    var above = { column: column, row: row - 1 };
    var left = { column: column - 1, row: row };
    below["value"] = map[convertToKey(below.column, below.row)];
    right["value"] = map[convertToKey(right.column, right.row)];
    above["value"] = map[convertToKey(above.column, above.row)];
    left["value"] = map[convertToKey(left.column, left.row)];
    if (below["value"] && parseInt(below["value"]) !== 9) {
        var key = convertToKey(below.column, below.row);
        if (key in basins) {
        }
        else {
            basins[convertToKey(below.column, below.row)] = below["value"];
            recursivelyFindBasins(map, basins, below);
        }
    }
    if (above["value"] && parseInt(above["value"]) !== 9) {
        var key = convertToKey(above.column, above.row);
        if (key in basins) {
        }
        else {
            basins[convertToKey(above.column, above.row)] = above["value"];
            recursivelyFindBasins(map, basins, above);
        }
    }
    if (right["value"] && parseInt(right["value"]) !== 9) {
        var key = convertToKey(right.column, right.row);
        if (key in basins) {
        }
        else {
            recursivelyFindBasins(map, basins, right);
            return true;
        }
    }
    if (left["value"] && parseInt(left["value"]) !== 9) {
        var key = convertToKey(left.column, left.row);
        if (key in basins) {
        }
        else {
            recursivelyFindBasins(map, basins, left);
            return true;
        }
    }
    return false;
};
var largestBasins = getLargestBasins();
console.log(largestBasins);
