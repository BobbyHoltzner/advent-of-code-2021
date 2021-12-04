const file = require("../loadFile");
import Card from "./card";

// Split the dataset into the numbers and the cards
const dataset: string[] = file.toString().split("\n\n");

// The bingo numbers are comma separated so convert them to an array
const bingoNumbers: string[] = dataset[0].split(",");

const createCards = () => {
  return dataset
    .map((d: string, i: number) => {
      if (i !== 0) {
        return new Card(d, i);
      }
    })
    .filter((d) => d);
};

// Create the bingo cards used in the game.
const cards: Card[] = createCards();

const part1 = () => {
  let score = 0;
  // Loop through the bingo numbers
  bingoNumbers.some((value: string) => {
    // Loop through the bingo cards
    return cards.some((card: Card) => {
      if (card) {
        // Marks the value if needed, checks if there is a row/column that is full
        const winner: Card = card.checkValue(value);
        if (winner) {
          score = winner.getSumOfUnMarkedSpots() * parseInt(value);
          return true;
        }
      }
    });
  });
  return score;
};

const part2 = () => {
  let score = 0;
  let completedBoards = [];
  bingoNumbers.some((value: string) => {
    return cards.some((card: Card) => {
      if (card) {
        const winner: Card = card.checkValue(value);
        if (winner) {
          if (completedBoards.indexOf(winner._id) === -1) {
            completedBoards.push(winner._id);
          }
          if (completedBoards.length === cards.length) {
            score = winner.getSumOfUnMarkedSpots() * parseInt(value);
            return true;
          }
        }
      }
    });
  });
  return score;
};

const part1Score = part1();
console.log(part1Score);

const part2Score = part2();
console.log(part2Score);
