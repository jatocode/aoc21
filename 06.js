const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
const fish = input.split(',').map(x => parseInt(x));

let school = [...fish];
const days = 80;

for (let day = 1; day <= days; day++) {
    let newfish = 0;
    let newschool = [];
    school.forEach(f => {
        if(f == 0) {
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
    // console.log('After ', day, 'days :', school);
}

console.log('After', days,'its total ', school.length);

