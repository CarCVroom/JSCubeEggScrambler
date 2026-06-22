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

const edgePairs = [["aW"]["dW"]["bW"]["cW"]]
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
        // first see if all the edges are solved
        if ()
}

function makeCornerMemmoList() {

}
analyseer(cubePlaying)
