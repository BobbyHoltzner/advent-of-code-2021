const fs = require("fs");

let filename = process.argv[2];

if (!filename || filename === "") {
  filename = "dataset.txt";
}

const file = fs.readFileSync(filename);

module.exports = file;
