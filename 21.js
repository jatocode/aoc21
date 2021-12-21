const fs = require('fs');
const args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8');
const lines = input.split(/\r?\n/);

const startp1 = parseInt(lines[0].match(/.*starting position: (\d+).*/)[1]);
const startp2 = parseInt(lines[1].match(/.*starting position: (\d+).*/)[1]);


class Ddice {
    constructor(start, size = 100) {
        this.value = start;
        this.size = size;
        this._rolls = 0;
    }

    get roll3() {
        this._rolls += 3;
        let tot = ((this.value + 1) % this.size) +
            ((this.value + 2) % this.size) +
            ((this.value + 3) % this.size);

        this.debug = ((this.value + 1) % this.size) + ' + ' +
            ((this.value + 2) % this.size) + ' + ' +
            ((this.value + 3) % this.size);

        this.value = (this.value + 3) % this.size;
        //console.log(this.value, tot);
        return [this.value, tot, this.debug];
    }

    get rolls() {
        return this._rolls;
    }

}

let g1 = play();
console.log('Del 1:', g1[0] * g1[1]);

function play() {
    const dice = new Ddice(0);
    let [p1p, p1s] = [startp1, 0];
    let [p2p, p2s] = [startp2, 0];
    let player = 0;
    while (true) {
        if (player++ % 2 == 0) {
            let p1roll = dice.roll3;
            p1p = ((p1p - 1 + p1roll[1]) % 10) + 1;
            p1s += p1p;

            // console.log('Player 1 rolls ', p1roll[2], `moves to space`, p1p, 'total score of', p1s);

            if (p1s > 999) {
                console.log('p1 wins', p2s);
                return [p2s, dice.rolls];
            }
        } else {
            let p2roll = dice.roll3;
            p2p = ((p2p - 1 + p2roll[1]) % 10) + 1;
            p2s += p2p;

            //  console.log('Player 2 rolls ', p2roll[2], `moves to space`, p2p, 'total score of', p2s);

            if (p2s > 999) {
                console.log('p2 wins', p1s);
                return [p1s, dice.rolls];
            }
        }

    }
}