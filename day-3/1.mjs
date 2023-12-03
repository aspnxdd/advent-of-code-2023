import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

function checkIfNearCellIsASymbol(i, j) {
  const isValidIndex = (row, col) =>
    row >= 0 && row < lines.length && col >= 0 && col < lines[0].length;

  const isSymbolOrNumber = (row, col) =>
    lines[row][col] === "." || !isNaN(Number(lines[row][col]));

  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [rowOffset, colOffset] of neighbors) {
    const newRow = i + rowOffset;
    const newCol = j + colOffset;

    if (isValidIndex(newRow, newCol) && !isSymbolOrNumber(newRow, newCol)) {
      return false;
    }
  }

  return true;
}

function extractNumbers(str) {
  const resultArray = [];
  let currentNumber = "";
  let idxs = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char >= "0" && char <= "9") {
      currentNumber += char;
      idxs.push(i);
    } else if (currentNumber !== "") {
      resultArray.push({ num: parseInt(currentNumber, 10), idxs });
      currentNumber = "";
      idxs = [];
    }
  }

  if (currentNumber !== "") {
    resultArray.push({ num: parseInt(currentNumber, 10), idxs });
  }

  return resultArray;
}

let x = 0;

for (let i = 0; i < lines.length; ++i) {
  const line = lines[i];
  const lineArr = [...line];
  const nums = extractNumbers(lineArr.join(""));
  for (let j = 0; j < nums.length; ++j) {
    if (nums[j].idxs.length === 0) {
      x += nums[j].num;
      continue;
    }
    for (let k = 0; k < nums[j].idxs.length; ++k) {
      const res = checkIfNearCellIsASymbol(i, nums[j].idxs[k]);
      if (!res) {
        x += nums[j].num;
        break;
      }
    }
  }
}
console.log({ x });
