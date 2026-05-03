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
const cwMap = [2,5,8,1,4,7,0,3,6];
printCube(cube)
console.log('\n' + '-'.repeat(process.stdout.columns) + '\n');

let R = [5, 4, 0, 2]; 
let L = [5, 2, 0, 4];         
let U = [2, 3, 4, 1]; // this is the order that we are doing it in
let D = [2, 1, 4, 3];
let F = [0, 1, 5, 3];
let B = [0, 3, 5, 1];

function move(prime, doubleMove, move) {

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
                        targetArray = R;                                         
                        break;
                case "L":
                        targetArray = L;                       
                        break;
                case "U":
                        targetArray = U;
                        break;
                case "D":
                        targetArray = D;
                        break;
                case "F":
                        targetArray = F;
                        break;
                case "B":
                        targetArray = B;
                        break;
                default:
                        throw new Error(`Unknown move: "${move}"`);
        }

        if (prime) { // A check to see if it's not prime, as current order does a prime move
                     // Will addapt this to make it able to do 2 moves later  
                targetArray.reverse();
                targetSideArray = cwMap.reverse();
        } else {
                targetSideArray = cwMap;
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
                        stickers = () => [0,3,6]; 
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
                                        1: [2,5,8], // L
                                        5: [0,1,2],
                                        3: [6,3,0]
                                };
                                return faceStickersMap[faceIdx] ?? [6,7,8];
                        }
                        side = 2; // fuck why does f and b moves have to change EO...
                        break;
                case "B":
                        stickers = (faceIdx) => {
                                const faceStickersMap = {
                                        0: [0,1,2], // U
                                        3: [2,5,8],
                                        5: [6,7,8],
                                        1: [0,3,6], // L
                                };
                                return faceStickersMap[faceIdx] ?? [6,7,8];
                        }
                        side = 4; // fuck why does f and b moves have to change EO...
                        break;
                default:
                        throw new Error(`Unknown move: "${move}"`);
        }

        return { stickers, side };
}
//move(true, true, "B");
//moveR(false, false, "R");
function Tperm() {
move(false, false, "R");
move(false, false, "U");
move(true,  false, "R");
move(true,  false, "U");
move(true,  false, "R");
move(false, false, "F");
move(false, true,  "R");
move(true,  false, "U");
move(true,  false, "R");
move(true,  false, "U");
move(false, false, "R"); // Tperm no work
move(true,  false, "U");
move(true,  false, "R");
move(true,  false, "F"); }

//Tperm();
//move(false, false, "R");
//move(false, false, "U");
//move(true, false, "R");
move(true, false, "U"); // U' no work? what

//console.log('\n' + '-'.repeat(process.stdout.columns) + '\n');
console.log("Done can kinda just ignore")
printCube(cubePlaying)

console.log("Original state")
printCube(cube);

// oh no i can do old pochman lol