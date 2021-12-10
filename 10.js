const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);
const left = "([{<";
const right = ")]}>";

let errors = [];
let incomplete = [];

//findCorrupt(lines[2]);

lines.forEach(line => {
    let [err, incl] = findCorrupt(line);
    errors.push(err);
    incomplete.push(incl);
});

let score = 0;
//console.log(errors);
errors.forEach(e => {
    const scores = [3, 57, 1197, 25137];
    if (e.length > 0) {
        score += scores[right.indexOf(e)];
    } 
})

console.log('Del 1:', score);

let compscores = [];
incomplete.forEach(ic => {
    const scores = [1, 2, 3, 4];
    score = 0;
    if (ic.length > 0) {
        ic.forEach(c => {
            score *= 5;
            score += scores[right.indexOf(c)];
        });
        compscores.push(score);
    }
});

compscores.sort((a,b) => a-b);
let median = compscores[Math.floor(compscores.length/2)];
console.log('Del 2:', median);

function findCorrupt(line) {
    let errors = [];
    let stack = [];
    let incomplete = [];

    for (let i = 0; i < line.length; i++) {
        const c = line[i];

        if (matchLeft(c) > 0) {
            // vi har en öppning, lägg matchande på stacken
            let closer = right[left.indexOf(c)];
            stack.push(closer);
            //  console.log(stack.join(' '));
        }
        if (matchRight(c) > 0) {
            let last = stack[stack.length - 1];
            if (c == last) {
                stack.pop();
                //      console.log(stack.join(' '));
            } else {
                //      console.log('found',c,'expected',last);
                errors = c;
                break;
            }
        }

        if (i == line.length - 1) {
            console.log('unclosed at end', stack.join(''), 'to close', stack.reverse().join(''));
            incomplete = stack;
        }
    }

    return [errors, incomplete];
}

function matchRight(c) {
    switch (c) {
        case ')': return 1;
        case ']': return 2;
        case '}': return 3;
        case '>': return 4;
        default: return 0;
    }
}

function matchLeft(c) {
    switch (c) {
        case '(': return 1;
        case '[': return 2;
        case '{': return 3;
        case '<': return 4;
        default: return 0;
    }
}
