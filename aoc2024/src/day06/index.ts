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
  // console.log(visited);

  return visited.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
  onlyTests: true,
});
