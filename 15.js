const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let cavern = [];
let map = [];
for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    if (line.length == 0) continue;

    for (let x = 0; x < lines[0].length; x++) {
        const risk = line[x];
        cavern[x + ':' + y] = parseInt(risk);
    }
};
const [twidth, theight] = [lines[0].length, lines.length];
const width = twidth * 5;
const height = theight * 5;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        let fx = x - (twidth) < 0 ? x : x - (twidth);
        let fy = y - (theight) < 0 ? y : y - (theight);

        let from = y < theight ? fx + ':' + y : x + ':' + fy;
        let to = x + ':' + y;

        let risk = cavern[from] + 1 > 9 ? 1 : cavern[from] + 1;
        
        if(x > 9 || y > 9) cavern[to] = risk;
        //console.log(from, '->', to, risk);
    }
}
//print(cavern, 50, 50);
let leastcost = findpath('0:0');
//print(cavern, 50, 50);

// print(cavern);
console.log('Del 2:', leastcost);

function findpath(pos) {
    let visited = new Set();
    let unvisited = new Set(Object.keys(cavern));
    let camefrom = [];
    let cost = [];
    camefrom[pos] = '*';
    cost[pos] = 0;
    let goal = (width - 1) + ':' + (height - 1);

    console.log(goal, cavern[goal]);
    let current = pos;
    let s = 0;
    while (current) {
        if (visited.has(current)) continue;
        if (current == goal) {
            break;
        }

        let nbs = neighbours(current).filter(x => !visited.has(x));
        nbs.forEach(nb => {
            let nc = cost[current] + cavern[nb];
            if (!cost[nb] || nc < cost[nb]) {
                camefrom[nb] = current;
                cost[nb] = nc;
            }
        })
        visited.add(current);
        unvisited.delete(current);

        let un = [...unvisited]
            .map(x => { return { pos: x, cost: cost[x] == undefined ? Infinity : cost[x] } })
            .sort((a, b) => a.cost - b.cost);

        if(s++ % 500 == 0) console.log('Unvisited count', unvisited.size);
        // Prova den med minst kostnad nu
        current = un[0].pos;
    }

    //Skriv ut vägen för skojs skull
    let c = goal;
    let path = [];
    while (c != '0:0') {
        path.push(c)
        c = camefrom[c]
        map[c] = cavern[c]; //'*';
    }
    map[goal] = cavern[goal];
    path.push('0:0');
    path.reverse();

    return cost[goal];
}

function neighbours(pos) {
    const [x, y] = pos.split(':').map(x => parseInt(x));

    return [
        (x + 1) + ':' + y,
        //   (x + 1) + ':' + (y + 1),
        x + ':' + (y + 1),
        // (x - 1) + ':' + (y + 1),
        (x - 1) + ':' + y,
        //   (x - 1) + ':' + (y - 1),
        x + ':' + (y - 1),
        //    (x + 1) + ':' + (y - 1),
    ];
};

function print(karta, w = lines[0].length, h = lines.length) {
    for (let y = 0; y < h; y++) {
        let line = '';
        for (let x = 0; x < w; x++) {
            let e = karta[x + ':' + y];
            line += e == undefined ? '?' : e;
            line += map[x + ':' + y] == undefined ? ' ' : '*';
        }
        console.log(line);

    }
    console.log();
}