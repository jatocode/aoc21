const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);
const left = "([{<";
const right = ")]}>";

let errors = [];

//findCorrupt(lines[2]);

lines.forEach(line => {
    errors.push(findCorrupt(line));
});

let score = 0;
//console.log(errors);
errors.forEach(e => {
    if (e.length > 0) {
        let scores = [3, 57, 1197, 25137];
        let c = e[0];
        //console.log(e[0], scores[right.indexOf(e[0])]);
        score += scores[right.indexOf(c)];
    }
})

console.log('Del 1:', score);

function findCorrupt(line) {
    let errors = [];
    let stack = [];

    for (let i = 0; i < line.length; i++) {
        const c = line[i];

        if (matchLeft(c) > 0) {
            // vi har en öppning, lägg matchande på stacken
            let closer = right[left.indexOf(c)];
            stack.push(closer);
            console.log(stack.join(' '));
        }
        if (matchRight(c) > 0) {
            let last = stack[stack.length - 1];
            if (c == last) {
                stack.pop();
                console.log(stack.join(' '));
            } else {
                console.log('found',c,'expected',last);
                errors.push(c);
                break;
            }
        }
    }

    console.log('unclosed', stack.join(' '));

    // if (errors.length > 0) {
    //     console.log('--', errors);
    // }
    return errors;
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
