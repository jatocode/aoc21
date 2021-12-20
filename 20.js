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
let memonine = memoizer(ninepixel);

let step = 1;
print(0);
console.log('1st pass');
imgMap = enhanceall(10, step);
console.log('antal tända: ', [...imgMap.keys()].filter(x => imgMap.get(x) == '1').length);

print(10);
step++;
console.log('2nd pass');
imgMap = enhanceall(30, step);
print(5);

console.log('Del 1: Antal tända: ', [...imgMap.keys()].filter(x => imgMap.get(x) == '1').length);

function enhanceall(offset = 2, step) {
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
    let np = memonine(pix.join(''));

    return np;
}

function ninepixel(pixels) {
    let pix = pixels; 
    if (algo[parseInt(pix, 2)] == undefined) pix.error = true;
    // console.log(pix, parseInt(pix, 2), algo[parseInt(pix, 2)]);
    return algo[parseInt(pix, 2)]
}

function pixel(x, y) {
    let p = imgMap.get(x + ':' + y);
    
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

function memoizer(fun) {
    let cache = {}
    return function (n) {
        if (cache[n] != undefined) {
            return cache[n]
        } else {
            let result = fun(n)
            cache[n] = result
            return result
        }
    }
}