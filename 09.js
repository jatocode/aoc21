const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let heightmap = [];
let width = lines[0].length;
lines.forEach((line, y) => {
    for (let x = 0; x < width; x++) {
        const heat = line[x];
        heightmap[x + ':' + y] = parseInt(heat);
    }
});

let basins = [];
let risklevel = 0;
Object.keys(heightmap).forEach(pos => {
    let nb = neighbourHeights(pos);
    let h = heightmap[pos];

    // Hitta lägstapunkterna
    if (h < Math.min(...nb)) {
        // Del 1
        risklevel += (h + 1);

        // Del 2
        let b = basin(pos);
        basins.push(b.length);
    }
})

console.log('Del 1, risklevel=', risklevel);

let bl = basins.sort((a, b) => b - a);
console.log('Del 2: Basins multiplied', bl[0] * bl[1] * bl[2]);

function basin(pos, locs) {
    if(locs == undefined) locs = [];
    if (!locs.includes(pos)) locs.push(pos);

    let nbp = neighbours(pos);
    let oknb = nbp.filter(p => {
        return !locs.includes(p) && heightmap[p] != undefined && heightmap[p] != 9
    });

    oknb.forEach(nb => {
        if (heightmap[nb] > heightmap[pos]) {
            basin(nb, locs)
        } 
    });

    return locs;
}

function height(x, y) {
    return heightmap[x + ':' + y];
}

function neighbours(pos) {
    let [x, y] = pos.split(':').map(x => parseInt(x));

    return [
        (x - 1) + ':' + y,
        x + ':' + (y - 1),
        (x + 1) + ':' + y,
        x + ':' + (y + 1)
    ];
};

function neighbourHeights(pos) {
    let [x, y] = pos.split(':').map(x => parseInt(x));

    return [
        height(x - 1, y),
        height(x, y - 1),
        height(x + 1, y),
        height(x, y + 1)
    ].filter(x => x != undefined);
}
