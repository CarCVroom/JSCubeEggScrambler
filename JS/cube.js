const cube = [
        ['a','a','b','d','WCenter','b','d','c','c'], // WHITE / U
        ['e','e','f','h','OCenter','f','h','g','g'], // ORANGE / L
        ['i','i','j','l','GCenter','j','l','k','k'], // GREEN / F
        ['m','m','n','p','RCenter','n','p','o','o'], // RED / R
        ['q','q','r','t','BCenter','r','t','s','s'], // BLUE / B
        ['u','u','v','x','YCenter','v','x','w','w'], // YELLOW / D
];      
// It would be like aabbCENTERccdd
// First is corner and second is edge
// index 4/ CENTER cant move

// NOW WE HAVE ALL SIX SIDES OF A CUBE INDICATED BY COLORS
let cubePlaying = [...cube];
const cwMap = [2,5,8,1,4,7,0,3,6];
let newSide;

function moveR(prime, doubleMove, move) {

        let upp = getTheInput(prime, move);
        let times = doubleMove ? 2 : 1;
        let { stickers, side }= sideStickers(move);
        
        for(let t = 0; t < times; t++) {
                for(let i = 0; i < upp.length - 1; i++) {
                        for(const idx of stickers) {
                                [cubePlaying[upp[i]][idx],     cubePlaying[upp[i + 1]][idx]] =
                                [cubePlaying[upp[i + 1]][idx], cubePlaying[upp[i]][idx]];
                        }
                }
                cubePlaying[side].forEach((sticker, i) => {
                        if (i === 4) return;
                        newSide[cwMap[i]] = sticker;
                })
        }
        console.log(cubePlaying)
}
function doubleArray(arr) {
        return arr = [...arr, ...arr];
}
function getTheInput(prime, move) {
        let R = [5, 4, 0, 2]; 
        let L = [5, 2, 0, 4]; 
        let U = [2, 3, 4, 1]; // this is the order that we are doing it in
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
                default:
                        throw new Error(`Unknown move: "${move}"`);
        }

        if (prime) { // A check to see if it's not prime, as current order does a prime move
                     // Will addapt this to make it able to do 2 moves later  
                targetArray.reverse();
        }

        return targetArray;
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
                default:
                        throw new Error(`Unknown move: "${move}"`);
        }

        return { stickers, side };
}
moveR(false, false, "R");
//moveR(false, false, "R");

// oh no i can do old pochman lol