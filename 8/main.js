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
var file = require("../loadFile");
var dataset = file.toString().split("\n");
var display = {
    topLeft: "",
    top: "",
    topRight: "",
    middle: "",
    bottomRight: "",
    bottom: "",
    bottomLeft: ""
};
var getDifference = function (a, b) {
    return a.filter(function (x) { return !b.includes(x); });
};
function symmetricDifference(a1, a2) {
    var result = [];
    for (var i = 0; i < a1.length; i++) {
        if (a2.indexOf(a1[i]) === -1) {
            result.push(a1[i]);
        }
    }
    for (i = 0; i < a2.length; i++) {
        if (a1.indexOf(a2[i]) === -1) {
            result.push(a2[i]);
        }
    }
    return result;
}
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
var createDisplay = function (v) {
    return {
        0: [v.top, v.topRight, v.bottomRight, v.bottom, v.bottomLeft, v.topLeft],
        1: [v.topRight, v.bottomRight],
        2: [v.top, v.topRight, v.middle, v.bottomLeft, v.bottom],
        3: [v.top, v.topRight, v.middle, v.bottomRight, v.bottom],
        4: [v.topLeft, v.middle, v.topRight, v.bottomRight],
        5: [v.top, v.topLeft, v.middle, v.bottomRight, v.bottom],
        6: [v.top, v.topLeft, v.bottomLeft, v.middle, v.bottom, v.bottomRight],
        7: [v.top, v.topRight, v.bottomRight],
        8: [
            v.top,
            v.topRight,
            v.bottomRight,
            v.middle,
            v.bottom,
            v.bottomLeft,
            v.topLeft,
        ],
        9: [v.top, v.topRight, v.bottomRight, v.middle, v.bottom, v.topLeft]
    };
};
var getSegmentCounts = function (display) {
    var map = {};
    Object.keys(display).forEach(function (key) {
        map[key] = display[key].length;
    });
    return map;
};
var getTopRight = function (digit1, digit6) {
    var split1 = digit1.split("");
    return split1.find(function (v) {
        return !digit6.includes(v);
    });
};
var getDisplay = function (lineValues) {
    var available = "abcdefg";
    var d = __assign({}, display);
    var two = lineValues.find(function (v) { return v.length === 2; }).split("");
    var three = lineValues.find(function (v) { return v.length === 3; }).split("");
    var four = lineValues.find(function (v) { return v.length === 4; });
    var five = lineValues.filter(function (v) { return v.length === 5; });
    var six = lineValues.filter(function (v) { return v.length === 6; });
    var seven = lineValues.find(function (v) { return v.length === 7; });
    var digit8 = seven;
    // We can find 6 because it's the only one of the 6 segment digits that uses both of the segments from digit 1
    var digit1 = lineValues.find(function (v) { return v.length === 2; });
    var digit6 = six.find(function (v) {
        return (v.includes(two[0]) || v.includes(two[1])) &&
            (!v.includes(two[0]) || !v.includes(two[1]));
    });
    // We can find 3 because it's the only one of the 5 segment digits that uses both of the segments from digit 1
    var digit3 = five.find(function (v) { return v.includes(two[0]) && v.includes(two[1]); });
    // Now that we have the segments for 6, we can figure out which one of digit one is not included and can assume it's the top right
    d.topRight = getTopRight(digit1, digit6);
    available = available.replace(d.topRight, "");
    d.bottomRight = digit1.replace(d.topRight, "");
    available = available.replace(d.bottomRight, "");
    // We know that two and five both include one of the segments from one but not both
    var twoAndFive = five.filter(function (v) {
        return (v.includes(two[0]) || v.includes(two[1])) &&
            (!v.includes(two[0]) || !v.includes(two[1]));
    });
    // Since we figured out which segment was top right, we can determine which 5 segment is digit 2 and which is digit 5
    var digit5 = twoAndFive.find(function (v) { return !v.includes(d.topRight); });
    // Since we now have digit 5, we can get the difference between 5 and 6 and assume it's bottom left
    d.bottomLeft = symmetricDifference(digit5, digit6)[0];
    available = available.replace(d.bottomLeft, "");
    // Top is the difference between the two segment (digit 1) and three segment (digit 7)
    d.top = symmetricDifference(two, three).toString();
    available = available.replace(d.top, "");
    // We can get 0 because we know that it has both topRight and bottomLeft
    var digit0 = six.find(function (v) { return v.includes(d.topRight) && v.includes(d.bottomLeft); });
    d.middle = symmetricDifference(digit0, digit8)[0];
    available = available.replace(d.middle, "");
    d.topLeft = four
        .replace(d.middle, "")
        .replace(d.topRight, "")
        .replace(d.bottomRight, "");
    available = available.replace(d.topLeft, "");
    d.bottom = available;
    return createDisplay(d);
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
    return possibleValuesBasedOnLength.find(function (p) {
        return stringSplit.every(function (v) { return p.value.includes(v); });
    });
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
    var segmentCounts = getSegmentCounts(displayPart1);
    var uniques = getUniques(segmentCounts);
    var instructions = [];
    var displayInstructions = dataset
        .map(function (d) { return d.split("|")[0].trim(); })
        .map(function (v) { return v.split(" "); });
    // console.log(displayInstructions);
    dataset
        .map(function (d) { return d.split("|")[1].trim(); })
        .map(function (v) { return v.split(" "); })
        .forEach(function (v) { return instructions.push(v); });
    var values = {};
    instructions.forEach(function (instruction, index) {
        var display = getDisplay(displayInstructions[index]);
        instruction.forEach(function (single) {
            if (!values[index]) {
                values[index] = [];
            }
            if (uniques.indexOf(single.length) !== -1) {
                values[index].push(getKeyByValue(segmentCounts, single.length));
            }
            else {
                // Pass the new display in, do we need to get segment counts for each?
                var value = getValueForString(display, single);
                if (value) {
                    values[index].push(value.key);
                }
            }
        });
    });
    var total = 0;
    Object.keys(values).forEach(function (v) {
        var value = values[v].toString().replace(/,/g, "");
        total += parseInt(value);
    });
    return total;
};
var count = partOne();
console.log(count); //255
var total = partTwo();
console.log(total); // 982158
