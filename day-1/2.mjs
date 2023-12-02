import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getFirstNumber = (line, method = "shift") => {
  const lineArr1 = [...line];
  const stringMethod = method === "shift" ? "startsWith" : "endsWith";
  while (true) {
    let first = Number(lineArr1[method]());
    if (!Number.isNaN(first)) {
      return first;
    }
    const lineCopy = [...line];
    while (lineCopy.length > 0) {
      for (let i = 0; i < digits.length; i++) {
        const digit = digits[i];
        if (lineCopy.join("")[stringMethod](digit)) {
          return i + 1;
        }
      }
      first = Number(lineCopy[method]());
      if (!Number.isNaN(first)) {
        return first;
      }
    }
  }
};

const numbers = lines
  .map((line) =>
    Number(`${getFirstNumber(line)}${getFirstNumber(line, "pop")}`)
  )
  .reduce((acc, curr) => acc + curr, 0);

console.log(numbers);
