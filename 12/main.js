var file = require("../loadFile");
var dataset = file.toString().split("\n");
var createGraph = function (lines) {
    var graph = {};
    lines.forEach(function (line) {
        var _a = line.split("-"), a = _a[0], b = _a[1];
        if (!graph[a]) {
            graph[a] = [];
        }
        if (!graph[b]) {
            graph[b] = [];
        }
        graph[a].push(b);
        graph[b].push(a);
    });
    return graph;
};
// We need to check if the character is lower case to determine if it's a small cave, we can use regex for this
var isSmallCave = function (c) { return /[a-z]/.test(c); };
var partOne = function (dataset) {
    var graph = createGraph(dataset);
    var paths = function (cave, visited) {
        if (visited === void 0) { visited = new Set(); }
        if (cave === "end")
            return 1;
        if (visited.has(cave) && isSmallCave(cave))
            return 0;
        var result = 0;
        visited.add(cave);
        graph[cave].forEach(function (key) {
            result += paths(key, visited);
        });
        visited["delete"](cave);
        return result;
    };
    return paths("start");
};
console.log("Part 1:", partOne(dataset));
var partTwo = function (dataset) {
    var graph = createGraph(dataset);
    var paths = function (cave, visited, visitedSmallTwice) {
        if (visited === void 0) { visited = {}; }
        if (visitedSmallTwice === void 0) { visitedSmallTwice = false; }
        if (cave === "end")
            return 1;
        if (visited[cave] && isSmallCave(cave)) {
            if (visitedSmallTwice) {
                return 0;
            }
            else {
                visitedSmallTwice = true;
            }
        }
        var result = 0;
        visited[cave] = visited[cave] + 1 || 1;
        graph[cave].forEach(function (key) {
            if (key !== "start") {
                result += paths(key, visited, visitedSmallTwice);
            }
        });
        visited[cave] -= 1;
        return result;
    };
    return paths("start");
};
console.log("Part 2:", partTwo(dataset));
