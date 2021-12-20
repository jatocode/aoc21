const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let algo;
let img = [];
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
            img[x + ':' + height] = line[x] == '#' ? '1' : '0';
            imgMap.set(x + ':' + height, line[x] == '#' ? '1' : '0');
        }
        height++;
    }
};
let memonine = memoizer(ninepixel);

print();
console.log('1st pass');
img = enhanceall(110);
console.log('Size',Object.keys(img).length);
console.log('antal tända: ', Object.keys(img).filter(x => img[x] == '1').length);

//print(5);
console.log('2nd pass');
img = enhanceall(110);
console.log('Size',Object.keys(img).length);
print(5);

console.log('Del 1: Antal tända: ', Object.keys(img).filter(x => img[x] == '1').length);

function enhanceall(offset = 2) {
    let newi = [];
    let newmap = new Map();
    for (let y = 0 - offset; y < height + offset; y++) {
        for (let x = 0 - offset; x < width + offset; x++) {
            newi[x + ':' + y] = enhance(x, y);
            newmap.set(x + ':' + y,  enhance(x, y));
        }
    }
    return newi;
}

function enhanceall2(offset = 2) {
    let newi = Object.keys(img).map(x => x);
    for (let y = 0 - offset; y < height + offset; y++) {
        for (let x = 0 - offset; x < width + offset; x++) {
            newi[x + ':' + y] = enhance(x, y);
        }
    }
    return newi;
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
    //let p = imgMap.get(x + ':' + y); 
    //return p == undefined ? '0' : p;

    return img[x + ':' + y] == undefined ? '0' : img[x + ':' + y];
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