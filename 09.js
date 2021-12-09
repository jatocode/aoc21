const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let [x, y] = [0, 0];

let heightmap = [];
let width = lines[0].length;
lines.forEach((line,y) => {
for (let x = 0; x < width; x++) {
        const heat = line[x];
        heightmap[x + ':' + y] = parseInt(heat);
    }
});


let lows = [];
let risklevel = 0;
Object.keys(heightmap).forEach(pos => {
    let [x,y] = pos.split(':').map(x => parseInt(x));
    let nb = neighbours(x,y).filter(x => x != undefined);
    let h = height(x,y);

    // Del 1
    if(h < Math.min(...nb)) {
        lows.push(pos);
        risklevel += (h + 1);
    } 
})


console.log('Del 1, risklevel=', risklevel);

function height(x,y) {
    return heightmap[x + ':' + y];
}

function neighbours(x,y) {
    return [
        height(x-1, y),
        height(x, y-1),
        height(x+1, y),
        height(x, y+1)
    ]
}