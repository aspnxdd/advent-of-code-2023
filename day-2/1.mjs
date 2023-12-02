import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

const config = {
  red: 12,
  green: 13,
  blue: 14,
};

function parseLine(line, idx) {
  const [, game] = line.split(": ");
  const sets = game.split(";").map((e) => e.trim());
  for (const set of sets) {
    const lineConfig = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const vals = set.split(",").map((e) => e.trim());
    vals.forEach((val) => {
      const [num, color] = val.split(" ");
      lineConfig[color] += Number(num);
    });
    if (
      lineConfig.red > config.red ||
      lineConfig.green > config.green ||
      lineConfig.blue > config.blue
    ) {
      return 0;
    }
  }
  return idx + 1;
}

const g = lines.reduce((acc, e, i) => acc + parseLine(e, i), 0);

console.log(g);
