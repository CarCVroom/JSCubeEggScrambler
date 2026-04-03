import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { wait } from "./utils.js"

let movesOutside = []

export async function parserAndRunnerVisual(str) {
        movesOutside = []; // Clears it

        let m = "";
        let num = 0;
        let moves = str.split(" ");
        console.log(moves)
        for(let i = 0; i < moves.length; i++) {
                let move = moves[i].trim();
                if (move.length > 1) {
                        m = move.substring(0,1);
                        const n = move.substring(1);

                        if (n === "2" ) {
                                num = 2;
                        } else if (n === "'") {
                                num = 3;
                        } else {
                                num = 1;
                        }
                } else if (move.length === 1) {
                        m = move
                        num = 1;
                }
                const currentNum = num;
                switch (m) {
                        case "R":
                                movesOutside.push(() => R(currentNum));
                                break;
                        case "L":
                                movesOutside.push(() => L(currentNum));
                                break;
                        case "U":
                                movesOutside.push(() => U(currentNum));
                                break;
                        case "D":
                                movesOutside.push(() => D(currentNum));
                                break;
                        case "B":
                                movesOutside.push(() => B(currentNum));
                                break;
                        case "F":
                                movesOutside.push(() => F(currentNum));
                                break;
                        case "r":
                                movesOutside.push(() => r(currentNum));
                                break;
                        case "l":
                                movesOutside.push(() => l(currentNum));
                                break;
                        case "f":
                                movesOutside.push(() => f(currentNum));
                                break;
                        case "b":
                                movesOutside.push(() => b(currentNum));
                                break;
                        case "u":
                                movesOutside.push(() => u(currentNum));
                                break;
                        case "d":
                                movesOutside.push(() => d(currentNum));
                                break;
                        case "M":
                                movesOutside.push(() => M(currentNum));
                                break;
                        case "S":
                                movesOutside.push(() => S(currentNum));
                                break;
                        case "E":
                                movesOutside.push(() => E(currentNum));
                                break;
                        case "x":
                                movesOutside.push(() => x(currentNum));
                                break;
                        case "y":
                                movesOutside.push(() => y(currentNum));
                                break;
                        case "z":
                                movesOutside.push(() => z(currentNum));
                                break;
                        default:
                                break;
                }
        }
        console.log(movesOutside);
}

export async function runTheBitch(time) { 
        for(const fn of movesOutside) {
                fn();
                await wait(time);
        }
}

// Makes an array of all the function calls and then the wait function after
// Then it calls them and that would maybe make this faster then looping whrought all of that for everytime
// So it's slow once, but faster after all times.