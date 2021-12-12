const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let octopuses = [];
let width = lines[0].length;
lines.forEach((line, y) => {
    for (let x = 0; x < width; x++) {
        const energy = line[x];
        octopuses[x + ':' + y] = parseInt(energy);
    }
});

let flashes = 0;
for (let step = 1; step < 500; step++) {
    const octos = Object.keys(octopuses);
    let flashed = [];
    let flashesNow = flashes;
    octos.forEach(p => {
        raiseEnergy(p, flashed);
    });

    if(step == 100) {
        console.log('Del 1, efter 100 steg:', flashes);
    }

    if(flashes - flashesNow == octos.length) {
        console.log('Del 2: ', step);
        break;
    }
    //print();
}

function raiseEnergy(pos, flashed) {
    if(flashed.includes(pos)) return;

    octopuses[pos]++;

    if (octopuses[pos] > 9) {
        // flash!
        flashes++;
        if (!flashed.includes(pos)) flashed.push(pos);
        octopuses[pos] = 0;

        // Hitta vettiga grannar
        let nbp = neighbours(pos);
        let oknb = nbp.filter(p => !flashed.includes(p) && octopuses[p] != undefined);
        oknb.forEach(nb => {
            raiseEnergy(nb, flashed);
        });
    }
}

function neighbours(pos) {
    let [x, y] = pos.split(':').map(x => parseInt(x));

    return [
        (x + 1) + ':' + y,
        (x + 1) + ':' + (y + 1),
        x + ':' + (y + 1),
        (x - 1) + ':' + (y + 1),
        (x - 1) + ':' + y,
        (x - 1) + ':' + (y - 1),
        x + ':' + (y - 1),
        (x + 1) + ':' + (y - 1),
    ];
};

function print() {
    for (let y = 0; y < lines.length; y++) {
        let line = '';
        for (let x = 0; x < lines[0].length; x++) {
            let e = octopuses[x + ':' + y];
            line += e;
            // if (e > 9) line += '*';
            // else line += ' ';
        }
        console.log(line);
    }
    console.log();
}