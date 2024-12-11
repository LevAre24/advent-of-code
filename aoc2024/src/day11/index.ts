import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split(" ").map((x) => parseInt(x));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const blinks = 25;
  let blinked: number[] = [...input];

  for (let i = 0; i < blinks; i++) {
    let tempBlinked: number[] = [];

    for (let currBlink = 0; currBlink < blinked.length; currBlink++) {
      const currBlinkString = blinked[currBlink].toString();
      const currBlinkLength = currBlinkString.split("").length;

      if (blinked[currBlink] === 0) {
        tempBlinked.push(1);
      } else if (currBlinkLength % 2 === 0) {
        const left = parseInt(currBlinkString.slice(0, currBlinkLength / 2));
        const right = parseInt(
          currBlinkString.slice(currBlinkLength / 2, currBlinkLength),
        );
        tempBlinked.push(left, right);
      } else {
        tempBlinked.push(blinked[currBlink] * 2024);
      }
    }

    blinked = [...tempBlinked];
  }

  return blinked.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const blinks = 75;
  let stoneCounter = new Map();

  for (const stone of input) {
    stoneCounter.set(stone, (stoneCounter.get(stone) || 0) + 1);
  }

  for (let i = 0; i < blinks; i++) {
    const tempStoneCounter = new Map();

    for (const [stone, count] of stoneCounter.entries()) {
      if (stone === 0) {
        tempStoneCounter.set(1, (tempStoneCounter.get(1) || 0) + count);
      } else if (stone.toString().length % 2 === 0) {
        const currStoneString = stone.toString();
        const currStoneMiddle = currStoneString.split("").length / 2;
        const left = parseInt(currStoneString.slice(0, currStoneMiddle));
        const right = parseInt(
          currStoneString.slice(currStoneMiddle, currStoneString.length),
        );
        tempStoneCounter.set(left, (tempStoneCounter.get(left) || 0) + count);
        tempStoneCounter.set(right, (tempStoneCounter.get(right) || 0) + count);
      } else {
        const newStone = stone * 2024;
        tempStoneCounter.set(
          newStone,
          (tempStoneCounter.get(newStone) || 0) + count,
        );
      }
    }

    stoneCounter.clear();
    stoneCounter = new Map(tempStoneCounter);
  }

  let totalCount = 0;
  for (const count of stoneCounter.values()) {
    totalCount += count;
  }

  return totalCount;
};

run({
  part1: {
    tests: [
      // {
      //   input: `125 17`,
      //   expected: 55312,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `125 17`,
      //   expected: 55312,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

172768465;
179038177;
