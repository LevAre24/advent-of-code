import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const evaluateExp = (
  test: number,
  values: number[],
  operators: string,
): boolean => {
  let result = values[0];

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += values[i + 1];
    } else if (operators[i] === "*") {
      result *= values[i + 1];
    }

    if (result > test) {
      return false;
    }
  }

  return result === test ? true : false;
};

const generateCombos = (numOperators: number) => {
  const combos = new Set<string>();
  const numCombos = 1 << numOperators;

  for (let mask = 0; mask < numCombos; mask++) {
    let operators = "";
    for (let i = 0; i < numOperators; i++) {
      operators += (mask & (1 << i)) === 0 ? "+" : "*";
    }
    combos.add(operators);
  }

  return combos;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const tests = input.split("\n").map((line) => {
    const [key, values] = line.split(":");
    return {
      key: Number(key.trim()),
      values: values.trim().split(" ").map(Number),
    };
  });
  const testSet: string[] = [];
  let validTestSum = 0;

  tests.forEach((values) => {
    const numOperators = values.values.length - 1;
    const operatorCombos = generateCombos(numOperators);
    const operatorArray = Array.from(operatorCombos);

    for (let i = 0; i < operatorArray.length; i++) {
      const isValid = evaluateExp(values.key, values.values, operatorArray[i]);

      if (isValid) {
        testSet.push(`${values.key}: ${[...values.values]}`);
        break;
      }
    }
  });

  testSet.forEach((test) => {
    validTestSum += Number(test.split(":")[0]);
  });

  return validTestSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
      3267: 81 40 27
      83: 17 5
      156: 15 6
      7290: 6 8 6 15
      161011: 16 10 13
      192: 17 8 14
      21037: 9 7 18 13
      292: 11 6 16 20`,
        expected: 3749,
      },
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
