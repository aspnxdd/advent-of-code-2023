import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

function parseLine(line) {
  const [, game] = line.split(": ");

  const sets = game.split(";").map((e) => e.trim());
  const lineConfig = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const set of sets) {
    const vals = set.split(",").map((e) => e.trim());

    vals.forEach((val) => {
      const [num, color] = val.split(" ");
      lineConfig[color] = Math.max(lineConfig[color], Number(num));
    });
  }

  return lineConfig.red * lineConfig.green * lineConfig.blue;
}

const g = lines.reduce((acc, e) => acc + parseLine(e), 0);

console.log(g);
