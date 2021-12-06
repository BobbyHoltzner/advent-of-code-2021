var file = require("../loadFile");
var lines = file
    .toString()
    .split("\n")
    .map(function (l) { return l.replace("->", ","); });
var convertToKey = function (x, y) {
    return x + "-" + y;
};
var convertFromKey = function (key) {
    return key.split("-").map(function (v) { return parseInt(v); });
};
var map = {};
var addToMap = function (x, y) {
    var key = convertToKey(x, y);
    var found = map[key];
    if (found) {
        map[key] += 1;
    }
    else {
        map[key] = 1;
    }
};
var part1 = function () {
    lines.forEach(function (line) {
        var _a = line
            .split(",")
            .map(function (v) { return v.trim(); })
            .map(function (v) { return parseInt(v); }), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        var difference = 0;
        if (x1 === x2 || y1 === y2) {
            if (x1 !== x2) {
                difference = Math.abs(x2 - x1);
                var start = Math.min(x1, x2);
                for (var i = 0; i <= difference; i++) {
                    addToMap(start + i, y1);
                }
            }
            else if (y1 !== y2) {
                difference = Math.abs(y2 - y1);
                var start = Math.min(y1, y2);
                for (var i = 0; i <= difference; i++) {
                    addToMap(x1, start + i);
                }
            }
        }
    });
    return Object.keys(map)
        .map(function (key) { return map[key]; })
        .filter(function (v) { return v > 1; }).length;
};
var part2 = function () {
    map = {};
    lines.forEach(function (line) {
        var _a = line
            .split(",")
            .map(function (v) { return v.trim(); })
            .map(function (v) { return parseInt(v); }), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        var difference = 0;
        if (x1 === x2 || y1 === y2) {
            if (x1 !== x2) {
                difference = Math.abs(x2 - x1);
                var start = Math.min(x1, x2);
                for (var i = 0; i <= difference; i++) {
                    addToMap(start + i, y1);
                }
            }
            if (y1 !== y2) {
                difference = Math.abs(y2 - y1);
                var start = Math.min(y1, y2);
                for (var i = 0; i <= difference; i++) {
                    addToMap(x1, start + i);
                }
            }
        }
        else {
            difference = Math.abs(parseInt(y2) - parseInt(y1));
            var negativeX = false;
            if (x2 < x1) {
                negativeX = true;
            }
            var negativeY = false;
            if (y2 < y1) {
                negativeY = true;
            }
            for (var i = 0; i <= difference; i++) {
                var newX = negativeX ? x1 - i : x1 + i;
                var newY = negativeY ? y1 - i : y1 + i;
                addToMap(newX, newY);
            }
        }
    });
    return Object.keys(map)
        .map(function (key) { return map[key]; })
        .filter(function (v) { return v > 1; }).length;
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
