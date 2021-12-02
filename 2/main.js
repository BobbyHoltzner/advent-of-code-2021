// Run this from the /2 directory
const file = require("../loadFile");
const lines = file.toString().split("\n");

const determineDirection = (instruction) => {
  const delimiter = " ";
  const [direction, steps] = instruction.split(delimiter);
  return { direction, steps: parseInt(steps) };
};

const part1 = (instructions) => {
  let position = {
    horizontal: 0,
    depth: 0,
  };
  instructions.forEach((instruction) => {
    // Determine the direction and number of steps per instruction
    const { direction, steps } = determineDirection(instruction);
    switch (direction) {
      case "forward":
        position.horizontal += steps;
        break;
      case "up":
        position.depth -= steps;
        break;
      case "down":
        position.depth += steps;
        break;
      default:
      // Do nothing for now
    }
  });

  console.log(position.horizontal * position.depth); // 1635930
};

//
const part2 = (instructions) => {
  let position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };
  instructions.forEach((instruction) => {
    const { direction, steps } = determineDirection(instruction);
    switch (direction) {
      case "forward":
        // Always add the steps to the horizontal position
        position.horizontal += steps;
        // Only update the depth if the aim position is not 0
        if (position.aim != 0) {
          position.depth += position.aim * steps;
        }
        break;
      case "up":
        position.aim -= steps;
        break;
      case "down":
        position.aim += steps;
        break;
      default:
      // Do nothing for now
    }
  });
  console.log(position.horizontal * position.depth); // 1781819478
};

part1(lines);
part2(lines);
