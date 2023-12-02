import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");

const words = {
  one: "1",
  two: "t2o",
  three: "th3e",
  four: "fossuxx4r",
  five: "fissv5xe",
  six: "s6xxx",
  seven: "sesvx7xn",
  eight: "eisxg8xxt",
  nine: "ninsss9xe",
};

const sanitize = (str) => {
  const x = Object.entries(words).reduce(
    (carry, [word, value]) => carry.replaceAll(word, value),
    str
  );
  return x;
};

const parse = (data) =>
  data.map((entry) => {
    const nums = entry.split("").filter((x) => !isNaN(parseInt(x)));
    console.log({nums,entry})
    return parseInt([nums.at(0), nums.at(-1)].join(""));
  });

const sol1 = parse(input.split("\n")).reduce((sum, item) => sum + item, 0);
console.log(`Sol1: ${sol1}`);

const sol2 = parse(sanitize(input).split("\n")).reduce(
  (sum, item) => sum + item,
  0
);
console.log(`Sol2: ${sol2}`);