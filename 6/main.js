var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var file = require("../loadFile");
var dataset = file
    .toString()
    .split(",")
    .map(function (v) { return parseInt(v); });
/**
 *  Creates a map/object which we will hold the counts
 * @returns Object
 */
var generateMap = function () {
    return {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    };
};
var getCount = function (days) {
    // Clone the dataset so we don't manipulate the original
    var fish = __spreadArray([], dataset, true);
    // Generate a clean map with all 0 counts
    var map = generateMap();
    // Load the initial counts in based on the first day/frame
    fish.forEach(function (f) {
        map[f] = map[f] + 1;
    });
    var _loop_1 = function (i) {
        var mapCopy = __assign({}, map);
        Object.keys(map).forEach(function (key) {
            // Since the fish reproduces at 0 and the child starts at 8, we can copy the value at day 0 and make it the value at day 8
            var nextKey = key === "8" ? "0" : (parseInt(key) + 1).toString();
            if (nextKey === "0") {
                mapCopy[key] = map[nextKey];
                /// After the parent reproduces, it resets to 6. We need to be aware that others may be at 6 so we append the value to the existing
                mapCopy["6"] = mapCopy[6] + map[nextKey];
            }
            else {
                // Else we can grab the value from the higher index
                mapCopy[key] = map[nextKey];
            }
        });
        // Copy the map to the original so we aren't manipulating on each key
        map = mapCopy;
    };
    // Loop through the days and update the counts
    for (var i = 0; i < days; i++) {
        _loop_1(i);
    }
    // Sum all of the values
    return Object.values(map).reduce(function (a, b) { return a + b; });
};
var fishCountPart1 = getCount(80); // 362346
console.log(fishCountPart1);
var fishCountPart2 = getCount(256); // 1639643057051
console.log(fishCountPart2);
