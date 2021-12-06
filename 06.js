const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
const fish = input.split(',').map(x => parseInt(x));

let school = [...fish];
let days = 80;

let start = Date.now();

// Dek 1, simulerar varje fisk för sig
for (let day = 1; day <= days; day++) {
    let newfish = 0;
    let newschool = [];
    school.forEach(f => {
        if (f == 0) {
            newfish++;
            f = 7;
        }
        f--;
        newschool.push(f);
    });
    for (let i = 0; i < newfish; i++) {
        newschool.push(8);
    }
    school = [...newschool];
}

console.log('Del 1 efter', days, 'dagar, totalt:', school.length, ', time to calc:',Date.now() - start, 'ms');

// Del 2, vi gör om...fick tänka en hel del

start = Date.now();
// Räknar hur många som är i varje timer/cykel istället för att hålla koll på fiskarna
let lanterns = [0, 0, 0, 0, 0, 0, 0, 0, 0];
fish.forEach(timer => lanterns[timer] += 1);

days = 256;
for (let day = 0; day < days; day++) {
    // Plocka ut de som ska göra nya fiskar, rotera allt ett steg
    const [created, ...restCycle] = lanterns;
    
    // Lägg de sist
    lanterns = [...restCycle, created];

    // Öka antalet som har timer 6 med lika många som ska bli nya
    lanterns[6] += created;
}

let antalfisk = lanterns.reduce((a, fish) => a + fish);
console.log('Del 2 efter', days, 'dagar, totalt:', antalfisk, ', time to calc:',Date.now() - start, 'ms');
