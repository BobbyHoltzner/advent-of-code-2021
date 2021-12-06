"use strict";
exports.__esModule = true;
var file = require("../loadFile");
var grid_1 = require("./grid");
var lines = file
    .toString()
    .split("\n")
    .map(function (l) { return l.replace("->", ","); });
var board = [];
var addCard = function (x, y) {
    var exists = board.find(function (g) { return g.getX() === x && g.getY() === y; });
    if (exists) {
        exists.setValue(exists.getValue() + 1);
    }
    else {
        var grid = new grid_1["default"](x, y);
        grid.setValue(1);
        board.push(grid);
    }
};
var part1 = function () {
    lines.forEach(function (line) {
        var _a = line.split(",").map(function (v) { return v.trim(); }), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        var difference = 0;
        if (x1 === x2 || y1 === y2) {
            if (x1 !== x2) {
                difference = Math.abs(parseInt(x2) - parseInt(x1));
                var start = Math.min(parseInt(x1), parseInt(x2));
                for (var i = 0; i <= difference; i++) {
                    addCard((start + i).toString(), y1);
                }
            }
            else if (y1 !== y2) {
                difference = Math.abs(parseInt(y2) - parseInt(y1));
                var start = Math.min(parseInt(y1), parseInt(y2));
                for (var i = 0; i <= difference; i++) {
                    addCard(x1, (start + i).toString());
                }
            }
        }
    });
    var gridsWithGreaterThanOne = board.filter(function (grid) { return grid.getValue() > 1; });
    return gridsWithGreaterThanOne.length;
};
var part2 = function () {
    board = [];
    lines.forEach(function (line) {
        var _a = line.split(",").map(function (v) { return v.trim(); }), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        var difference = 0;
        if (x1 === x2 || y1 === y2) {
            if (x1 !== x2) {
                difference = Math.abs(parseInt(x2) - parseInt(x1));
                var start = Math.min(parseInt(x1), parseInt(x2));
                for (var i = 0; i <= difference; i++) {
                    addCard((start + i).toString(), y1);
                }
            }
            if (y1 !== y2) {
                difference = Math.abs(parseInt(y2) - parseInt(y1));
                var start = Math.min(parseInt(y1), parseInt(y2));
                for (var i = 0; i <= difference; i++) {
                    addCard(x1, (start + i).toString());
                }
            }
        }
        else {
            difference = Math.abs(parseInt(y2) - parseInt(y1));
            var negativeX = false;
            if (parseInt(x2) < parseInt(x1)) {
                negativeX = true;
            }
            var negativeY = false;
            if (parseInt(y2) < parseInt(y1)) {
                negativeY = true;
            }
            for (var i = 0; i <= difference; i++) {
                var newX = negativeX ? parseInt(x1) - i : parseInt(x1) + i;
                var newY = negativeY ? parseInt(y1) - i : parseInt(y1) + i;
                addCard(newX.toString(), newY.toString());
            }
        }
    });
    var gridsWithGreaterThanOne = board.filter(function (grid) { return grid.getValue() > 1; });
    return gridsWithGreaterThanOne.length;
};
var now = Date.now();
var answer = part1();
var finished = Date.now();
console.log("Part 1: ", answer);
console.log("Took: ", (finished - now) / 1000);
now = Date.now();
answer = part2();
finished = Date.now();
console.log("Part 2: ", answer);
console.log("Took: ", (finished - now) / 1000);
// Part 1:  4993
// Took:  110.242
// Part 2:  21101
// Took:  537.213
