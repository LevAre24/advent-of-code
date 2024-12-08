import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const validCoordinate = (
  x: number,
  y: number,
  width: number,
  length: number,
) => {
  return x >= 0 && x < width && y >= 0 && y < length;
};

const search = (
  index: number,
  word: string,
  grid: string[][],
  x: number,
  y: number,
  xDir: number,
  yDir: number,
): boolean => {
  if (index === word.length) {
    return true;
  }

  if (
    validCoordinate(x, y, grid.length, grid[0].length) &&
    word[index] === grid[x][y]
  ) {
    return search(index + 1, word, grid, x + xDir, y + yDir, xDir, yDir);
  }

  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const xmas = "XMAS";
  const grid = input.split("\n").map((line) => line.split(""));
  // console.log(grid);

  const width = grid.length;
  const length = grid[0].length;
  let coords = [];

  const xDir = [-1, -1, -1, 0, 0, 1, 1, 1];
  const yDir = [-1, 0, 1, -1, 1, -1, 0, 1];

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      for (let k = 0; k < 8; k++) {
        if (search(0, xmas, grid, i, j, xDir[k], yDir[k])) {
          coords.push([i, j]);
        }
      }
    }
  }

  return coords.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const xmas = "MAS";
  const grid = input.split("\n").map((line) => line.split(""));
  // console.log(grid);

  const width = grid.length;
  const length = grid[0].length;
  let coords = [];

  const xDir = [-1, -1, -1, 0, 0, 1, 1, 1];
  const yDir = [-1, 0, 1, -1, 1, -1, 0, 1];
  const directions = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      if (grid[i][j] === "A") {
        let matches = 0;

        for (let k = 0; k < directions.length; k++) {
          const [dx, dy] = directions[k];
          const checkX = i + dx;
          const checkY = j + dy;
          const oppX = i - dx;
          const oppY = j - dy;

          if (
            validCoordinate(checkX, checkY, width, length) &&
            validCoordinate(oppX, oppY, width, length) &&
            grid[checkX][checkY] === "M" &&
            grid[oppX][oppY] === "S"
          ) {
            matches += 1;
          }
        }

        if (matches === 2) {
          coords.push([i, j]);
        }
      }
    }
  }

  // console.log(coords);

  return coords.length; //5535 is too high
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
