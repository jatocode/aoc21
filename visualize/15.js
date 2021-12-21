
async function day15() {
    let input = await (await fetch('../data/15-input.txt')).text();
    let lines = input.split(/\r?\n/);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let cavern = [];
    let map = [];
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        if (line.length == 0) continue;

        for (let x = 0; x < lines[0].length; x++) {
            const risk = line[x];
            cavern[x + ':' + y] = parseInt(risk);
        }
    };
    const [twidth, theight] = [lines[0].length, lines.length];
    const width = twidth * 5;
    const height = theight * 5;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let fx = x - (twidth) < 0 ? x : x - (twidth);
            let fy = y - (theight) < 0 ? y : y - (theight);

            let from = y < theight ? fx + ':' + y : x + ':' + fy;
            let to = x + ':' + y;

            let risk = cavern[from] + 1 > 9 ? 1 : cavern[from] + 1;

            if (x > (twidth - 1) || y > (theight - 1)) cavern[to] = risk;
        }
    }

    let leastcost = findpath('0:0');
    print(500, 500);

    console.log('Del 2:', leastcost);

    function findpath(pos) {
        let visited = new Set();
        let pq = new PriorityQueue();
        let camefrom = [];
        let cost = [];
        camefrom[pos] = '*';
        cost[pos] = 0;
        let goal = (width - 1) + ':' + (height - 1);

        console.log(goal, cavern[goal]);
        let current = pos;

        pq.enqueue(current, Infinity);
        while (pq.size() > 0) {
            current = pq.dequeue();
            if (visited.has(current)) continue;
            if (current == goal) {
                break;
            }

            let nbs = neighbours(current).filter(x => !visited.has(x));
            nbs.forEach(nb => {
                let c = cavern[nb] == undefined ? Infinity : cavern[nb];
                let nc = cost[current] + c;
                if (!cost[nb] || nc < cost[nb]) {
                    camefrom[nb] = current;
                    cost[nb] = nc;
                    pq.enqueue(nb, nc);
                }
            })
            visited.add(current);
        }

        //Skriv ut vägen för skojs skull
        let c = goal;
        let path = [];
        while (c != '0:0') {
            path.push(c)
            c = camefrom[c]
            map[c] = cavern[c]; //'*';
        }
        map[goal] = cavern[goal];
        path.push('0:0');
        path.reverse();

        console.log(path.length);
        return cost[goal];
    }

    function neighbours(pos) {
        const [x, y] = pos.split(':').map(x => parseInt(x));

        return [
            (x + 1) + ':' + y,
            x + ':' + (y + 1),
            (x - 1) + ':' + y,
            x + ':' + (y - 1),
        ];
    };

    function print(w = lines[0].length, h = lines.length) {
        //ctx.beginPath();
        //ctx.fillRect(100,100,1,1);
        //ctx.stroke();
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let e = cavern[x + ':' + y];
                ctx.fillStyle = 'rgb(' + Math.floor(255-20.5*e)+ ','+  Math.floor(255 - 42.5*e) + ',255)';
                ctx.beginPath();
                ctx.fillRect(x, y, 1, 1);
                ctx.stroke();

                if (map[x + ':' + y] != undefined) {
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(0,0,0)';
                    ctx.fillRect(x, y, 1, 1);
                    ctx.stroke();
                }


                //line += e == undefined ? '?' : e;
                //line += map[x + ':' + y] == undefined ? ' ' : '*';
            }
        }
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    size() {
        return this.values.length;
    }

    enqueue(value, priority) {
        let newNode = new Node(value, priority);
        this.values.push(newNode);

        let index = this.values.length - 1;
        const element = this.values[index];

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            const parent = this.values[parentIndex];

            if (element.priority >= parent.priority) break;
            this.values[parentIndex] = element;
            this.values[index] = parent;
            index = parentIndex;
        }
        return this.values;
    }

    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;

            let index = 0;
            const length = this.values.length;
            const element = this.values[0];

            while (true) {
                let leftIndex = 2 * index + 1;
                let rightIndex = 2 * index + 2;
                let leftChild, rightChild;
                let swap = null;

                if (leftIndex < length) {
                    leftChild = this.values[leftIndex];
                    if (leftChild.priority < element.priority) {
                        swap = leftIndex;
                    }
                }
                if (rightIndex < length) {
                    rightChild = this.values[rightIndex];
                    if ((swap === null && rightChild.priority < element.priority) || (swap !== null && rightChild.priority < leftChild.priority)) {
                        swap = rightIndex;
                    }
                }
                if (swap === null) break;
                this.values[index] = this.values[swap];
                this.values[swap] = element;
                index = swap;
            }
        }
        return min.value;
    }
}

class Node {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}


