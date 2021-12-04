"use strict";
exports.__esModule = true;
var file = require("../loadFile");
var card_1 = require("./card");
// Split the dataset into the numbers and the cards
var dataset = file.toString().split("\n\n");
// The bingo numbers are comma separated so convert them to an array
var bingoNumbers = dataset[0].split(",");
var createCards = function () {
    return dataset
        .map(function (d, i) {
        if (i !== 0) {
            return new card_1["default"](d, i);
        }
    })
        .filter(function (d) { return d; });
};
// Create the bingo cards used in the game.
var cards = createCards();
var part1 = function () {
    var score = 0;
    // Loop through the bingo numbers
    bingoNumbers.some(function (value) {
        // Loop through the bingo cards
        return cards.some(function (card) {
            if (card) {
                // Marks the value if needed, checks if there is a row/column that is full
                var winner = card.checkValue(value);
                if (winner) {
                    score = winner.getSumOfUnMarkedSpots() * parseInt(value);
                    return true;
                }
            }
        });
    });
    return score;
};
var part2 = function () {
    var score = 0;
    var completedBoards = [];
    bingoNumbers.some(function (value) {
        return cards.some(function (card) {
            if (card) {
                var winner = card.checkValue(value);
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
var part1Score = part1();
console.log(part1Score);
var part2Score = part2();
console.log(part2Score);
