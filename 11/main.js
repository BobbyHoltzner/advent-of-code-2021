var file = require("../loadFile");
var dataset = file
    .toString()
    .split("\n")
    .filter(function (v) { return v; })
    .map(function (line) { return line.split("").map(function (v) { return parseInt(v); }); });
var totalSteps = 100;
var synchronizedFlash = null;
var flashes = 0;
var currentStep = 0;
var createKey = function (i, j) {
    return "".concat(i, "-").concat(j);
};
var increaseEnergy = function (_a) {
    var i = _a.i, j = _a.j, set = _a.set;
    if (typeof dataset[i] !== "undefined" &&
        typeof dataset[i][j] !== "undefined") {
        var key = createKey(i, j);
        if (set.has(key))
            return;
        dataset[i][j]++;
        // If greater than 9 then it's flashing
        if (dataset[i][j] > 9) {
            dataset[i][j] = 0;
            set.add(key);
            flashes++;
            for (var x = -1; x <= 1; x++) {
                for (var y = -1; y <= 1; y++) {
                    if (x === 0 && y === 0)
                        continue;
                    increaseEnergy({ i: i + x, j: j + y, set: set });
                }
            }
            return;
        }
    }
};
var step = function () {
    currentStep += 1;
    var s = new Set();
    for (var i = 0; i < dataset.length; i++) {
        var line = dataset[i];
        for (var j = 0; j < line.length; j++) {
            increaseEnergy({ i: i, j: j, set: s });
        }
    }
    if (!synchronizedFlash && s.size === dataset.length * dataset[0].length) {
        synchronizedFlash = currentStep;
    }
};
for (var i = 0; i < totalSteps; i++) {
    step();
}
console.log(flashes);
if (!synchronizedFlash) {
    while (!synchronizedFlash) {
        step();
    }
}
console.log(synchronizedFlash);
