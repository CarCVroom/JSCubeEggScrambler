import { cube, cubePlaying, move , rotation } from "./cube.js";
import { printCube } from "./utils.js";
let count = 0;
let solution = "";

function Tperm() {
        move(false, false, "R")  // R
        move(false, false, "U")  // U
        move(true,  false, "R")  // R'
        move(true,  false, "U")  // U'
        move(true,  false, "R")  // R'
        move(false, false, "F")  // F
        move(false, true,  "R")  // R2
        move(true,  false, "U")  // U'
        move(true,  false, "R")  // R'
        move(true,  false, "U")  // U'
        move(false, false, "R")  // R
        move(false, false, "U")  // U
        move(true,  false, "R")  // R'
        move(true,  false, "F")  // F'
}
function oldPochmanY() {
        move(false, false, "R")  // R
        move(true,  false, "U")  // U'
        move(true,  false, "R")  // R'
        move(true,  false, "U")  // U'
        move(false, false, "R")  // R
        move(false, false, "U")  // U
        move(true,  false, "R")  // R'
        move(true,  false, "F")  // F'
        move(false, false, "R")  // R
        move(false, false, "U")  // U
        move(true,  false, "R")  // R'
        move(true,  false, "U")  // U'
        move(true,  false, "R")  // R'
        move(false, false, "F")  // F
        move(false, false, "R")  // R
}

const solvedEdges = ["aW", "qB", "dW", "eO", "cW", "iG", "bW", "mR",
                     "lG", "fO", "jG", "pR", "tB", "nR", "rB", "hO",
                     "uY", "kG", "xY", "gO", "wY", "sB", "vY", "oR"] // Fill out with all the edges
// need to finish with all of my edge pairs,
// thinking it should be the faces/sides for EO in ZZ for main sticker

let scramble = process.argv[2];

if (scramble) {
        scramble = scramble.match(/[RUFBLDMSErufbldxyz][2']?/g);
        scramble = scramble.join(" ")
        console.log(scramble)
}
function analyseer() {
        // I should make this a do while loop that checks if its solved
        let solved = false;

        do {
                if (JSON.stringify(cubePlaying) == JSON.stringify(cube)) {
                        console.log("The cube is solved")
                        solved = true
                } else {
                        console.log("The cube is not solved")
                        //printCube(cube);
                        console.log("Unsolved cube")
                        //printCube(cubePlaying)
                }

                // Start by learing more about old pochman lol
                // Get to the white top Green front

                if (cubePlaying[0][4] === "CW" && cubePlaying[2][4] === "CG") {
                        console.log("It's in correct orentation")
                } else {
                        centerAnalyser(cubePlaying);
                }

                // Then make the memmo list

                // Should do edges first, then corners
                // Edges
                makeEdgeMemmoList();
                // Corners
                makeCornerMemmoList();

                // Then execute the moves

                // Have it always output the solution
                console.log(solution)
        }
        while (solved === false)
        console.log("Final solution: " + solution)

}

function centerAnalyser() {
        // Do the stuff to get to correct orentation
        do { // solve the White center first, then green is just y moves

                if (cubePlaying[1][4] === "CW" || cubePlaying[3][4] === "CW") {
                        count = 0;
                        do {
                                rotation(false, false, "z");
                                count += 1;
                        }
                        while (cubePlaying[0][4] !== "CW")
                        solution += `z${count} `
                } // if white is in orange or red where it just needs z rotations

                if (cubePlaying[2][4] === "CW" || cubePlaying[4][4] === "CW" || cubePlaying[5][4] === "CW") {
                        count = 0;
                        do {
                                rotation(false, false, "x");
                                count += 1;
                        }
                        while (cubePlaying[0][4] !== "CW")
                        solution += `x${count} `
                }

                // Green center here

                if (cubePlaying[1][4] === "CG" || cubePlaying[3][4] === "CG" || cubePlaying[4][4] === "CG") {
                        count = 0;
                        do {
                                rotation(false, false, "y");
                                count += 1;
                        }
                        while(cubePlaying[2][4] !== "CG")
                        solution += `y${count}`
                }
        }
        while (cubePlaying[0][4] !== "CW" && cubePlaying[2][4] !== "CG")
        console.log(solution)
}

function makeEdgeMemmoList() {
        let edgesMemmoList = [];
        let unsolvedEdgesObjectList = [];
        // first see if all the edges are solved
        let unsolvedEdges = [
                cubePlaying[0][1], cubePlaying[4][1], // aW, qB
                cubePlaying[0][3], cubePlaying[1][1], // dW, eO
                cubePlaying[0][7], cubePlaying[2][1], // cW, iG
                cubePlaying[0][5], cubePlaying[3][1], // bW, mR

                cubePlaying[2][3], cubePlaying[1][5], // lG, fO
                cubePlaying[2][5], cubePlaying[3][3], // jG, pR
                cubePlaying[4][3], cubePlaying[3][5], // tB, nR
                cubePlaying[4][5], cubePlaying[1][3], // rB, hO

                cubePlaying[5][1], cubePlaying[2][7], // uY, kG
                cubePlaying[5][3], cubePlaying[1][7], // xY, gO
                cubePlaying[5][7], cubePlaying[4][7], // wY, sB
                cubePlaying[5][5], cubePlaying[3][7]  // vY, oR
        ];

        let arrayOfUnsolvedEdges = [{
                //name: "gW"
                //pos: cubePlaying[1][2],
                //solved: false, Something like this
                //buffer: false
        }]

        console.log(solvedEdges)
        console.log(unsolvedEdges)

        let buffer = cubePlaying[0][5]
        if (JSON.stringify(unsolvedEdges) === JSON.stringify(solvedEdges)) {
                console.log("The edges are solved")
        } else { // [0][5] b will be our buffer, white red
                if (buffer === "bW") {
                        console.log("Buffer is solved")
                        // Pick another piece as buffer
                        // It should probably be separate
                        // and not have a "main" sticker on an edge
                        // Use the power of oop and make a object array for each piece
                }
                edgesMemmoList.push(cubePlaying[0][5].slice(0, cubePlaying[0][5].length / 2))
                // need to do something with the buffer and
                // aswell as figuring it out if it's idk
        }

        console.log(edgesMemmoList)
}

function makeCornerMemmoList() {

}
analyseer(cubePlaying)
