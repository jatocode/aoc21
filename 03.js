const fs = require('fs');
const args = process.argv.slice(2);

const data = fs.readFileSync(args[0], 'utf8');
const lines = data.split('\n');

let count = countBits(lines);
let gamma, epsilon;
[gamma, epsilon] = gammaEpsilon(count);

console.log('Power consumption = ', parseInt(gamma, 2) * parseInt(epsilon, 2));

let oxy = oxygen([...lines], 0);
let co2r = co2([...lines], 0);
console.log('Oxygen generator rating', oxy);
console.log('CO2 scrubber rating', co2r);
console.log('Sub life support rating = ', oxy * co2r);

function countBits(numbers) {
    let count = [];
    numbers.forEach(x => {
        x.split('').forEach((bit, i) => {
            if (!count[i]) count[i] = { one: 0, zero: 0 };
            if (bit == '1') count[i].one += 1;
            if (bit == '0') count[i].zero += 1;
        });
    });
    return count;
}

function gammaEpsilon(count) {
    let gamma = '';
    let epsilon = '';
    count.forEach(c => {
        if (c.one >= c.zero) gamma += '1'; else gamma += '0';
        if (c.one < c.zero) epsilon += '1'; else epsilon += '0';
    });

    return [gamma, epsilon];
}

function oxygen(numbers, pos) {
    let count = countBits(numbers);
    gamma = gammaEpsilon(count)[0];

    numbers = numbers.filter(n => n[pos] == gamma[pos]);
    if (numbers.length == 1) {
        return parseInt(numbers[0], 2);
    }

    return oxygen(numbers, ++pos);
}

function co2(numbers, pos) {
    let count = countBits(numbers);
    epsilon = gammaEpsilon(count)[1];
    numbers = numbers.filter(n => n[pos] == epsilon[pos]);
    if (numbers.length == 1) {
        return parseInt(numbers[0], 2);
    }
    return co2(numbers, ++pos);
}