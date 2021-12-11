const file = require("../loadFile");

const dataset: string[] = file.toString().split("\n");

const closing = [")", "}", ">", "]"];
const opening = ["(", "{", "<", "["];

const isOpening = (char: string) => {
  if (opening.indexOf(char) !== -1) {
    return true;
  }
  return false;
};

const isClosing = (char: string) => {
  if (closing.indexOf(char) !== -1) {
    return true;
  }
  return false;
};

const getScoreForCharacter = (char: string) => {
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

const getOpeningForClosing = (char: string) => {
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

const getClosingForOpening = (char: string) => {
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

const getAutoCompletePointPerCharacter = (char: string) => {
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

const getMedian = (array: number[]) => {
  array.sort(function (a, b) {
    return a - b;
  });
  var mid = array.length / 2;
  return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
};

const getCompletionScore = (values: string[]) => {
  let score = 0;
  values.forEach((v) => {
    const s = getAutoCompletePointPerCharacter(v);
    score = score * 5 + s;
  });
  return score;
};

const getAllCompletionScores = (incomplete) => {
  let scores = [];
  incomplete.forEach((i) => {
    scores.push(getCompletionScore(i));
  });
  return scores;
};

const findCorrupted = () => {
  const corrupted = [];
  const incomplete = [];
  dataset.forEach((line, index) => {
    const queue = [];
    line.split("").every((v, index) => {
      if (isOpening(v)) {
        queue.unshift(getClosingForOpening(v));
        if (index === line.length - 1 && queue) {
          incomplete.push(queue);
        }
        return true;
      } else if (isClosing(v)) {
        if (queue[0] !== v) {
          corrupted.push(v);
          return false;
        } else {
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
  let sum = 0;
  corrupted.forEach((c) => {
    sum += getScoreForCharacter(c);
  });
  const completionScores = getAllCompletionScores(incomplete);
  const median = getMedian(completionScores);
  console.log(median);
};

findCorrupted();
