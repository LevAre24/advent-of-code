import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isSafe = (arr: number[]): boolean => {
  let increase = true;
  let decrease = true;

  if(arr.length < 2)
  {
    return true;
  }

  for(let i = 0; i < arr.length; i++)
  {
    const diff = arr[i] - arr[i-1];
    if(Math.abs(diff) < 1 || Math.abs(diff) > 3)
    {
      return false;
    }

    if (diff > 0) {
      decrease = false;
    }
    if (diff < 0) {
      increase = false;
    }

  }
  return increase || decrease;
}

const isSafeDamper = (arr: number[]): boolean => {
  if (isSafe(arr))
  {
    return true;
  }

  for( let i = 0; i < arr.length; i++ )
  {
    const modArr = arr.slice(0, i).concat(arr.slice(i+1));

    if(isSafe(modArr))
    {
      return true;
    }
  }

  return false;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let safeCount = 0;

  input.trim().split("\n").forEach(line => {
    const arr = line.trim().split(/\s+/).map(Number);

    safeCount += isSafe(arr) ? 1 : 0;
  });

  return safeCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let safeCount = 0;

  input.trim().split("\n").forEach(line => {
    const arr = line.trim().split(/\s+/).map(Number);

    safeCount += isSafeDamper(arr) ? 1 : 0;
  });

  return safeCount;
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
      {
        input: `7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
