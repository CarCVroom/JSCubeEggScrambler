import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { wait } from "./utils.js"

let movesScramble = [];
let movesSolution = [];

export async function parserAndRunnerVisual(str, scramOrNot) { // true for scramble, false for soltuion
        movesScramble = []; // Clears it
        movesSolution = [];

        const targetArray = scramOrNot ? movesScramble : movesSolution;

        let m = "";
        let num = 0;
        let moves = str.split(" ");
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
                                targetArray.push(() => R(currentNum));
                                break;
                        case "L":
                                targetArray.push(() => L(currentNum));
                                break;
                        case "U":
                                targetArray.push(() => U(currentNum));
                                break;
                        case "D":
                                targetArray.push(() => D(currentNum));
                                break;
                        case "B":
                                targetArray.push(() => B(currentNum));
                                break;
                        case "F":
                                targetArray.push(() => F(currentNum));
                                break;
                        case "r":
                                targetArray.push(() => r(currentNum));
                                break;
                        case "l":
                                targetArray.push(() => l(currentNum));
                                break;
                        case "f":
                                targetArray.push(() => f(currentNum));
                                break;
                        case "b":
                                targetArray.push(() => b(currentNum));
                                break;
                        case "u":
                                targetArray.push(() => u(currentNum));
                                break;
                        case "d":
                                targetArray.push(() => d(currentNum));
                                break;
                        case "M":
                                targetArray.push(() => M(currentNum));
                                break;
                        case "S":
                                targetArray.push(() => S(currentNum));
                                break;
                        case "E":
                                targetArray.push(() => E(currentNum));
                                break;
                        case "x":
                                targetArray.push(() => x(currentNum));
                                break;
                        case "y":
                                targetArray.push(() => y(currentNum));
                                break;
                        case "z":
                                targetArray.push(() => z(currentNum));
                                break;
                        default:
                                break;
                }
        }
}

export async function runTheBitch(time, scramOrNot) { 

        const targetArray = scramOrNot ? movesScramble : movesSolution;

        for(const fn of targetArray) {
                fn();
                //await wait(time);  
                //
                  // NOTE the await wait(time); limits the tps to ca 63 tps, I will add it to the solution one, not the scrabmle one as they will be the same otherwise
                // 
        }
        renderer.render(scene, camera)
}

// Makes an array of all the function calls and then the wait function after
// Then it calls them and that would maybe make this faster then looping whrought all of that for everytime
// So it's slow once, but faster after all times.