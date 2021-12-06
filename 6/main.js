var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var file = require("../loadFile");
var dataset = file
    .toString()
    .split(",")
    .map(function (v) { return parseInt(v); });
var part1 = function (days) {
    var fish = __spreadArrays(dataset);
    for (var i = 0; i < days; i++) {
        fish.forEach(function (f, index, a) {
            if (f === 0) {
                a[index] = 6;
                fish.push(8);
            }
            else {
                a[index] = a[index] - 1;
            }
        });
        var memory = process.memoryUsage();
        console.log(i, (memory.heapUsed / 1024 / 1024 / 1024).toFixed(4), "GB");
    }
    return fish.length;
};
// const fishCount = part1(80); // 5934
// console.log(fishCount);
var fishCountPart2 = part1(256);
console.log(fishCountPart2);
