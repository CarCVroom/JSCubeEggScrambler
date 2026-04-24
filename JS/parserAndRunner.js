import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { wait } from "./utils.js"
import { scrambleMovesReverse, solutionMovesReverse } from "./input.js"

let movesScramble = [];
let movesSolution = [];

export { movesScramble, movesSolution };

export async function parserVisual(str, scramOrNot) { // true for scramble, false for soltuion

        const targetArray = scramOrNot ? movesScramble : movesSolution;

        targetArray.length = 0;

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
                let fn;
                switch (m) {
                        case "R":
                                fn = () => R(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "R";
                                targetArray.push(fn);
                                break;
                        case "L":
                                fn = () => L(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "L";
                                targetArray.push(fn);
                                break;
                        case "U":
                                fn = () => U(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "U";
                                targetArray.push(fn);
                                break;
                        case "D":
                                fn = () => D(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "D";
                                targetArray.push(fn);
                                break;
                        case "B":
                                fn = () => B(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "B";
                                targetArray.push(fn);
                                break;
                        case "F":
                                fn = () => F(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "F";
                                targetArray.push(fn);
                                break;
                        case "r":
                                fn = () => r(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "r";
                                targetArray.push(fn);
                                break;
                        case "l":
                                fn = () => l(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "l";
                                targetArray.push(fn);
                                break;
                        case "f":
                                fn = () => f(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "f";
                                targetArray.push(fn);
                                break;
                        case "b":
                                fn = () => b(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "b";
                                targetArray.push(fn);
                                break;
                        case "u":
                                fn = () => u(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "u";
                                targetArray.push(fn);
                                break;
                        case "d":
                                fn = () => d(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "d";
                                targetArray.push(fn);
                                break;
                        case "M":
                                fn = () => M(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "M";
                                targetArray.push(fn);
                                break;
                        case "S":
                                fn = () => S(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "S";
                                targetArray.push(fn);
                                break;
                        case "E":
                                fn = () => E(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "E";
                                targetArray.push(fn);
                                break;
                        case "x":
                                fn = () => x(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "x";
                                targetArray.push(fn);
                                break;
                        case "y":
                                fn = () => y(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "y";
                                targetArray.push(fn);
                        case "z":
                                fn = () => z(currentNum);
                                fn.firstParam = currentNum;
                                fn.moveName = "z";
                                targetArray.push(fn);
                                break;
                        default:
                                break;
                }
        }
}

//#####################################################################################################################################################################################################################################################

export async function runTheBitch(time, scramOrNot) { 

        const targetArray = scramOrNot ? movesScramble : movesSolution;

        

        for(const fn of targetArray) {
                fn();
                if (!scramOrNot) { await wait(time); }
                //
                  // NOTE the await wait(time); limits the tps to ca 63 tps, I will add it to the solution one, not the scrabmle one as they will be the same otherwise
                // 
        }
        renderer.render(scene, camera)
}

//#####################################################################################################################################################################################################################################################

export async function reverseMovesRun(scramOrNot) {

        const targetArray = scramOrNot ? scrambleMovesReverse : solutionMovesReverse;

        for(const fn of targetArray) {
                fn(); // Runs the ones without a stop between 
                      // , and also with a diffrent arrays.
        }

}

// Makes an array of all the function calls and then the wait function after
// Then it calls them and that would maybe make this faster then looping whrought all of that for everytime
// So it's slow once, but faster after all times.