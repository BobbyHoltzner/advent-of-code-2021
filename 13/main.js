var file = require("../loadFile");
var _a = file
    .toString()
    .split("\n\n")
    .map(function (l) { return l.split("\n"); }), dots = _a[0], instructions = _a[1];
var createKey = function (x, y) {
    return "".concat(x, "-").concat(y);
};
var createMap = function (dataset) {
    var map = {};
    dataset.forEach(function (d) {
        var _a = d.split(",").map(function (v) { return parseInt(v); }), x = _a[0], y = _a[1];
        var key = createKey(x, y);
        map[key] = 1;
    });
    return map;
};
var parseInstruction = function (instruction) {
    var split = instruction.split("=");
    var axis = split[0].charAt(split[0].length - 1);
    var position = parseInt(split[1]);
    return { axis: axis, position: position };
};
var getVisibleDots = function (map) {
    return Object.keys(map)
        .map(function (v) { return map[v] > 0 && v; })
        .filter(function (v) { return v; });
};
var decodeMessage = function (map) {
    var max = getMaxFromMap(map);
    // Add one to the max to get the right spacing
    var messageGrid = Array.from(Array(max.y + 1), function () {
        return Array(max.x + 1).fill(" ");
    });
    var visible = getVisibleDots(map);
    visible.forEach(function (v) {
        var _a = v.split("-").map(function (s) { return parseInt(s); }), x = _a[0], y = _a[1];
        messageGrid[y][x] = "#";
    });
    console.log(messageGrid.map(function (row) { return row.join(""); }).join("\n"));
};
var partOne = function (data) {
    var map = createMap(data);
    instructions.forEach(function (instruction, index) {
        var _a = parseInstruction(instruction), axis = _a.axis, position = _a.position;
        var keysToDelete = new Set();
        Object.keys(map).forEach(function (key) {
            var oldKey = key;
            var value = map[oldKey];
            var _a = key.split("-").map(function (v) { return parseInt(v); }), oldX = _a[0], oldY = _a[1];
            if (axis === "x") {
                if (oldX >= position) {
                    if (value > 0) {
                        var newX = position * 2 - oldX;
                        var newKey = createKey(newX, oldY);
                        if (map[newKey]) {
                            map[newKey] += 1;
                        }
                        else {
                            map[newKey] = 1;
                        }
                    }
                    keysToDelete.add(oldKey);
                }
            }
            else if (axis === "y") {
                if (oldY >= position) {
                    if (value > 0) {
                        var newY = position * 2 - oldY;
                        var newKey = createKey(oldX, newY);
                        if (map[newKey]) {
                            map[newKey] += 1;
                        }
                        else {
                            map[newKey] = 1;
                        }
                    }
                    keysToDelete.add(oldKey);
                }
            }
            Array.from(keysToDelete).forEach(function (key) {
                delete map[key];
            });
        });
        console.log("Step: ", index + 1, getVisibleDots(map).length);
    });
    return map;
};
var getMaxFromMap = function (map) {
    var xValues = new Set();
    var yValues = new Set();
    Object.keys(map).forEach(function (key) {
        var _a = key.split("-"), x = _a[0], y = _a[1];
        xValues.add(parseInt(x));
        yValues.add(parseInt(y));
    });
    return {
        x: Math.max.apply(Math, Array.from(xValues)),
        y: Math.max.apply(Math, Array.from(yValues))
    };
};
var fillMap = function (map) {
    var max = getMaxFromMap(map);
    for (var i = 0; i <= max.x; i++) {
        for (var j = 0; j <= max.y; j++) {
            var key = createKey(i, j);
            map[key] = map[key] || 0;
        }
    }
};
var map = partOne(dots);
decodeMessage(map);
