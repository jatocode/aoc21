const { on } = require('events');
const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let paper = [];
let folds = [];
let width = 0;
let height = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.length == 0) continue;

    if (line.startsWith('fold')) {
        const [_, d, a] = line.match(/fold along ([a-z]+)=(\d+)/)
        folds.push([d, parseInt(a)]);
    } else {
        const [_, x, y] = line.match(/(\d+),(\d+)/);
        paper[x + ':' + y] = '#';
        height++;
        width = parseInt(x) > width ? parseInt(x) : width;
    }
};

// Fold once
foldit();
print();

function foldit(numfolds = folds.length) {
    for (let f = 0; f < numfolds; f++) {
        const fold = folds[f];
        switch (fold[0]) {
            case 'x':
                console.log('Folding left, width is', width, 'fold is', fold[1]);
                foldleft(fold[1]);
                width = fold[1] - 1;
                break;
            case 'y':
                console.log('Folding up, height is', height, 'fold is', fold[1]);
                foldup(fold[1]);
                height = fold[1] - 1;
                break;
        }
        console.log('Visible after',f+1,'folds:', count());
    }
}

function foldup(amount) {
    let y2 = 0;
    for (let y = 2 * amount; y >= amount; y--) {
        for (let x = 0; x <= width; x++) {
            let p = paper[x + ':' + y];
            if (p == '#') paper[x + ':' + y2] = p;
        }
        y2 += 1;
    }
}

function foldleft(amount) {
    for (let y = 0; y <= height; y++) {
        let x2 = 0;
        for (let x = 2 * amount; x >= 0; x--) {
            let p = paper[x2 + ':' + y];
            //console.log(x2, y, p, x, y);
            if (p == '#') paper[x + ':' + y] = p;
            x2++;
        }
    }
}

function count(maxx = width, maxy = height) {
    let points = 0;
    for (let y = 0; y <= maxy; y++) {
        for (let x = 0; x <= maxx; x++) {
            if (paper[x + ':' + y] == '#') points++;
        }
    }
    return points;
}

function print(maxx = width, maxy = height) {
    for (let y = 0; y <= maxy; y++) {
        let line = '';
        for (let x = 0; x <= maxx; x++) {
            let e = paper[x + ':' + y];
            if (e == undefined) line += ' ';
            else line += e;
        }
        console.log(line);
    }
    console.log();
}