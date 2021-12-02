const { table } = require('console');
const fs = require('fs');
const args = process.argv.slice(2);

const data = fs.readFileSync(args[0], 'utf8');
const lines = data.split('\n');

let h = 0;
let d = 0;
let aim = 0;
let x = 0;
lines.forEach(x => {
    let move = x.match(/([a-z]*)\s(\d*).*/);
    x = parseInt(move[2]);
    switch(move[1]) {
        case 'forward': 
            h += x; 
            d += aim * x;
            break;
        case 'down': 
            aim += x; 
            break;
        case 'up':
            aim -= x; 
            break;
    }
});

console.log('Result: ', h * d);

