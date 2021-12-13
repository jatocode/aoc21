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
        const [_, x, y] = line.match(/(\d+),(\d+)/).map(x => parseInt(x));
        paper[x + ':' + y] = true;
        height++;
        width = x > width ? x : width;
    }
};

// Fold 
foldit();
print();

function foldit(numfolds = folds.length) {
    for (let f = 0; f < numfolds; f++) {
        const fold = folds[f];
        switch (fold[0]) {
            case 'x':
                console.log('Folding left', fold[1]);
                foldleft(fold[1]);
                width = fold[1] - 1;
                break;
            case 'y':
                console.log('Folding up', fold[1]);
                foldup(fold[1]);
                height = fold[1] - 1;
                break;
        }
        console.log('Visible after',f+1,'folds:', count());
    }
}

function foldup(amount) {
    for (let y = 2 * amount; y > amount; y--) {
        for (let x = 0; x <= width; x++) {
            paper[x + ':' + (2*amount - y)] = paper[x + ':' + (2*amount - y)] || paper[x + ':' + y];
        }
    }
}

function foldleft(amount) {
    for (let y = 0; y <= height; y++) {
        for (let x = 2 * amount; x > amount; x--) {
            paper[(2*amount - x) + ':' + y] = paper[(2*amount - x) + ':' + y] || paper[x + ':' + y];
        }
    }
}

function count(maxx = width, maxy = height) {
    let points = 0;
    for (let y = 0; y <= maxy; y++) {
        for (let x = 0; x <= maxx; x++) {
            if (paper[x + ':' + y]) points++;
        }
    }
    return points;
}

function print(maxx = width, maxy = height) {
    for (let y = 0; y <=maxy; y++) {
        let line = '';
        for (let x = 0; x < maxx; x++) {
            if (paper[x + ':' + y] == undefined) line += '.';
            else line += '█';
        }
        line += '';
        console.log(line);
    }
    console.log();
}