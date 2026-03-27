import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { wait } from "./utils.js"


export async function parser(str, time) {
        let m = "";
        let num = 0;
        let moves = str.split(" ");
        console.log(moves)
        for(let i = 0; i < moves.length; i++) {
                let move = moves[i].trim();
                if (move.length > 1) {
                        m = move.substring(0, 1);
                        let n = move.substring(1);
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
                switch (m) {
                        case "R":
                                R(num);
                                await wait(time);
                                break;
                        case "L":
                                L(num)
                                await wait(time);
                                break;
                        case "U":
                                U(num)
                                await wait(time);
                                break;
                        case "D":
                                D(num)
                                await wait(time);
                                break;
                        case "B":
                                B(num)
                                await wait(time);
                                break;
                        case "F":
                                F(num)
                                await wait(time);
                                break;
                        case "r":
                                r(num)
                                await wait(time);
                                break;
                        case "l":
                                l(num)
                                await wait(time);
                                break;
                        case "f":
                                f(num)
                                await wait(time);
                                break;
                        case "b":
                                b(num)
                                await wait(time);
                                break;
                        case "u":
                                u(num)
                                await wait(time);
                                break;
                        case "d":
                                d(num)
                                await wait(time);
                                break;
                        case "M":
                                M(num)
                                await wait(time);
                                break;
                        case "S":
                                S(num)
                                await wait(time);
                                break;
                        case "E":
                                E(num)
                                await wait(time);
                                break;
                        case "x":
                                x(num)
                                await wait(time);
                                break;
                        case "y":
                                y(num)
                                await wait(time);
                                break;
                        case "z":
                                z(num)
                                await wait(time);
                                break;
                        default:
                                break;
                }

                

        }
}