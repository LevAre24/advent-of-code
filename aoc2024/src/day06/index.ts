import run from "aocrunner";

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const directionSymbols = ["^", ">", "v", "<"];

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => x.split(""));

const guardPos = (map: string[][]) => {
  let xPos = -1;
  let yPos = -1;

  for (let i = 0; i < map.length; i++) {
    const row = map[i];

    xPos = row.findIndex((x) => x === "^");
    if (xPos !== -1) {
      yPos = i;
      break;
    }
  }

  return [xPos, yPos];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let [guardX, guardY] = guardPos(input);
  let visited = new Set();
  visited.add(`${guardY},${guardX}`);

  let dirIndex = 0;
  let direction = directions[dirIndex];

  let nextRow = guardX + direction[1];
  let nextCol = guardY + direction[0];

  while (
    nextRow >= 0 &&
    nextRow < input[0].length &&
    nextCol >= 0 &&
    nextCol < input.length
  ) {
    if (input[nextCol][nextRow] === "#") {
      dirIndex = (dirIndex + 1) % 4;
      direction = directions[dirIndex];
    } else {
      guardX = nextRow;
      guardY = nextCol;
      visited.add(`${guardY},${guardX}`);
    }

    nextRow = guardX + direction[1];
    nextCol = guardY + direction[0];
  }

  return visited.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let obstructedCount = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[j][i] === "^" || input[j][i] === "#") {
        continue;
      }

      const dupInput = structuredClone(input);
      dupInput[j][i] = "#";

      let [guardX, guardY] = guardPos(dupInput);

      let dirIndex = 0;
      let direction = directions[dirIndex];

      let visitedDirections: Record<number, Set<string>> = {};
      directions.forEach(
        (direction, index) => (visitedDirections[index] = new Set()),
      );
      visitedDirections[dirIndex].add(`${guardY},${guardX}`);

      let nextRow = guardX + direction[1];
      let nextCol = guardY + direction[0];

      while (
        nextRow >= 0 &&
        nextRow < dupInput[0].length &&
        nextCol >= 0 &&
        nextCol < dupInput.length
      ) {
        if (dupInput[nextCol][nextRow] === "#") {
          dirIndex = (dirIndex + 1) % 4;
          direction = directions[dirIndex];
        } else {
          guardX = nextRow;
          guardY = nextCol;
          if (visitedDirections[dirIndex].has(`${guardY},${guardX}`)) {
            obstructedCount++;
            break;
          }
          visitedDirections[dirIndex].add(`${guardY},${guardX}`);
        }

        nextRow = guardX + direction[1];
        nextCol = guardY + direction[0];
      }
    }
  }

  return obstructedCount;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
