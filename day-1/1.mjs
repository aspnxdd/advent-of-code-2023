import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

const getFirstNumber = (lineArr, method = "shift") => {
  while (lineArr.length > 0) {
    const first = Number(lineArr[method]());
    if (!Number.isNaN(first)) {
      return first;
    }
  }
};

const numbers = lines
  .map((line) =>
    Number(`${getFirstNumber([...line])}${getFirstNumber([...line], "pop")}`)
  )
  .reduce((acc, curr) => acc + curr, 0);

console.log(numbers);
