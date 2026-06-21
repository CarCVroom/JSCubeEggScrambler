import { printCube } from './utils.js'

const cube = [
        ['aW','aW','bW','dW','CW','bW','dW','cW','cW'], // WHITE / U
        ['eO','eO','fO','hO','CO','fO','hO','gO','gO'], // ORANGE / L
        ['iG','iG','jG','lG','CG','jG','lG','kG','kG'], // GREEN / F
        ['mR','mR','nR','pR','CR','nR','pR','oR','oR'], // RED / R
        ['qB','qB','rB','tB','CB','rB','tB','sB','sB'], // BLUE / B
        ['uY','uY','vY','xY','CY','vY','xY','wY','wY'], // YELLOW / D
        // help bro pls
];
// It would be like aabbCENTERccdd
// First is corner and second is edge
// index 4/ CENTER cant move

// NOW WE HAVE ALL SIX SIDES OF A CUBE INDICATED BY COLORS
let cubePlaying = structuredClone(cube); // why must copying an array be so hard
export { cubePlaying, cube }
const cwMap = [2,5,8,1,4,7,0,3,6];

let R = [5, 4, 0, 2];
let L = [5, 2, 0, 4];
let U = [2, 3, 4, 1]; // this is the order that we are doing it in
let D = [2, 1, 4, 3];
let F = [0, 1, 5, 3];
let B = [0, 3, 5, 1];

let x = [2, 0, 4, 5];
let y = [1, 4, 3 ,2];
let z = [3, 5, 1, 0]; // I think this is right, check after.

export function move(prime, doubleMove, move) {

        let { targetArray: upp, targetSideArray: sideArray } = getTheInput(prime, move);
        let times = doubleMove ? 2 : 1;
        let { stickers, side } = sideStickers(move);
        const getStickers = (face) => typeof stickers === 'function' ? stickers(face) : stickers;

        for(let t = 0; t < times; t++) {
                let newSide = [...cubePlaying[side]];

                for(let i = 0; i < upp.length - 1; i++) {
                        const idxA = getStickers(upp[i]);
                        const idxB = getStickers(upp[i + 1]);
                        for(let s = 0; s < idxA.length; s++) {
                                [cubePlaying[upp[i]][idxA[s]],     cubePlaying[upp[i + 1]][idxB[s]]] =
                                [cubePlaying[upp[i + 1]][idxB[s]], cubePlaying[upp[i]][idxA[s]]];
                                //console.log(`i: ${i} s: ${s}`)
                                //printCube(cubePlaying);
                        }
                }

                cubePlaying[side].forEach((sticker, n) => {
                        if (n === 4) return;
                        newSide[sideArray[n]] = sticker;
                });
                cubePlaying[side] = newSide;
        }
        printCube(cubePlaying);
}
function getTheInput(prime, move) {
        let targetArray, targetSideArray;

        switch (move) {
                case "R":
                        targetArray = structuredClone(R);
                        break;
                case "L":
                        targetArray = structuredClone(L);
                        break;
                case "U":
                        targetArray = structuredClone(U);
                        break;
                case "D":
                        targetArray = structuredClone(D);
                        break;
                case "F":
                        targetArray = structuredClone(F);
                        break;
                case "B":
                        targetArray = structuredClone(B);
                        break;
                default:
                        throw new Error(`Unknown notation: "${move}"`);
        }

        if (prime) { // A check to see if it's not prime, as current order does a prime move
                     // Will addapt this to make it able to do 2 moves later
                targetArray.reverse();
                targetSideArray = structuredClone(cwMap).reverse();
        } else {
                targetSideArray = structuredClone(cwMap); // Use structured clone so not to muteate the old ones when doing .revese
        }

        return { targetArray, targetSideArray };
}
function sideStickers(move) {
        let stickers, side;

        switch (move) {
                case "R":
                        stickers = (faceIdx) => {
                                const faceStickersMap = {
                                        5: [2,5,8], // U
                                        4: [6,3,0], // L
                                        0: [2,5,8],
                                        2: [2,5,8]
                                };
                                return faceStickersMap[faceIdx] ?? [6,7,8];
                        }
                        side = 3;
                        break;
                case "L":
                        stickers = (faceIdx) => {
                                const faceStickersMap = {
                                        5: [0,3,6], // U
                                        4: [8,5,2], // L
                                        0: [0,3,6],
                                        2: [0,3,6]
                                };
                                return faceStickersMap[faceIdx] ?? [6,7,8];
                        }
                        side = 1;
                        break;
                case "U":
                        stickers = () => [0,1,2];
                        side = 0;
                        break;
                case "D":
                        stickers = () => [6,7,8];
                        side = 5;
                        break;
                case "F":
                        stickers = (faceIdx) => {
                                const faceStickersMap = {
                                        0: [6,7,8], // U
                                        1: [8,5,2], // L
                                        5: [2,1,0],
                                        3: [0,3,6],
                                };
                                return faceStickersMap[faceIdx] ?? [6,7,8];
                        }
                        side = 2; // fuck why does f and b moves have to change EO...
                        break;
                case "B":
                        stickers = (faceIdx) => {
                                const faceStickersMap = {
                                        0: [2,1,0], // U
                                        3: [8,5,2],
                                        5: [6,7,8],
                                        1: [0,3,6], // L
                                };
                                return faceStickersMap[faceIdx] ?? [6,7,8];
                        }
                        side = 4; // fuck why does f and b moves have to change EO...
                        break;
                default:
                        throw new Error(`Unknown notation: "${move}"`);
        }

        return { stickers, side };
}

export function rotation(prime, double, rotation) {

        rotation = rotation.toLowerCase();
        let times = double ? 2 : 1;
        let { side1: sideA, side2: sideB } = getSides(rotation);
        let { targetRotationArayy: upp, targetSideRotationArray: sideArray } = getInput(prime, rotation);

        for(let t = 0; t < times; t++) {

                const [a, b, c, d] = [
                cubePlaying[upp[0]],
                cubePlaying[upp[1]],
                cubePlaying[upp[2]],
                cubePlaying[upp[3]],
                ];

                [cubePlaying[upp[0]], cubePlaying[upp[1]], cubePlaying[upp[2]], cubePlaying[upp[3]]]
                = prime ? [b, c, d, a] : [d, a, b, c];

                if (rotation == "r") {
                        cubePlaying[upp[1]] = flipFace(cubePlaying[upp[1]]);
                        cubePlaying[upp[2]] = flipFace(cubePlaying[upp[2]]);
                } else if (rotation === "z" && !prime) {
                        cubePlaying[upp[0]] = rotateFace90CW(cubePlaying[upp[0]]);
                        cubePlaying[upp[1]] = rotateFace90CW(cubePlaying[upp[1]]);
                        cubePlaying[upp[2]] = rotateFace90CW(cubePlaying[upp[2]]);
                        cubePlaying[upp[3]] = rotateFace90CW(cubePlaying[upp[3]]);
                } else if (rotation === "z" && prime) {
                        cubePlaying[upp[0]] = rotateFace90CCW(cubePlaying[upp[0]]);
                        cubePlaying[upp[1]] = rotateFace90CCW(cubePlaying[upp[1]]);
                        cubePlaying[upp[2]] = rotateFace90CCW(cubePlaying[upp[2]]);
                        cubePlaying[upp[3]] = rotateFace90CCW(cubePlaying[upp[3]]);

                }

                let newSideA = [...cubePlaying[sideA]];
                let newSideB = [...cubePlaying[sideB]];

                cubePlaying[sideA].forEach((sticker, n) => {
                        if (n === 4) return;
                        newSideA[sideArray[n]] = sticker;
                })
                cubePlaying[sideA] = newSideA;
                sideArray.reverse(); // reverses it cuz it needs to.
                cubePlaying[sideB].forEach((sticker, n) => {
                        if (n === 4) return;
                        newSideB[sideArray[n]] = sticker;
                })
                cubePlaying[sideB] = newSideB;
        }
        printCube(cubePlaying)
}
function getSides(rotation) {
        let side1, side2;

        switch (rotation) {
                case "x":
                        side1 = 3;
                        side2 = 1;
                        break;
                case "y":
                        side1 = 0;
                        side2 = 5;
                        break;
                case "z":
                        side1 = 2;
                        side2 = 4;
                        break;
                default:
                        throw new Error(`Unknown notation: "${rotation}"`);
        }

        return { side1, side2 };
}
function getInput(prime, rotation) {
        let targetRotationArayy, targetSideRotationArray;

        switch (rotation) {
                case "x":
                        targetRotationArayy = structuredClone(x);
                        break;
                case "y":
                        targetRotationArayy = structuredClone(y);
                        break;
                case "z":
                        targetRotationArayy = structuredClone(z);
                        break;
                default:
                        throw new Error(`Unkown notation: "${rotation}"`)
        }

        if (prime) {
                targetSideRotationArray = structuredClone(cwMap).reverse();
        } else {
                targetSideRotationArray = structuredClone(cwMap);
        }

        return { targetRotationArayy, targetSideRotationArray }
}

function flipFace(face) {
        let flipped = [...face];
        let noCenter = [0,1,2,3,5,6,7,8]; // skip index 4
        let vals = noCenter.map(i => face[i]).reverse();
        noCenter.forEach((i, n) => flipped[i] = vals[n]);
        return flipped;
}
function rotateFace90CW(face) {
        let r = [...face];
        // 90° CW mapping for a 3x3: 0→2→8→6→0, 1→5→7→3→1
        [r[0],r[2],r[8],r[6]] = [face[6],face[0],face[2],face[8]];
        [r[1],r[5],r[7],r[3]] = [face[3],face[1],face[5],face[7]];
        return r;
}
function rotateFace90CCW(face) {
        let r = [...face];
        [r[0],r[2],r[8],r[6]] = [face[2],face[8],face[6],face[0]];
        [r[1],r[5],r[7],r[3]] = [face[5],face[7],face[3],face[1]];
        return r;
}

// I NEED WIDE MOVES ADD HERE BRO
export function wideMove(prime, double, moveN) {
        moveN = moveN.toLowerCase();

        switch (moveN) {
                case "r":
                        move(prime, double, "L")
                        rotation(prime, double, "x")
                        break;
                case "l":
                        move(prime, double, "R")
                        rotation(prime ? false : true, double, "y");
                        break;
                case "u":
                        move(prime, double, "D")
                        rotation(prime, double, "y")
                        break;
                case "d":
                        move(prime, double, "U")
                        rotation(prime ? false : true, double, "y");
                        break;
                case "f":
                        move(prime, double, "B")
                        rotation(prime, double, "z")
                        break;
                case "l":
                        move(prime, double, "F")
                        rotation(prime ? false : true, double, "z");
                        break;
        }
}
// I ALSO NEED SOME SLICE MOVES
export function sliceMoves(prime, double, moveN) {
        moveN = moveN.toLowerCase();

        switch (moveN) {
                case "M":
                        wideMove(prime ? false : true, double, "r")
                        move(prime, double, "R")
                case "S":
                        wideMove(prime, double, "f")
                        move(prime ? false : true, double, "F")
                case "M":
                        wideMove(prime ? false : true, double, "u")
                        move(prime, double, "U") // wow slice moves are easy i can't belive i made them so dumb before
                                                // This is what's so good about having universal move functions and true false for prime and double moves
        }
}

//move(false,false, "U")
//rotation(true, false, "z");
//move(false, false, "R")

//x R' U R' D2 R U' R' D2 R2
// oh no i can do old pochman lol

wideMove(false, false, "r")
