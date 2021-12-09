const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let [x, y] = [0, 0];

let heightmap = [];
let width = lines[0].length;
lines.forEach((line, y) => {
    for (let x = 0; x < width; x++) {
        const heat = line[x];
        heightmap[x + ':' + y] = parseInt(heat);
    }
});

let lows = [];
let risklevel = 0;
Object.keys(heightmap).forEach(pos => {
    let [x, y] = pos.split(':').map(x => parseInt(x));
    let nb = neighbourHeights(x, y);
    let h = height(x, y);

    // Del 1
    if (h < Math.min(...nb)) {
        lows.push(pos);
        risklevel += (h + 1);
    }

    console.log('basin',basin(pos, []));

})


console.log('Del 1, risklevel=', risklevel);

function basin(pos, locs) {
    let nbp = neighbours(pos);
    let oknb = nbp.filter(pos => {
        let [x, y] = pos.split(':').map(x => parseInt(x));
        return !locs.includes(pos) && heightmap[pos] != undefined;
    });

    let nbh = oknb.map(pos => heightmap[pos]);
    let h = heightmap[pos];
    if (h < Math.min(...nbh.filter(x => x!= undefined))) {
        console.log(pos, h, oknb, nbh);
        locs.push(pos);
        oknb.forEach(b => {
            console.log(b);

            locs.push(basin(b, locs));
        });
       
    }

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
        x + ':' + (y + 1),
        (x - 1) + ':' + (y - 1),
        (x + 1) + ':' + (y - 1),
        (x + 1) + ':' + (y + 1),
        (x - 1) + ':' + (y + 1)
    ];
};

function neighbourHeights(x, y) {
    return [
        height(x - 1, y),
        height(x, y - 1),
        height(x + 1, y),
        height(x, y + 1),

        height(x - 1, y - 1),
        height(x + 1, y - 1),
        height(x + 1, y + 1),
        height(x - 1, y + 1)
    ].filter(x => x != undefined);
}