var file = require("../loadFile");
var data = file
    .toString()
    .split(",")
    .map(function (v) { return parseInt(v); });
var generateMap = function () {
    var map = {};
    // Make the dataset unique values
    var set = new Set(data);
    Array.from(set).forEach(function (v) {
        map[v.toString()] = 0;
    });
    return map;
};
var getCostForSteps = function (steps) {
    var cost = 0;
    for (var i = 1; i <= steps; i++) {
        cost += i;
    }
    return cost;
};
var partOne = function (cost_per_step) {
    var map = generateMap();
    Object.keys(map).forEach(function (key) {
        var total = 0;
        var position = parseInt(key);
        data.forEach(function (val) {
            // Get cost per step
            var steps = Math.abs(position - val);
            if (cost_per_step == 1) {
                total += steps;
            }
            else {
                var cost = getCostForSteps(steps);
                total += cost;
            }
        });
        map[key] = total;
    });
    var mapValues = Object.values(map);
    //   console.log(map);
    return Math.min.apply(Math, mapValues);
};
var optimalFuel = partOne(1); //37
console.log(optimalFuel);
var optimalFuelPart2 = partOne();
console.log(optimalFuelPart2);
