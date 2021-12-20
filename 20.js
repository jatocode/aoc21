const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let algo;
let imgMap = new Map();
let [width, height] = [0, 0];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length == 0) continue;
    if (i == 0) {
        algo = line.replace(/#/gi, '1').replace(/\./gi, '0');
    } else {
        width = line.length;
        for (let x = 0; x < line.length; x++) {
            imgMap.set(x + ':' + height, line[x] == '#' ? '1' : '0');
        }
        height++;
    }
};


let step = 0;  // Global variabel, ser ni mig göra det utanför AoC så skjut mig
print(0);

for (step = 1; step <= 50; step++) {
    imgMap = enhanceall(step * 2);
}
console.log(`Antal tända efter steg ${step - 1}:`, [...imgMap.keys()].filter(x => imgMap.get(x) == '1').length);

function enhanceall(offset = 2) {
    let newmap = new Map();
    for (let y = 0 - offset; y < height + offset; y++) {
        for (let x = 0 - offset; x < width + offset; x++) {
            newmap.set(x + ':' + y,  enhance(x, y));
        }
    }
    return newmap;
}

function enhance(x, y) {
    let pix = neighboursPix(x, y);
    let np = ninepixel(pix.join(''));

    return np;
}

function ninepixel(pixels) {
    return algo[parseInt(pixels, 2)]
}

function pixel(x, y) {
    let p = imgMap.get(x + ':' + y);
    
    // Visar sig att "infinity" blinkar varje steg pga algoritmen. TRICKY!
    let bg = step % 2 == 0 ? '1' : '0';
    
    return p == undefined ? bg : p;
}

function neighboursPix(x, y) {
    return [
        pixel((x - 1), (y - 1)), // NV
        pixel(x, (y - 1)),   // N
        pixel((x + 1), (y - 1)), // NO

        pixel((x - 1), y),         // V
        pixel(x, y),  // MITT
        pixel((x + 1), y),     // O

        pixel((x - 1), (y + 1)), // SV
        pixel(x, (y + 1)),       // S
        pixel((x + 1), (y + 1)), // SO
    ];
};

function print(offset = 5) {
    for (let y = 0 - offset; y < height + offset; y++) {
        let line = '';
        for (let x = 0 - offset; x < width + offset; x++) {
            let e = pixel(x, y) == '1' ? '#' : '.';
            line += e;
        }
        console.log(line);
    }
    console.log();
}