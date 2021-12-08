var file = require("../loadFile");
var dataset = file.toString().split("\n");
var getCharactersPerSegment = function (segment) {
    switch (segment) {
        case "a":
        case "d":
        case "g":
            return 4;
        default:
            return 2;
    }
};
// Find the uniques and place them, we need to use the data before the pipe to determine the wires and reorganize the display per each
// Loop through each line and create the display
// Use that display
var displayPart1 = {
    0: ["a", "b", "c", "e", "f", "g"],
    1: ["c", "f"],
    2: ["a", "c", "d", "e", "g"],
    3: ["a", "c", "d", "f", "g"],
    4: ["b", "c", "d", "f"],
    5: ["a", "b", "d", "f", "g"],
    6: ["a", "b", "d", "e", "f", "g"],
    7: ["a", "c", "f"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["a", "b", "c", "d", "f", "g"]
};
var displayPart2 = {
    0: ["e", "d", "a", "b", "c", "g"],
    1: ["a", "b"],
    2: ["d", "a", "f", "g", "c"],
    3: ["d", "a", "f", "b", "c"],
    4: ["e", "f", "a", "b"],
    5: ["d", "e", "f", "b", "c"],
    6: ["d", "e", "f", "g", "b", "c"],
    7: ["d", "a", "b"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["d", "e", "a", "f", "b", "c"]
};
var getSegmentCounts = function (display) {
    var map = {};
    Object.keys(display).forEach(function (key) {
        map[key] = display[key].length;
    });
    return map;
};
var getDisplay = function (line) {
    console.log(line);
};
var getKeyByValue = function (object, value) {
    return Object.keys(object).find(function (key) { return object[key] === value; });
};
var getUniques = function (segmentCounts) {
    var map = {};
    Object.keys(segmentCounts).forEach(function (key) {
        if (map[segmentCounts[key]]) {
            map[segmentCounts[key]] += 1;
        }
        else {
            map[segmentCounts[key]] = 1;
        }
    });
    return Object.keys(map)
        .map(function (key) {
        if (map[key] === 1) {
            return Object.values(segmentCounts).find(function (v) { return parseInt(key) === v; });
        }
    })
        .filter(function (v) { return v; });
};
var getValueForString = function (display, str) {
    var length = str.length;
    var possibleValuesBasedOnLength = Object.keys(display)
        .filter(function (key) { return display[key].length === length; })
        .map(function (key) { return ({ key: key, value: display[key] }); });
    var stringSplit = str.split("");
    // console.log(str);
    var found = possibleValuesBasedOnLength.find(function (p) {
        return stringSplit.every(function (v) { return p.value.includes(v); });
    });
    // console.log("Found: ", found);
    return found;
};
var partOne = function () {
    var segmentCounts = getSegmentCounts(displayPart1);
    var uniques = getUniques(segmentCounts);
    var instructions = [];
    dataset
        .map(function (d) { return d.split("|")[1].trim(); })
        .map(function (v) { return v.split(" "); })
        .forEach(function (v) { return v.forEach(function (instruction) { return instructions.push(instruction); }); });
    var count = 0;
    instructions.forEach(function (i) {
        if (uniques.indexOf(i.length) !== -1) {
            count++;
        }
    });
    return count;
};
var partTwo = function () {
    var segmentCounts = getSegmentCounts(displayPart2);
    var uniques = getUniques(segmentCounts);
    var instructions = [];
    var displayInstructions = dataset
        .map(function (d) { return d.split("|")[0].trim(); })
        .map(function (v) { return v.split(" "); });
    console.log(displayInstructions);
    dataset
        .map(function (d) { return d.split("|")[1].trim(); })
        .map(function (v) { return v.split(" "); })
        .forEach(function (v) { return instructions.push(v); });
    var values = {};
    instructions.forEach(function (instruction, index) {
        // Create a display here...
        // const display = getDisplay(instruction);
        instruction.forEach(function (single) {
            if (!values[index]) {
                values[index] = [];
            }
            if (uniques.indexOf(single.length) !== -1) {
                values[index].push(getKeyByValue(segmentCounts, single.length));
            }
            else {
                // Pass the new display in, do we need to get segment counts for each?
                var value = getValueForString(displayPart2, single);
                if (value) {
                    values[index].push(value.key);
                }
            }
        });
    });
    var total = 0;
    // console.log(values["3"]);
    Object.keys(values).forEach(function (v) {
        var value = values[v].toString().replace(/,/g, "");
        total += parseInt(value);
    });
    return total;
};
var count = partOne();
console.log(count);
var total = partTwo();
// console.log(total);
var checker = function (arr, target) { return target.every(function (v) { return arr.includes(v); }); };
var test = ["d", "e", "a", "f", "b", "c"];
var val = ["e", "f", "a", "b", "c", "d"];
// console.log(checker(test, val));
