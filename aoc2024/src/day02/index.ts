import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const validateArray = (arr: number[]): number => {
  let increase = true;
  let decrease = true;
  let unsafeCount = 0;

  if(arr.length < 2)
  {
    return unsafeCount;
  }

  for(let i = 0; i < arr.length; i++)
  {
    const diff = arr[i] - arr[i-1];

    if (diff > 0) {
      decrease = false;
    }
    if (diff < 0) {
      increase = false;
    }

    if(Math.abs(diff) < 1 || Math.abs(diff) > 3)
    {
      unsafeCount += 1;
    }
  }

  if (!increase && !decrease)
  {
    unsafeCount += 1;
  }

  if(unsafeCount > 1)
  {
    console.log("arr", arr);
  }

  // console.log("unsafeCount", unsafeCount);

  return unsafeCount;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let safeCount = 0;

  input.trim().split("\n").forEach(line => {
    const arr = line.trim().split(/\s+/).map(Number);

    const unsafeCount = validateArray(arr)

    safeCount += unsafeCount === 0 ? 1 : 0;
  });

  return safeCount; //472
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let safeCount = 0;

  input.trim().split("\n").forEach(line => {
    const arr = line.trim().split(/\s+/).map(Number);

    const unsafeCount = validateArray(arr)

    safeCount += unsafeCount <= 1 ? 1 : 0;
  });

  return safeCount; // 542 is too high
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
