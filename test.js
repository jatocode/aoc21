let data = require("fs").readFileSync("data/13-input.txt", { encoding: "utf-8" }).trim();
let groups = data.split(/\n{2,}/);
let dots = groups[0].split(/\n/).map((l) => l.split(",").map((v) => +v));

// for (const instruction of groups[1].split(/\n/)) {
//   let axis = instruction[11] === "x" ? 0 : 1;
//   let val = +instruction.substring(13);
//   for (const dot of dots) if (dot[axis] >= val) dot[axis] = 2 * val - dot[axis];
//   console.log(new Set(dots.map((d) => `${d[0]},${d[1]}`)).size);
//   console.log(new Set(dots.map((d) => `${d[0]},${d[1]}`)));
//   return;
// }


for (const instruction of groups[1].split(/\n/)) {
  let axis = instruction[11] === "x" ? 0 : 1;
  let val = +instruction.substring(13);
  for (const dot of dots) if (dot[axis] >= val) dot[axis] = 2 * val - dot[axis];
  console.log(new Set(dots.map((d) => `${d[0]},${d[1]}`)).size);
}

let map = Array.from({ length: Math.max(...dots.map((d) => d[1])) + 1 }, () =>
  Array.from({ length: Math.max(...dots.map((d) => d[0])) + 1 }, () => " ")
);

for (const d of dots) map[d[1]][d[0]] = "█";
for (const line of map) console.log(line.join(""));

