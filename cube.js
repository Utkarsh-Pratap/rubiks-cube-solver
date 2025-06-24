class RubiksCube {
    constructor() {
        this.faces = {
            U: Array(9).fill('w'),
            D: Array(9).fill('y'),
            F: Array(9).fill('g'),
            B: Array(9).fill('b'),
            L: Array(9).fill('o'),
            R: Array(9).fill('r'),
        };
        this.moveHistory = [];
    }

    getStateString() {
        return (
            this.faces.U.join('') +
            this.faces.R.join('') +
            this.faces.F.join('') +
            this.faces.D.join('') +
            this.faces.L.join('') +
            this.faces.B.join('')
        );
    }

    display() {
        const svg = getCubeSvg(this.getStateString());
        document.getElementById("cubeContainer").innerHTML = svg;
    }

    rotateFaceMatrix(face, clockwise = true) {
        const old = [...this.faces[face]];

        const rotateMap = clockwise
            ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
            : [2, 5, 8, 1, 4, 7, 0, 3, 6];

        for (let i = 0; i < 9; i++) {
            this.faces[face][i] = old[rotateMap[i]];
        }
    }

    rotateFace(face, clockwise = true) {
        this.rotateFaceMatrix(face, clockwise);

        const U = this.faces.U;
        const D = this.faces.D;
        const F = this.faces.F;
        const B = this.faces.B;
        const L = this.faces.L;
        const R = this.faces.R;

        const rotate = (arr, idxs, vals) => {
            for (let i = 0; i < 3; i++) {
                arr[idxs[i]] = vals[i];
            }
        };

        const get = (arr, idxs) => idxs.map(i => arr[i]);

        let temp;

        if (face === 'F') {
            if (clockwise) {
                temp = get(U, [6, 7, 8]);
                rotate(U, [6, 7, 8], get(L, [8, 5, 2]));
                rotate(L, [8, 5, 2], get(D, [2, 1, 0]));
                rotate(D, [2, 1, 0], get(R, [0, 3, 6]));
                rotate(R, [0, 3, 6], temp);
            } else {
                temp = get(U, [6, 7, 8]);
                rotate(U, [6, 7, 8], get(R, [0, 3, 6]));
                rotate(R, [0, 3, 6], get(D, [2, 1, 0]));
                rotate(D, [2, 1, 0], get(L, [8, 5, 2]));
                rotate(L, [8, 5, 2], temp);
            }
        }

        else if (face === 'R') {
            if (clockwise) {
                temp = get(U, [8, 5, 2]);
                rotate(U, [8, 5, 2], get(F, [8, 5, 2]));
                rotate(F, [8, 5, 2], get(D, [8, 5, 2]));
                rotate(D, [8, 5, 2], get(B, [0, 3, 6]).reverse());
                rotate(B, [0, 3, 6], temp.reverse());
            } else {
                temp = get(U, [8, 5, 2]);
                rotate(U, [8, 5, 2], get(B, [0, 3, 6]).reverse());
                rotate(B, [0, 3, 6], get(D, [8, 5, 2]).reverse());
                rotate(D, [8, 5, 2], get(F, [8, 5, 2]));
                rotate(F, [8, 5, 2], temp);
            }
        }

        else if (face === 'L') {
            if (clockwise) {
                temp = get(U, [0, 3, 6]);
                rotate(U, [0, 3, 6], get(B, [8, 5, 2]).reverse());
                rotate(B, [8, 5, 2], get(D, [0, 3, 6]).reverse());
                rotate(D, [0, 3, 6], get(F, [0, 3, 6]));
                rotate(F, [0, 3, 6], temp);
            } else {
                temp = get(U, [0, 3, 6]);
                rotate(U, [0, 3, 6], get(F, [0, 3, 6]));
                rotate(F, [0, 3, 6], get(D, [0, 3, 6]));
                rotate(D, [0, 3, 6], get(B, [8, 5, 2]).reverse());
                rotate(B, [8, 5, 2], temp.reverse());
            }
        }

        else if (face === 'U') {
            if (clockwise) {
                temp = get(B, [0, 1, 2]);
                rotate(B, [0, 1, 2], get(R, [0, 1, 2]));
                rotate(R, [0, 1, 2], get(F, [0, 1, 2]));
                rotate(F, [0, 1, 2], get(L, [0, 1, 2]));
                rotate(L, [0, 1, 2], temp);
            } else {
                temp = get(B, [0, 1, 2]);
                rotate(B, [0, 1, 2], get(L, [0, 1, 2]));
                rotate(L, [0, 1, 2], get(F, [0, 1, 2]));
                rotate(F, [0, 1, 2], get(R, [0, 1, 2]));
                rotate(R, [0, 1, 2], temp);
            }
        }

        else if (face === 'D') {
            if (clockwise) {
                temp = get(B, [6, 7, 8]);
                rotate(B, [6, 7, 8], get(L, [6, 7, 8]));
                rotate(L, [6, 7, 8], get(F, [6, 7, 8]));
                rotate(F, [6, 7, 8], get(R, [6, 7, 8]));
                rotate(R, [6, 7, 8], temp);
            } else {
                temp = get(B, [6, 7, 8]);
                rotate(B, [6, 7, 8], get(R, [6, 7, 8]));
                rotate(R, [6, 7, 8], get(F, [6, 7, 8]));
                rotate(F, [6, 7, 8], get(L, [6, 7, 8]));
                rotate(L, [6, 7, 8], temp);
            }
        }

        else if (face === 'B') {
            if (clockwise) {
                temp = get(U, [0, 1, 2]);
                rotate(U, [0, 1, 2], get(R, [2, 5, 8]));
                rotate(R, [2, 5, 8], get(D, [6, 7, 8]));
                rotate(D, [6, 7, 8], get(L, [6, 3, 0]));
                rotate(L, [6, 3, 0], temp);
            } else {
                temp = get(U, [0, 1, 2]);
                rotate(U, [0, 1, 2], get(L, [6, 3, 0]));
                rotate(L, [6, 3, 0], get(D, [6, 7, 8]));
                rotate(D, [6, 7, 8], get(R, [2, 5, 8]));
                rotate(R, [2, 5, 8], temp);
            }
        }

        this.moveHistory.push(clockwise ? face : face + "'");
        this.display();
    }


}

// Global cube instance
const cube = new RubiksCube();
cube.display();

// Placeholder function for rendering — use provided in real test
function getCubeSvg(stateString) {
    return `<pre>${stateString}</pre>`; // for now, text display
}

// Button functions
function scrambleCube() {
  const moves = ['F', 'R', 'L', 'U', 'D', 'B'];
  const count = 20;

  cube.moveHistory = [];

  for (let i = 0; i < count; i++) {
    const face = moves[Math.floor(Math.random() * moves.length)];
    const clockwise = Math.random() > 0.5;

    cube.rotateFace(face, clockwise);
  }

  console.log("Scramble done:", cube.moveHistory.join(' '));
}



function solveCube() {
    if (cube.moveHistory.length === 0) {
        alert("Cube is already solved or not scrambled yet.");
        return;
    }

    const solutionMoves = [...cube.moveHistory].reverse().map(invertMove);

    console.log("Solving using:", solutionMoves.join(" "));

    let i = 0;
    const interval = setInterval(() => {
        if (i >= solutionMoves.length) {
            clearInterval(interval);
            alert("Cube solved (logically)!");
            return;
        }

        const move = solutionMoves[i];
        const face = move[0];
        const clockwise = !move.endsWith("'");

        cube.rotateFace(face, clockwise);
        i++;
    }, 300); // 1 move every 300ms
}


function resetCube() {
    const newCube = new RubiksCube();
    Object.assign(cube, newCube);
    cube.display();
}

function testRotate() {
    cube.rotateFace('F', true);
    console.log("Cube Roated...");
    // Front face clockwise
}

function invertMove(move) {
    return move.endsWith("'") ? move[0] : move + "'";
}
