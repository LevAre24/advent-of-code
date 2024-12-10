import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("");

const pushItem = (array: string[], item: string, count: number) => {
  for (let i = 0; i < count; i++) {
    array.push(item);
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let checkSum = 0;
  const initBlock: string[] = [];
  let updatedBlock: string[] = [];

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      pushItem(initBlock, (i / 2).toString(), parseInt(input[i]));
    } else {
      pushItem(initBlock, ".", parseInt(input[i]));
    }
  }

  const numbers = initBlock.filter((x) => x !== ".");

  for (let i = 0; i < initBlock.length; i++) {
    if (numbers.length) {
      if (initBlock[i] === ".") {
        const lastNumber = numbers.pop();
        if (lastNumber !== undefined) {
          updatedBlock.push(lastNumber);
        }
      } else {
        const firstNumber = numbers.shift();
        if (firstNumber !== undefined) {
          updatedBlock.push(firstNumber);
        }
      }
    }
  }

  for (let i = 0; i < updatedBlock.length; i++) {
    checkSum += parseInt(updatedBlock[i]) * i;
  }

  return checkSum;
};

const canUpdate = (numBlocks: string[][], blocks: string[][]): boolean => {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < numBlocks.length; j++) {
      if (numBlocks[j].length <= blocks[i].length) {
        return true;
      }
    }
  }
  return false;
};

const groupBlocks = (initBlock: string[]) => {
  const blocks = [];
  let currBlock = [initBlock[0]];
  for (let i = 1; i <= initBlock.length; i++) {
    if (initBlock[i] === initBlock[i - 1]) {
      currBlock.push(initBlock[i]);
    } else {
      blocks.push(currBlock);
      currBlock = [initBlock[i]];
    }
  }

  return blocks;
};

const getSize = (currIndex: number, block: string[]) => {
  let size = 0;

  for (let i = currIndex; i < block.length; i++) {
    if (block[i] === ".") {
      size += 1;
    } else {
      return size;
    }
  }

  return size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: "2333133121414131402",
        expected: 1928,
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
