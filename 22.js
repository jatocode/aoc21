const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let algo;
let imgMap = new Map();
let [width, height] = [0, 0];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const [] = line.match(/(on|off) x=(\d+)..)
};


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
