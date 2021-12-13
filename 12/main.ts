const file = require("../loadFile");

const dataset: string[] = file.toString().split("\n");

const createGraph = (lines: string[]) => {
  const graph = {};
  lines.forEach((line) => {
    const [a, b] = line.split("-");
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
const isSmallCave = (c: string) => /[a-z]/.test(c);

const partOne = (dataset) => {
  const graph = createGraph(dataset);

  const paths = (cave: string, visited: Set<string> = new Set()) => {
    if (cave === "end") return 1;
    if (visited.has(cave) && isSmallCave(cave)) return 0;

    let result = 0;
    visited.add(cave);

    graph[cave].forEach((key) => {
      result += paths(key, visited);
    });

    visited.delete(cave);

    return result;
  };
  return paths("start");
};

console.log("Part 1:", partOne(dataset));

const partTwo = (dataset) => {
  const graph = createGraph(dataset);

  const paths = (
    cave: string,
    visited: Object = {},
    visitedSmallTwice = false
  ) => {
    if (cave === "end") return 1;
    if (visited[cave] && isSmallCave(cave)) {
      if (visitedSmallTwice) {
        return 0;
      } else {
        visitedSmallTwice = true;
      }
    }

    let result = 0;
    visited[cave] = visited[cave] + 1 || 1;

    graph[cave].forEach((key) => {
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
