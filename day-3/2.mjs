import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

function getNumberNeighbors(i, j) {
  const isValidIndex = (row, col) =>
    row >= 0 && row < lines.length && col >= 0 && col < lines[0].length;

  const isNumber = (row, col) => !isNaN(Number(lines[row][col]));

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
  const idxs = [];
  for (const [rowOffset, colOffset] of neighbors) {
    const newRow = i + rowOffset;
    const newCol = j + colOffset;
    if (isValidIndex(newRow, newCol) && isNumber(newRow, newCol)) {
      idxs.push([newRow, newCol]);
    }
  }
  return idxs.map(([row, col]) => extractNumbers(lines[row], row, col));
}

function extractNumbers(str, row, col) {
  const resultArray = [];
  let currentNumber = "";
  let idxs = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char >= "0" && char <= "9") {
      currentNumber += char;
      idxs.push([row, i]);
    } else if (currentNumber !== "") {
      resultArray.push({ num: parseInt(currentNumber, 10), idxs });
      currentNumber = "";
      idxs = [];
    }
  }
  if (currentNumber !== "") {
    resultArray.push({ num: parseInt(currentNumber, 10), idxs });
  }
  return resultArray.find((e) =>
    e.idxs.some(([r, c]) => r === row && c === col)
  );
}

let y = 0;

for (let i = 0; i < lines.length; ++i) {
  const line = lines[i];
  const lineArr = [...line];
  for (let j = 0; j < lineArr.length; ++j) {
    if (lines[i][j] !== "*") continue;
    const res = getNumberNeighbors(i, j).filter(Boolean);
    if (res.length >= 0) {
      const u = [...new Set(res.map((e) => e.num))];

      if (u.length !== 2) continue;
      y += u.reduce((acc, e) => acc * e, 1);
    }
  }
}
console.log({ y });
