const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let east = new Set();
let south = new Set();
lines.forEach((line,y) => {
    line.split('').forEach((c,x) => {
        if(c == '>') east.add(x+','+y, '>');
        if(c == 'v') south.add(x+','+y,  '>');
    })
})

let height = lines.length;
let width = lines[0].length;

let move = 1;
let step = 0;
//print(step);
while(move > 0) {
    move = 0;
    move += moveherd(east, eastnext);
    move += moveherd(south, southnext);
    step++;
//    print(step);
}
console.log('Del 1, steg', step);

function moveherd(herd, check) {
    let move = [];
    [...herd].forEach(c => {
        let next = check(c);
        if(!east.has(next) && !south.has(next)) {
            move.push([c,next]);
        };
    });

    move.forEach(m => {
        herd.delete(m[0])
        herd.add(m[1]);
    })

    return move.length;
}

function eastnext(pos) {
    const [x,y] = pos.split(',').map(x => parseInt(x));
    return (x + 1) % width + ',' + y;
}

function southnext(pos) {
    const [x,y] = pos.split(',').map(x => parseInt(x));
    return x + ',' + (y + 1) % height;
}

function print(s) {
    console.log('After',s,'step:');
    for (let y = 0; y < height; y++) {
        let line = '';
        for(let x=0; x < width; x++) {
            if(east.has(x+','+y)) line += '>';
            else if(south.has(x+','+y)) line += 'v';
            else line += '.';
        }        
        console.log(line);
    }
}