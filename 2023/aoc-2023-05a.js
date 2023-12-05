let INPUT = `seeds: 79 14 55 13

 seed-to-soil map:
 50 98 2
 52 50 48

 soil-to-fertilizer map:
 0 15 37
 37 52 2
 39 0 15

 fertilizer-to-water map:
 49 53 8
 0 11 42
 42 0 7
 57 7 4

 water-to-light map:
 88 18 7
 18 25 70

 light-to-temperature map:
 45 77 23
 81 45 19
 68 64 13

 temperature-to-humidity map:
 0 69 1
 1 0 69

 humidity-to-location map:
 60 56 37
 56 93 4`;

INPUT = require("fs").readFileSync("./aoc-2023-05.txt", "utf-8");

console.log(new Array(100).fill("=").join(""));

const parseStringToNumber = (s) => {
  const ranges = s.split(/\n+/).slice(1);
  const array = ranges.map((range) =>
    range.split(/\s+/).map((number) => Number(number))
  );
  return array;
};

const getDestinationValue = (sourceMap, key) => {
  let foundKey = key;
  sourceMap.forEach((range) => {
    const [destinationStart, sourceStart, rangeLength] = range;
    // console.log({ destinationStart, sourceStart, rangeLength, key });

    if (key >= sourceStart && key <= sourceStart + rangeLength) {
      const diff = key - sourceStart;
      foundKey = destinationStart + diff;
      //   console.log({ foundKey });
      return;
    }
  });

  return foundKey;
};

let [
  seeds,
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
] = INPUT.split("\n\n");

seeds = seeds
  .split(": ")[1]
  .split(/\s+/)
  .map((number) => Number(number));

seedToSoil = parseStringToNumber(seedToSoil);
soilToFertilizer = parseStringToNumber(soilToFertilizer);
fertilizerToWater = parseStringToNumber(fertilizerToWater);
waterToLight = parseStringToNumber(waterToLight);
lightToTemperature = parseStringToNumber(lightToTemperature);
temperatureToHumidity = parseStringToNumber(temperatureToHumidity);
humidityToLocation = parseStringToNumber(humidityToLocation);

console.log({
  seeds,
  //seedToSoil,
  //soilToFertilizer,
  //fertilizerToWater,
  //waterToLight,
  //lightToTemperature,
  //temperatureToHumidity,
  //humidityToLocation,
});

const minLocation = seeds.reduce((prevLocation, seed) => {
  const soil = getDestinationValue(seedToSoil, seed);
  const fertilizer = getDestinationValue(soilToFertilizer, soil);
  const water = getDestinationValue(fertilizerToWater, fertilizer);
  const light = getDestinationValue(waterToLight, water);
  const temperature = getDestinationValue(lightToTemperature, light);
  const humidity = getDestinationValue(temperatureToHumidity, temperature);
  const location = getDestinationValue(humidityToLocation, humidity);
  //console.log("looking for", { seed });
  //console.log("looking for", { soil });
  //console.log("looking for", { fertilizer });
  //console.log("looking for", { water });
  //console.log("looking for", { light });
  //console.log("looking for", { temperature });
  //console.log("looking for", { humidity });

  return Math.min(prevLocation, location);
}, Number.MAX_SAFE_INTEGER);

console.log({ minLocation });
