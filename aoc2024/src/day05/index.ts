import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isValidUpdate = (rules: number[], rulesMap: Map<number, number[]>) => {
  for (const rule of rules) {
    // console.log("rules", rules);
    // console.log("rule", rule);
    const index = rules.indexOf(rule);
    const rulesToCheck = rules.slice(index + 1);
    const pageValues = rulesMap.get(rule);
    if (rulesToCheck.length) {
      // console.log("rulesToCheck", rulesToCheck);

      if (!rulesToCheck.every((rule) => pageValues?.includes(rule))) {
        return false;
      }
    }
  }
  return true;
};

const reorderPages = (
  invalidRules: number[],
  rulesMap: Map<number, number[]>,
) => {
  const valid = [...invalidRules];
  // console.log("invalidRules", invalidRules);

  let swapped = true;
  while (swapped) {
    swapped = false;

    for (let i = 0; i < valid.length; i++) {
      const current = valid[i];
      // const rulesToCheck = invalidRules.slice(i + 1);
      const pageValues = rulesMap.get(current);

      for (let j = i + 1; j < valid.length; j++) {
        const next = valid[j];

        if (pageValues?.includes(next)) {
          continue;
        }

        [valid[i], valid[j]] = [valid[j], valid[i]];
        swapped = true;
        break;
      }
    }
  }

  return valid;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rulesMap = new Map();
  const ruleLines = input.split("\n\n")[0].split("\n");
  const updates = input
    .split("\n\n")[1]
    .split("\n")
    .map((line) => line.split(",").map(Number));
  const validUpdates = [];

  for (const line of ruleLines) {
    const [before, after] = line.split("|").map(Number);

    if (!rulesMap.has(before)) {
      rulesMap.set(before, []);
    }

    rulesMap.get(before).push(after);
  }

  // console.log("rulesMap", rulesMap);
  // console.log("updates", updates);

  for (const updateLine of updates) {
    // console.log("updateline", updateLine);
    // const length = updateLine.length;
    // const isValid = true;
    if (isValidUpdate(updateLine, rulesMap)) {
      validUpdates.push(updateLine);
    }
  }

  let total = 0;
  for (const validUpdate of validUpdates) {
    const middleInd = Math.floor(validUpdate.length / 2);
    total += validUpdate[middleInd];
  }

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rulesMap = new Map();
  const ruleLines = input.split("\n\n")[0].split("\n");
  const updates = input
    .split("\n\n")[1]
    .split("\n")
    .map((line) => line.split(",").map(Number));
  const notValidUpdates = [];
  const validUpdates = [];

  for (const line of ruleLines) {
    const [before, after] = line.split("|").map(Number);

    if (!rulesMap.has(before)) {
      rulesMap.set(before, []);
    }

    rulesMap.get(before).push(after);
  }

  // console.log("rulesMap", rulesMap);

  for (const updateLine of updates) {
    if (!isValidUpdate(updateLine, rulesMap)) {
      notValidUpdates.push(updateLine);
    }
  }

  for (const inValid of notValidUpdates) {
    const reorderedUpdate = reorderPages(inValid, rulesMap);
    validUpdates.push(reorderedUpdate);
  }
  // console.log("notValidUpdates", notValidUpdates);
  // console.log("validUpdates", validUpdates);

  let total = 0;
  for (const validUpdate of validUpdates) {
    const middleInd = Math.floor(validUpdate.length / 2);
    total += validUpdate[middleInd];
  }

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
