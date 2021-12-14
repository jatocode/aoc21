const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let rules = [];
let formula = '';
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length == 0) continue;
    if (line.includes('->')) {
        const [_, a, b] = line.match(/([A-Z]+)\ -> ([A-Z])+/)
        rules.push([a, b]);
    } else {
        formula = line;
    }
};

//console.table(rules);
//console.log(formula);

let steps = 10;
for (let step = 0; step < steps; step++) {
    let ins = [];
    for (let i = 0; i < formula.length - 1; i++) {
        const el = formula[i] + formula[i + 1];
        let m = false;
        rules.forEach(r => {
            if (r[0] == el) {
                ins.push(formula[i] + r[1]);
                m = true;
            }
        });
        if (!m) ins.push(formula[i]);
    }
    ins.push(formula[formula.length - 1]);
    formula = ins.join('');
    console.log(step);
}

let counts = count(formula.split(''));
let max = 0;
let min = Number.MAX_SAFE_INTEGER;
Object.keys(counts).forEach(c => {
    max = counts[c] > max ? counts[c] : max;
    min = counts[c] < min ? counts[c] : min;
});

console.log(steps,counts,max,min,'Max - min: ', max - min);

console.log('Del 2: Borde kunna göra som med fiskarna, bara räkna antal par av varje regel och sen slå ihop?')

function count(arr) {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
}