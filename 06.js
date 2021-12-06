const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
const fish = input.split(',').map(x => parseInt(x));

let school = [...fish];
let days = 80;

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

console.log('Del 1 efter', days, 'dagar, totalt:', school.length);

// Del 2, vi gör om...fick tänka en hel del
// Räknar hur många som är i varje timer/cykel istället för totalt
let cycle = [0, 0, 0, 0, 0, 0, 0, 0, 0];
fish.forEach(age => cycle[age] += 1);

days = 256;
for (let day = 0; day < days; day++) {
    // Plocka ut de som ska göra nya fiskar, rotera allt ett steg
    const [newFish, ...fishCycle] = cycle;
    
    // Lägg de sist
    cycle = [...fishCycle, newFish];

    // Öka antalet som har timer 6 med lika många som ska bli nya
    cycle[6] += newFish;
}

let fiskar = cycle.reduce((a, fish) => a + fish);
console.log('Del 2 efter', days, 'dagar, totalt:', fiskar);
