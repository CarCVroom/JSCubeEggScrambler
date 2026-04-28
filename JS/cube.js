import { printCube } from './utils.js'

const cube = [
        ['aW','aW','bW','dW','WC','bW','dW','cW','cW'], // WHITE / U
        ['eO','eO','fO','hO','OC','fO','hO','gO','gO'], // ORANGE / L
        ['iG','iG','jG','lG','GC','jG','lG','kG','kG'], // GREEN / F
        ['mR','mR','nR','pR','RC','nR','pR','oR','oR'], // RED / R
        ['qB','qB','rB','tB','BC','rB','tB','sB','sB'], // BLUE / B
        ['uY','uY','vY','xY','YC','vY','xY','wY','wY'], // YELLOW / D
        // help bro pls
];      
// It would be like aabbCENTERccdd
// First is corner and second is edge
// index 4/ CENTER cant move

// NOW WE HAVE ALL SIX SIDES OF A CUBE INDICATED BY COLORS
let cubePlaying = [...cube];
const cwMap = [2,5,8,1,4,7,0,3,6];
printCube(cube)
console.log('\n' + '-'.repeat(process.stdout.columns) + '\n');

let R = [5, 4, 0, 2]; 
let L = [5, 2, 0, 4]; 
let U = [2, 3, 4, 1]; // this is the order that we are doing it in
let D = [2, 1, 4, 3];
let F = [5, 3, 0, 1];

function moveR(prime, doubleMove, move) {

        let { targetArray: upp, targetSideArray: sideArray } = getTheInput(prime, move);
        let times = doubleMove ? 2 : 1;
        let { stickers, side } = sideStickers(move);
        
        for(let t = 0; t < times; t++) {
                let newSide = [...cubePlaying[side]];
                for(let i = 0; i < upp.length - 1; i++) {
                        for(const idx of stickers) {
                                [cubePlaying[upp[i]][idx],     cubePlaying[upp[i + 1]][idx]] =
                                [cubePlaying[upp[i + 1]][idx], cubePlaying[upp[i]][idx]];
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
function doubleArray(arr) {
        return arr = [...arr, ...arr];
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
                        stickers = [2,5,8]; // These are the stickers on each side we are targeting
                        side = 3;
                        break;
                case "L":
                        stickers = [0,3,6]; 
                        side = 1;
                        break;
                case "U":
                        stickers = [0,1,2];
                        side = 0;
                        break;
                case "D":
                        stickers = [6,7,8];
                        side = 5;
                        break;
                case "F":
                        stickers = [6,7,8];
                        side = 2; // fuck why does f and b moves have to change EO...
                        break;
                default:
                        throw new Error(`Unknown move: "${move}"`);
        }

        return { stickers, side };
}
moveR(false, false, "F");
//moveR(false, false, "R");

// oh no i can do old pochman lol