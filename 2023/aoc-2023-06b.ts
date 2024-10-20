const main = () => {
  let input = `
Time:      7  15   30
Distance:  9  40  200
`;

  input = require("fs").readFileSync("./aoc-2023-06.txt", "utf-8");
  console.log(new Array(100).fill("=").join(""));

  const inputLines = input.split("\n");
  const [raceDurations, distanceRecords] = inputLines.filter(line => line.trim()).map((line) => [+line.split(/:\D+/)[1].replace(/\s+/g, "")]);

  // INFO: the following code is copied from 06a

  const raceDurationToDistanceRecords = raceDurations.map((raceDuration, index) => ({ raceDuration, distanceRecord: distanceRecords[index] }));

  const minAndMaxHoldDurations = raceDurationToDistanceRecords.map(({ raceDuration, distanceRecord }) => {
    const halfRaceDuration = Math.ceil(raceDuration / 2);
    let finalMinHoldDuration = Number.MAX_SAFE_INTEGER;
    let finalMaxHoldDuration = Number.MIN_SAFE_INTEGER;

    let minHoldDuration = 1;
    let maxHoldDuration = halfRaceDuration;
    while (minHoldDuration < maxHoldDuration) {
      const midHoldDuration = Math.floor((minHoldDuration + maxHoldDuration) / 2);
      const midHoldDistance = midHoldDuration * (raceDuration - midHoldDuration);

      if (midHoldDistance > distanceRecord) {
        finalMinHoldDuration = Math.min(finalMinHoldDuration, midHoldDuration);
        finalMaxHoldDuration = Math.max(finalMaxHoldDuration, raceDuration - midHoldDuration);
      }

      if (midHoldDistance <= distanceRecord) {
        if (minHoldDuration === midHoldDuration) {
          break;
        }
        minHoldDuration = midHoldDuration;
      } else if (midHoldDistance > distanceRecord) {
        if (maxHoldDuration === midHoldDuration) {
          break;
        }
        maxHoldDuration = midHoldDuration;
      }
    }

    return { minHoldDuration: finalMinHoldDuration, maxHoldDuration: finalMaxHoldDuration };
  });
  console.debug(minAndMaxHoldDurations);

  const numberOfWaysToBeatRecord = minAndMaxHoldDurations.reduce((acc, { minHoldDuration, maxHoldDuration }) => acc * (maxHoldDuration - minHoldDuration + 1), 1);
  console.debug({ numberOfWaysToBeatRecord });
}

main();
