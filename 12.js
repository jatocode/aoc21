const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let caves = [];
let small = [];
lines.forEach(line => {
    const [_, a,b] = line.match(/([a-zA-Z]+)-([a-zA-Z]+)/);
    if(caves[a] == undefined) caves[a] = [];
    if(caves[b] == undefined) caves[b] = [];
    caves[b].push(a);
    caves[a].push(b);

    if(a == a.toLowerCase()) small[a] = 0;
    if(b == b.toLowerCase()) small[b] = 0;
});

let paths = [];
dfs('start',[],paths);

console.log('Del 1, antal vägar', paths.length);

function dfs(currcave, path, paths) {
    let connections = caves[currcave];

    let visits = path.filter(c => c == currcave).length;
    if(smallCave(currcave) && visits >= 1) {
        return;
    }

    if(currcave == 'end') {
        let np = [...path];
        np.push(currcave);
        paths.push(np);
        return;
    }

    connections.forEach(c => {    
        let np = [...path];
        np.push(currcave);
        dfs(c, np, paths);
    });
}

function smallCave(cave) {
    return cave == cave.toLowerCase();
}
