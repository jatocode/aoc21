const { on } = require('events');
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
dfs('start',[],paths, (c,p) => part1Rule(c,p));
console.log('Del 1, antal vägar', paths.length);

paths = [];
dfs('start',[],paths, (c,p) => part2Rule(c,p));
//console.table(paths);
console.log('Del 2, antal vägar', paths.length);

function dfs(currcave, path, paths, rule) {

    if(rule(currcave, path)) {
        return;
    }

    if(currcave == 'end') {
        let np = [...path];
        np.push(currcave);
        paths.push(np);
        return;
    }
    let connections = caves[currcave];

    connections.forEach(c => {    
        let np = [...path];
        np.push(currcave);
        dfs(c, np, paths, rule);
    });
}

function part1Rule(cave, path) {
    let visits = path.filter(c => c == cave).length;
    return cave == cave.toLowerCase() && visits >= 1;
}

function part2Rule(cave, path) {
    if(cave == cave.toLowerCase()) {
        if(cave == 'start' && path.includes(cave)) return true;
        let smvisits = path.filter(c => c == c.toLowerCase() && c != 'start' && c != 'end');
        //console.log(path,cave, smvisits);
        let small = [];

        // [ 'start', 'b', 'A', 'b', 'A' ] c [ 'b', 'b' ]
        // [ b: 2 ] true

        let once = 0;
        smvisits.forEach(c => {
            if(!small[c]) small[c] = 0;
            small[c]++;
            if(small[c] > 1) once++;
        });
        //console.log(small, once);
        return once > 1;
    } 
    return false;
}