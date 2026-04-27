const cube = [
        [0,0,0,0,0,0,0,0,0], // WHITE / U
        [1,1,1,1,1,1,1,1,1], // ORANGE / L
        [2,2,2,2,2,2,2,2,2], // GREEN / F
        [3,3,3,3,3,3,3,3,3], // RED / R
        [4,4,4,4,4,4,4,4,4], // BLUE / B
        [5,5,5,5,5,5,5,5,5], // YELLOW / D
];      
// It would be like aabbCENTERccdd
// First is corner and second is edge
// index 4/ CENTER cant move

// NOW WE HAVE ALL SIX SIDES OF A CUBE INDICATED BY COLORS
let cubePlaying = [...cube];

function moveR(prime, doubleMove, move) {

        let upp = getTheInput(prime, move);
        let times = doubleMove ? 2 : 1;
        let stickers = sideStickers(move);
        
        for(let t = 0; t < times; t++) {
                for(let i = 0; i < upp.length - 1; i++) {
                        for(const idx of stickers) {
                                [cubePlaying[upp[i]][idx],     cubePlaying[upp[i + 1]][idx]] =
                                [cubePlaying[upp[i + 1]][idx], cubePlaying[upp[i]][idx]];
                        }
                }
        }
        console.log(cubePlaying)
}
function doubleArray(arr) {
        return arr = [...arr, ...arr];
}
function getTheInput(prime, move) {
        let R = [5, 4, 0, 2]; // This is a full move im stupid 
        let L = [5, 2, 0, 4]; // add something and another paramater that makes it so that i can chose moves with one function.
        let U = [2, 3, 4, 1];
        let D = [] // figure it out bro #####
        let targetArray; 

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
                default:
                        throw new Error(`Unknown move: "${move}"`);
                        break;
        }

        if (prime) { // A check to see if it's not prime, as current order does a prime move
                     // Will addapt this to make it able to do 2 moves later  
                targetArray.reverse();
        }

        return targetArray;
}
function sideStickers(move) {
        let stickers;

        switch (move) {
                case "R":
                        stickers = [2,5,8]; 
                        break;
                case "L":
                        stickers = [0,3,6]; 
                        break;
                case "U":
                        stickers = [0,1,2];
                        break;
                case "D":
                        stickers = [6,7,8];
                        break;
                default:
                        break;
        }

        return stickers;
}
moveR(false, false, "U");
//moveR(false, false, "R");

// oh no i can do old pochman lol