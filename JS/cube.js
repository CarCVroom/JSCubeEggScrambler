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
printCube(cube)

let R = [5, 4, 0, 2]; 
let L = [5, 2, 0, 4];         
let U = [2, 3, 4, 1]; // this is the order that we are doing it in
let D = [2, 1, 4, 3];
let F = [0, 1, 5, 3];
let B = [0, 3, 5, 1];

let x = [5, 4, 0, 2];
let y = [2, 3, 4 ,1];
let z = [0, 1, 5, 3]; // I think this is right, check after.

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

function rotation(prime, double, rotation) {

        rotation = rotation.toLowerCase();
        let times = double ? 2 : 1;
        let { side1: sideA, side2: sideB } = getSides(rotation);
        let { targetRotationArayy: upp, targetSideRotationArray: sideArray } = getInput(prime, rotation);

        for(let t = 0; t < times; t++) {
                for(let i = 0; i < upp.length - 1; i++) {
                        [cubePlaying[upp[i]], cubePlaying[upp[i + 1]]] =
                        [cubePlaying[upp[i + 1]], cubePlaying[upp[i]]]; 
                        // Still needs more work and acceptance testing
                }
        }
        printCube(cubePlaying)
}
function getSides(rotation) {
        let side1, side2;

        switch (rotation) {
                case "x":
                        side1 = "R";
                        side2 = "L"; 
                        break;
                case "y":
                        side1 = "U";
                        side2 = "D"; 
                        break;
                case "z":
                        side1 = "F";
                        side2 = "B"; 
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
                targetRotationArayy.reverse();
                targetSideRotationArray = structuredClone(cwMap).reverse();
        } else {
                targetSideRotationArray = structuredClone(cwMap);
        }
        
        return { targetRotationArayy, targetSideRotationArray }
}

rotation(false, false, "x");
// oh no i can do old pochman lol