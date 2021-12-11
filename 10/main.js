var file = require("../loadFile");
var dataset = file.toString().split("\n");
var closing = [")", "}", ">", "]"];
var opening = ["(", "{", "<", "["];
var isOpening = function (char) {
    if (opening.indexOf(char) !== -1) {
        return true;
    }
    return false;
};
var isClosing = function (char) {
    if (closing.indexOf(char) !== -1) {
        return true;
    }
    return false;
};
var getScoreForCharacter = function (char) {
    switch (char) {
        case ")":
            return 3;
        case "]":
            return 57;
        case "}":
            return 1197;
        case ">":
            return 25137;
    }
};
var getOpeningForClosing = function (char) {
    switch (char) {
        case ")":
            return "(";
        case "}":
            return "{";
        case ">":
            return "<";
        case "]":
            return "[";
    }
};
var getClosingForOpening = function (char) {
    switch (char) {
        case "(":
            return ")";
        case "{":
            return "}";
        case "<":
            return ">";
        case "[":
            return "]";
    }
};
var getAutoCompletePointPerCharacter = function (char) {
    switch (char) {
        case ")":
            return 1;
        case "]":
            return 2;
        case "}":
            return 3;
        case ">":
            return 4;
    }
};
var getMedian = function (array) {
    array.sort(function (a, b) {
        return a - b;
    });
    var mid = array.length / 2;
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
};
var getCompletionScore = function (values) {
    var score = 0;
    values.forEach(function (v) {
        var s = getAutoCompletePointPerCharacter(v);
        score = score * 5 + s;
    });
    return score;
};
var getAllCompletionScores = function (incomplete) {
    var scores = [];
    incomplete.forEach(function (i) {
        scores.push(getCompletionScore(i));
    });
    return scores;
};
var findCorrupted = function () {
    var corrupted = [];
    var incomplete = [];
    dataset.forEach(function (line, index) {
        var queue = [];
        line.split("").every(function (v, index) {
            if (isOpening(v)) {
                queue.unshift(getClosingForOpening(v));
                if (index === line.length - 1 && queue) {
                    incomplete.push(queue);
                }
                return true;
            }
            else if (isClosing(v)) {
                if (queue[0] !== v) {
                    corrupted.push(v);
                    return false;
                }
                else {
                    queue.shift();
                    if (index === line.length - 1 && queue.length) {
                        incomplete.push(queue);
                        // console.log(queue);
                    }
                    return true;
                }
            }
        });
    });
    var sum = 0;
    corrupted.forEach(function (c) {
        sum += getScoreForCharacter(c);
    });
    var completionScores = getAllCompletionScores(incomplete);
    var median = getMedian(completionScores);
    console.log(median);
};
findCorrupted();
