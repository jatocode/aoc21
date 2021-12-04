const fs = require('fs');
const args = process.argv.slice(2);

const data = fs.readFileSync(args[0], 'utf8');
const lines = data.split('\n').map(x => x.trim()); // trim pga fick strul med \r

const numbers = lines[0].split(',').map(x => parseInt(x));

let brickor = [];
for (let b = 2; b < lines.length; b += 6) {
    let bricka = [];
    for (let i = 0; i < 5; i++) {
        const row = lines[b + i].split(/\s+/).map(x => parseInt(x));
        bricka[i] = [...row];
    }
    brickor.push(bricka);
}

let winners = loket();
console.log('Del 1', winners[0]);
console.log('Del 2', winners.pop());


function loket() {
    let winrow = [];
    let wincol = [];
    let bres = [];
    let winbricks = [];
    let winbricknums = [];
    for (let ni = 0; ni < numbers.length; ni++) {
        const n = numbers[ni];
        for (let bi = 0; bi < brickor.length; bi++) {
            if(winbricknums.includes(bi)) continue;
            const bricka = brickor[bi];
            if(!bres[bi]) bres[bi] = [new Set(), new Set()];
            for (let row = 0; row < 5; row++) {
                for (let i = 0; i < bricka[row].length; i++) {
                    const b = bricka[row][i];
                    bres[bi][1].add(b);
                    if (b == n) {
                        if (!winrow[bi + ',' + row]) winrow[bi + ',' + row] = 0;
                        if (!wincol[bi + ',' + i]) wincol[bi + ',' + i] = 0;
                        winrow[bi + ',' + row]++;
                        wincol[bi + ',' + i]++;

                        bres[bi][0].add(b);
                        if (winrow[bi + ',' + row] == 5 || wincol[bi + ',' + i] == 5) {
                            // Remove winners 
                            bres[bi][0].forEach(x => bres[bi][1].delete(x));
                            let sum = [...bres[bi][1]].reduce((t,c) => t + c);
                            winbricks.push([bi, n*sum])
                            winbricknums.push(bi);
                        }
                    } 
                } 
            }
        }
    }
    return winbricks;
}