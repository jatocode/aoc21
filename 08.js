const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let entrys = [];
let [one, seven, four, eight] = [0, 0, 0, 0];

lines.forEach(l => {
    const [pattern, output] = l.split('|').map(x => x.split(' ').filter(x => x.length > 0));
    //console.log(pattern, output);
    output.forEach((o, i) => {
        switch (o.length) {
            case 2: // 1
                one++;
                break;
            case 3: // 7
                seven++;
                break;
            case 4: // 4
                four++;
                break;
            case 5: // 2, 3, 5
                break;
            case 6: // 0, 6, 9
                break;
            case 7: // 8
                eight++;
                break;
            default:
                break;
        }
    })

    entrys.push([pattern, output]);
});

console.log('Del 1:', one + seven + four + eight);

