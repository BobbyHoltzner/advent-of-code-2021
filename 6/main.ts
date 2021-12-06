const file = require("../loadFile");

const dataset: number[] = file
  .toString()
  .split(",")
  .map((v) => parseInt(v));

/**
 *  Creates a map/object which we will hold the counts
 * @returns Object
 */
const generateMap = () => {
  return {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };
};

const getCount = (days) => {
  // Clone the dataset so we don't manipulate the original
  let fish = [...dataset];
  // Generate a clean map with all 0 counts
  let map = generateMap();
  // Load the initial counts in based on the first day/frame
  fish.forEach((f) => {
    map[f] = map[f] + 1;
  });
  // Loop through the days and update the counts
  for (let i = 0; i < days; i++) {
    const mapCopy = { ...map };
    Object.keys(map).forEach((key) => {
      // Since the fish reproduces at 0 and the child starts at 8, we can copy the value at day 0 and make it the value at day 8
      const nextKey = key === "8" ? "0" : (parseInt(key) + 1).toString();
      if (nextKey === "0") {
        mapCopy[key] = map[nextKey];
        /// After the parent reproduces, it resets to 6. We need to be aware that others may be at 6 so we append the value to the existing
        mapCopy["6"] = mapCopy[6] + map[nextKey];
      } else {
        // Else we can grab the value from the higher index
        mapCopy[key] = map[nextKey];
      }
    });
    // Copy the map to the original so we aren't manipulating on each key
    map = mapCopy;
  }
  // Sum all of the values
  return Object.values(map).reduce((a, b) => a + b);
};

const fishCountPart1 = getCount(80); // 362346
console.log(fishCountPart1);

const fishCountPart2 = getCount(256); // 1639643057051
console.log(fishCountPart2);
