const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let core = new Set();
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if(line.length == 0) continue;

    // on x=10..12,y=10..12,z=10..12
    const [_, state, coords] = line.match(/(on|off) (.*)/);
    let [__, xp, xa, yp, ya, zp, za] = coords.match(/x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/).map(x => parseInt(x));

    let size = core.size;
    [xp, xa] = [min50(xp), max50(xa)];
    [yp, ya] = [min50(yp), max50(ya)];
    [zp, za] = [min50(zp), max50(za)];

    for (let z = zp; z <= za; z++) {
        for (let y = yp; y <= ya; y++) {
            for (let x = xp; x <= xa; x++) {
                const cube = x + ',' + y + ',' + z;
                if (in50(x) && in50(y) && in50(z)) {
                    if (state == 'on') {
                        core.add(cube);
                    } else {
                        core.delete(cube);
                    }
                }
            }
        }
    }
    // console.log(state, xp, xa, xp, ya, zp, za, '->', core.size - size);
};

console.log('Core size', core.size);

function in50(a) {
    return a >= -50 && a <= 50;
}

function max50(a) {
    return a >= 50 ? 50 : a;
}

function min50(a) {
    return a <= -50 ? -50 : a;
}