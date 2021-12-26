async function day25() {

    let input = await (await fetch('../data/25-input.txt')).text();
    let lines = input.split(/\r?\n/);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(2.5,2.5);

    let east = new Set();
    let south = new Set();
    lines.forEach((line, y) => {
        line.split('').forEach((c, x) => {
            if (c == '>') east.add(x + ',' + y, '>');
            if (c == 'v') south.add(x + ',' + y, '>');
        })
    })

    let height = lines.length;
    let width = lines[0].length;

    let move = 1;
    let step = 0;

    setInterval(() => {
        tick();
      }, 10);

    function tick() {
        move = 0;
        move += moveherd(east, eastnext);
        move += moveherd(south, southnext);
        step++;
        window.requestAnimationFrame(print);
    }


    function moveherd(herd, check) {
        let move = [];
        [...herd].forEach(c => {
            let next = check(c);
            if (!east.has(next) && !south.has(next)) {
                move.push([c, next]);
            };
        });

        move.forEach(m => {
            herd.delete(m[0])
            herd.add(m[1]);
        })

        return move.length;
    }

    function eastnext(pos) {
        const [x, y] = pos.split(',').map(x => parseInt(x));
        return (x + 1) % width + ',' + y;
    }

    function southnext(pos) {
        const [x, y] = pos.split(',').map(x => parseInt(x));
        return x + ',' + (y + 1) % height;
    }

    function print() {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (east.has(x + ',' + y)) point(x, y, 'rgb(0,255,0)')
                else if (south.has(x + ',' + y)) point(x, y, 'rgb(255,0,0)')
                else point(x, y, 'rgb(0,0,0)')
            }
        }
    }

    function point(x, y, col) {
        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.fillRect(x, y, 1, 1);
        ctx.stroke();
    }
}
