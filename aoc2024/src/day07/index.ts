import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const testMap = new Map(
    rawInput.split("\n").map((line) => {
      const [key, values] = line.split(":");
      return [Number(key.trim()), values.trim().split(" ").map(Number)];
    }),
  );

  return testMap;
};

const evaluateExp = (
  test: number,
  values: number[],
  operators: string,
): boolean => {
  let result = values[0];
  // console.log("result:", result);

  // console.log("operators", operators);

  for (let i = 0; i < operators.length; i++) {
    // console.log(`operator[${i}]`, operators[i]);
    if (operators[i] === "+") {
      // console.log(result + "+= " + values[i + 1]);
      result += values[i + 1];
    } else if (operators[i] === "*") {
      // console.log(result + "*= " + values[i + 1]);
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

  // console.log("numOperators: ", numOperators, " combos: ", combos);

  return combos;
};

const part1 = (rawInput: string) => {
  const testMap = parseInput(rawInput);
  const testSet = new Set<string>();
  let validTestSum = 0;

  testMap.forEach((values, test) => {
    const numOperators = values.length - 1;
    const operatorCombos = generateCombos(numOperators);

    // console.log("test ", test, ": numOperators: ", numOperators);
    // console.log("values: ", values);
    // console.log("operatorCombos", operatorCombos);

    operatorCombos.forEach((operatorCombo) => {
      // console.log("operatorCombo", operatorCombo);
      const isValid = evaluateExp(test, values, operatorCombo);
      // console.log("result: ", result, " test: ", test);

      if (isValid) {
        testSet.add(`${test}: ${[...values]}`);
        // console.log(testSet);
        // console.log(operatorCombo);
      }
    });
  });

  testSet.forEach((test) => {
    validTestSum += Number(test.split(":")[0]);
  });

  return validTestSum; // too small 1399219270675
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
      {
        input: `28681667: 5 7 1 49 452 37 7`,
        expected: 28681667,
      },
      {
        input: `24883200120: 120 120 120 120 120 120`,
        expected: 24883200120,
      },
      {
        input: `28173653: 1 557 86 7 587 588`,
        expected: 28173653,
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
