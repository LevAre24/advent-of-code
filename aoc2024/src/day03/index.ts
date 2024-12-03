import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const multiply = (mult: string): number => {
  // console.log(mult);
  const multiples = mult.match(/\d+/g)?.map(Number);
  // console.log(multiples);
  let result = 0;

  if(multiples)
  {
    result = multiples[0] * multiples[1];
  }
  // console.log(result);

  return result;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matches = input.match(/mul\(\d+,\d+\)/g);
  let result = 0;

  matches?.forEach(match => result += multiply(match));

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const regex = /mul\(\d+,\d+\)/g;
  let isBlocked = false;
  let isFirstFound = false;
  let result = 0;
  let match;

  const segments = input.split(/(?=don't\(\)|do\(\))/);
  for(let segment of segments)
  {
    if(segment.includes("don't()"))
    {
      isBlocked = true;
      continue;
    }

    if(segment.includes("do()"))
    {
      isBlocked = false;
      // console.log(segment);
    }

    // console.log(segments);
    while((match = regex.exec(segment)) !== null)
    {
      // console.log("match", match);
      if(!isFirstFound)
      {
        result += multiply(match[0]);
        isFirstFound = true;
      } else if (!isBlocked)
      {
        result += multiply(match[0]);
      }
    }
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
