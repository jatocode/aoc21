const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
const lines = input.split('\n').map(x => x.trim()); // trim pga fick strul med \r

let overlaps = 0;
let botten = [];

lines.forEach(x => {
    let x1, y1, x2, y2;
    [_, x1, y1, x2, y2] = x.match(/(\d*),(\d*)\s->\s(\d*),(\d*)/);

    // Varför i helvete blir det fel om jag inte gör parseInt ?
    overlaps += drawLine(parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2));
});

console.log('Överlappande: ', overlaps);

function drawLine(x1, y1, x2, y2) {
    let ol = 0;
    if (y1 == y2) {
        const [start, end] = [x1, x2].sort((a, b) => a - b);
        for (let x = start; x <= end; x++) {
            ol += markGrid(x, y1);
        }
    } else if (x1 == x2) {
        const [start, end] = [y1, y2].sort((a, b) => a - b);
        for (let y = start; y <= end; y++) {
            ol += markGrid(x1, y);
        }
    } else {
        // Del 2
        for (let i = 0; i <= Math.abs(x1 - x2); i++) {
            const x = x1 > x2 ? x1 - i : x1 + i;
            const y = y1 > y2 ? y1 - i : y1 + i;
            ol += markGrid(x, y);
        }
    }

    return ol;
}

function markGrid(x, y) {
    const p = x + ':' + y;
    if (!botten[p]) botten[p] = 0;
    botten[p]++;

    if (botten[p] == 2) return 1;
    return 0;
}

