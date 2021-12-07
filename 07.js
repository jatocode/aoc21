const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
const crabs = input.split(',').map(x => parseInt(x));

var maxpos = Math.max(...crabs) + 1;

let bestPos = Number.MAX_SAFE_INTEGER;
let bestTot = Number.MAX_SAFE_INTEGER;
for (let search = 0; search < maxpos; search++) {
    let tot = 0;

    crabs.forEach(crab => {
        let steps = Math.abs(crab - search);// bfs(crab, search);
        let cost = 0;

        // Orkar inte göra det snyggare
        for (let i = 0; i < steps; i++) {
            cost += i+1;
        }
        tot += cost;
    });
    if(tot < bestTot) {
        bestPos = search;
        bestTot = tot;
    }
}

console.log('Del 1', bestPos, bestTot);
