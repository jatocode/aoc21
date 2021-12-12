const { on } = require('events');
const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let caves = [];
let small = [];
lines.forEach(line => {
    const [_, a, b] = line.match(/([a-zA-Z]+)-([a-zA-Z]+)/);
    if (caves[a] == undefined) caves[a] = [];
    if (caves[b] == undefined) caves[b] = [];
    caves[b].push(a);
    caves[a].push(b);

    if (a == a.toLowerCase()) small[a] = 0;
    if (b == b.toLowerCase()) small[b] = 0;
});

let paths = [];
dfs('start', [], paths, (c, p) => part1Rule(c, p));
console.log('Del 1, antal vägar', paths.length);

paths = [];
dfs('start', [], paths, (c, p) => part2Rule(c, p));
console.log('Del 2, antal vägar', paths.length);

function dfs(currcave, path, paths, rule) {

    if (rule(currcave, path)) {
        // Don't go down this road
        return;
    }

    // concat istället för push, vill inte peta på samma path objekt, behöver ett nytt
    if (currcave == 'end') {
        let newp = path.concat(currcave);
        paths.push(newp);
        return;
    }
    let connections = caves[currcave];

    connections.forEach(c => {
        let newp = path.concat(currcave);
        dfs(c, newp, paths, rule);
    });
}

function part1Rule(cave, path) {
    let visits = path.filter(c => c == cave).length;
    return cave == cave.toLowerCase() && visits >= 1;
}

function part2Rule(cave, path) {
    if (cave == 'start' && path.includes(cave)) return true;

    let smvisits = path.filter(c => c == c.toLowerCase());
    // Antal unika små
    let uq = [...new Set(smvisits)];

    // Är antalet 2 mer än unika så har vi försökt gå in i två smågrottor två gånger
    return (smvisits.length - uq.length) > 1
}