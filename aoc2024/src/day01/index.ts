import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const firstArr: number[] = [];
  const secondArr: number[] = [];

  const inputLength = input.trim().split("\n").length;

  input.trim().split("\n").forEach(line => {
    const [first, second] = line.trim().split(/\s+/);
    firstArr.push(Number(first));
    secondArr.push(Number(second));
  });

  const sortedFirst = firstArr.sort((a, b) => a-b);
  const sortedSecond = secondArr.sort((a, b) => a-b);
  var totalDistance = 0;

  for(let i = 0; i < inputLength; i++){
    // console.log(sortedFirst[i], " - ", sortedSecond[i], " = ", Math.abs(sortedFirst[i] - sortedSecond[i]));
    totalDistance += Math.abs(sortedFirst[i] - sortedSecond[i]);
  }

  // console.log("firstArr", firstArr);
  // console.log("secondArr", secondArr);
  // console.log(firstArr.sort((a, b) => a-b));
  // console.log(totalDistance);

  return totalDistance;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const firstArr: number[] = [];
  const secondArr: number[] = [];
  let simScore = 0;

  const inputLength = input.trim().split("\n").length;

  input.trim().split("\n").forEach(line => {
    const [first, second] = line.trim().split(/\s+/);
    firstArr.push(Number(first));
    secondArr.push(Number(second));
  });

  const simCounts = new Map<number, number>();
  secondArr.forEach(x => simCounts.set(x, (simCounts.get(x) || 0) +1));
  firstArr.forEach(x => simScore += x * (simCounts.get(x) || 0));

  return simScore;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
