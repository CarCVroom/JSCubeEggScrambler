import { cube, cubePlaying, move , rotation } from "./cube.js";
import { printCube } from "./utils.js";

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

//oldPochmanY();

function analyseer(cubePlaying) {
        // I should make this a do while loop that checks if its solved
        let solved = false;

        do {
                if (JSON.stringify(cubePlaying) == JSON.stringify(cube)) {
                        console.log("The cube is solved")
                        solved = true
                } else {
                        console.log("The cube is not solved")
                        printCube(cube);
                        console.log("Unsolved cube")
                        printCube(cubePlaying)
                }
        }
        while (solved === false)

        // Start by learing more about old pochman lol
        // Get to the white top Green front
        // Then make the memmo list
        // Then execute the moves
}

analyseer(cubePlaying)
