var file = require("../loadFile");
var data = file
    .toString()
    .split(",")
    .map(function (v) { return parseInt(v); });
var generateMap = function () {
    var map = {};
    // We know we can use any number from 0 to the max
    var max = Math.max.apply(Math, data);
    for (var i = 0; i <= max; i++) {
        map[i.toString()] = 0;
    }
    return map;
};
// Get the cost per each step 1 = 1, 2 = 2, etc.
var getCostForSteps = function (steps) {
    var cost = 0;
    for (var i = 1; i <= steps; i++) {
        cost += i;
    }
    return cost;
};
var getOptimalFuel = function (cost_per_step) {
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
    return Math.min.apply(Math, mapValues);
};
var part1 = getOptimalFuel(1); //352254
console.log(part1);
var part2 = getOptimalFuel(); //99053143
console.log(part2);
