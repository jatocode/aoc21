const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
let lines = input.split(/\r?\n/);

let [one, seven, four, eight] = [0, 0, 0, 0];
let del2 = 0;

lines.forEach(l => {
    const [pattern, output] = l.split('|').map(x => x.split(' ').filter(x => x.length > 0));

    let display = '';
    let dictionary = rosetta(pattern);

    output.forEach(o => {
        // Del 1
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
            case 7: // 8
                eight++;
                break;
        }

        // Del 2
        display += findDigit(o, dictionary);
    });

    del2 += parseInt(display);
});

console.log('Del 1:', one + seven + four + eight);
console.log('Del 2:', del2);

function findDigit(scrambled, dictionary) {
    let sorted = scrambled.split('').sort().join('');

    return dictionary.findIndex(x => x == sorted) + '';
}

function rosetta(pattern) {
    let chars = Array(10).fill([]);

    // Hitta alla siffrorna
    while(chars.filter(x => x.length > 0).length < 10) {
        pattern.forEach(p => {
            switch(p.length) {
                case 2: // 1
                    chars[1] = p;
                    break;
                case 4: // 4
                    chars[4] = p;
                    break;
                case 3: // 7
                    chars[7] = p;
                    break;
                case 7: // 8
                    chars[8] = p;
                    break;
                case 6: // 0, 6, 9
                    // 6 får bara ha en del av nummer 1
                    if (chars[1] && (!p.includes(chars[1][0]) || !p.includes(chars[1][1]))) {
                        chars[6] = p;
                    } else {
                        // Det är 0 eller 9, men 9:an innehåller hela 4
                        if (chars[4].length > 0) {
                            let t = chars[4].split('').filter(x => !p.includes(x));
                            if (t.length == 0) {
                                // Det är 9
                                chars[9] = p;
                            } else {
                                // Då är det 0
                                chars[0] = p;
                            }
                        }
                    }
                    break;
                case 5: // 2, 3, 5
                    // 3 innehåller båda från 1
                    if (chars[1] && (p.includes(chars[1][0]) && p.includes(chars[1][1]))) {
                        chars[3] = p;
                    } else {
                        if (chars[6].length > 0) {
                            let t = chars[6].split('').filter(x => !p.includes(x));
                            if (t.length == 1) {
                                // 5 är nästan 6
                                chars[5] = p;
                            } else {
                                chars[2] = p;
                            }
                        }
                    }
                    break;
            }
        });
    }
    // Sortera för att jämföra
    chars = chars.map(x => x.split('').sort().join(''));
    
    return chars;
}