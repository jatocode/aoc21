const { table } = require('console');
const fs = require('fs');
const args = process.argv.slice(2);

const data = fs.readFileSync(args[0], 'utf8');
const lines = data.split('\n').map(x => parseInt(x));

let current = parseInt(lines[0]);

let p1 = 0;
lines.forEach(x => {
    if(x > current) p1++;
    current = x;
});

console.log('Del 1: ' + p1);

current = lines[0] + lines[1] + lines[2];
let p2 = 0;
for (let index = 0; index < lines.length; index++) {
    const e1 = lines[index];
    const e2 = lines[index+1];
    const e3 = lines[index+2];

    let win = e1+e2+e3;
    if(win > current) p2++;
    current = win;
}

console.log('Del 2: ' + p2);
