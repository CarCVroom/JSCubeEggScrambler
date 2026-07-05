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

// const solvedEdges = [
//         { face: 0, index: 1, value: "aW" },
//         { face: 4, index: 1, value: "qB" },
//         "dW", "eO", "cW", "iG", "bW", "mR",
//                      "lG", "fO", "jG", "pR", "tB", "nR", "rB", "hO",
//         "uY", "kG", "xY", "gO", "wY", "sB", "vY", "oR"] // Fill out with all the edges
const solvedEdges = [
                         { face: 0, index: 1, value: "aW" },
                         { face: 4, index: 1, value: "qB" },

                         { face: 0, index: 3, value: "dW" },
                         { face: 1, index: 1, value: "eO" },

                         { face: 0, index: 7, value: "cW" },
                         { face: 2, index: 1, value: "iG" },

                         { face: 0, index: 5, value: "bW" },
                         { face: 3, index: 1, value: "mR" },

                         { face: 2, index: 3, value: "lG" },
                         { face: 1, index: 5, value: "fO" },

                         { face: 2, index: 5, value: "jG" },
                         { face: 3, index: 3, value: "pR" },

                         { face: 4, index: 3, value: "tB" },
                         { face: 3, index: 5, value: "nR" },

                         { face: 4, index: 5, value: "rB" },
                         { face: 1, index: 3, value: "hO" },

                         { face: 5, index: 1, value: "uY" },
                         { face: 2, index: 7, value: "kG" },

                         { face: 5, index: 3, value: "xY" },
                         { face: 1, index: 7, value: "gO" },

                         { face: 5, index: 7, value: "wY" },
                         { face: 4, index: 7, value: "sB" },

                         { face: 5, index: 5, value: "vY" },
                         { face: 3, index: 7, value: "oR" }
                     ];
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
                        break;
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
        let isBuffer = false
        let isSolved = false
        let stickerName = "";
        let edgePos = [];
        let partner = 0;
        let currentPiece;
        let solvedPos = [];
        let loopLength = 0;
        // first see if all the edges are solved
        // let unsolvedEdges = [
        //         cubePlaying[0][1], cubePlaying[4][1], // aW, qB
        //         cubePlaying[0][3], cubePlaying[1][1], // dW, eO
        //         cubePlaying[0][7], cubePlaying[2][1], // cW, iG
        //         cubePlaying[0][5], cubePlaying[3][1], // bW, mR

        //         cubePlaying[2][3], cubePlaying[1][5], // lG, fO
        //         cubePlaying[2][5], cubePlaying[3][3], // jG, pR
        //         cubePlaying[4][3], cubePlaying[3][5], // tB, nR
        //         cubePlaying[4][5], cubePlaying[1][3], // rB, hO

        //         cubePlaying[5][1], cubePlaying[2][7], // uY, kG
        //         cubePlaying[5][3], cubePlaying[1][7], // xY, gO
        //         cubePlaying[5][7], cubePlaying[4][7], // wY, sB
        //         cubePlaying[5][5], cubePlaying[3][7]  // vY, oR
        // ];

        let unsolvedEdges = [
            { face: 0, index: 1, value: cubePlaying[0][1] }, // aW
            { face: 4, index: 1, value: cubePlaying[4][1] }, // qB

            { face: 0, index: 3, value: cubePlaying[0][3] }, // dW
            { face: 1, index: 1, value: cubePlaying[1][1] }, // eO

            { face: 0, index: 7, value: cubePlaying[0][7] }, // cW
            { face: 2, index: 1, value: cubePlaying[2][1] }, // iG

            { face: 0, index: 5, value: cubePlaying[0][5] }, // bW
            { face: 3, index: 1, value: cubePlaying[3][1] }, // mR

            { face: 2, index: 3, value: cubePlaying[2][3] }, // lG
            { face: 1, index: 5, value: cubePlaying[1][5] }, // fO

            { face: 2, index: 5, value: cubePlaying[2][5] }, // jG
            { face: 3, index: 3, value: cubePlaying[3][3] }, // pR

            { face: 4, index: 3, value: cubePlaying[4][3] }, // tB
            { face: 3, index: 5, value: cubePlaying[3][5] }, // nR

            { face: 4, index: 5, value: cubePlaying[4][5] }, // rB
            { face: 1, index: 3, value: cubePlaying[1][3] }, // hO

            { face: 5, index: 1, value: cubePlaying[5][1] }, // uY
            { face: 2, index: 7, value: cubePlaying[2][7] }, // kG

            { face: 5, index: 3, value: cubePlaying[5][3] }, // xY
            { face: 1, index: 7, value: cubePlaying[1][7] }, // gO

            { face: 5, index: 7, value: cubePlaying[5][7] }, // wY
            { face: 4, index: 7, value: cubePlaying[4][7] }, // sB

            { face: 5, index: 5, value: cubePlaying[5][5] }, // vY
            { face: 3, index: 7, value: cubePlaying[3][7] }  // oR
        ];

        let arrayOfEdges = [
                //name: "cW"
                //pos: cubePlaying[0][7],
                //solved: false, Something like this
                //buffer: false
        ]

        let buffer = cubePlaying[0][5]
        if (JSON.stringify(unsolvedEdges) === JSON.stringify(solvedEdges)) {
                console.log("The edges are solved")
        } else { // [0][5] b will be our buffer, white red
                unsolvedEdges.forEach((edge, i) => {
                        if (edge.value === solvedEdges[i].value) {
                                isSolved = true;
                        } else {
                                isSolved = false;
                        }
                        if (edge.value === buffer) {
                                isBuffer = true;
                        } else {
                                isBuffer = false;
                        }
                        stickerName = edge.value;

                        edgePos = [edge.face, edge.index];

                        if (i % 2 === 0) {
                                partner = 1
                        } else {
                                partner = -1
                        }

                        solvedPos = solvedEdges.find(e => e.value === edge.value)
                        solvedPos = [solvedPos.face, solvedPos.index]

                        arrayOfEdges.push({
                                name: stickerName,
                                pos: edgePos,
                                solved: isSolved,
                                buffer: isBuffer,
                                partner: unsolvedEdges[i + partner].value,
                                solvedPos: solvedPos
                        })
                });
                // Now make the memmo list using the other thing

                // Look at buffer and see what piece is there
                if (buffer === "bW") {
                        for (const edge of arrayOfEdges) {
                                if (!edge.buffer && !edge.solved && (![0, 1].includes(edge.pos[0])) && (![1, 3].includes(edge.pos[1])) ) {
                                        edgesMemmoList.push(edge)
                                        break;

                                }
                        }
                        // Look at the old slot and see what piece is there
                        // I think maybe I can loop this?
                        // Will find out later ig
                        // Will find out now
                        //
                        // Then look at the buffer and see what piece is there

                        //for (const [i, edge] of arrayOfEdges.entries()) {
                        for (let k = 0; k < arrayOfEdges.length; k++) {
                                if (arrayOfEdges[k].solved === false) {
                                        loopLength += 1;
                                }
                        }
                        loopLength = loopLength / 2;
                        for (let j = 0; j < loopLength; j++) {
                                currentPiece = edgesMemmoList[edgesMemmoList.length - 1].pos
                                currentPiece = arrayOfEdges.find(e => e.pos == currentPiece)// See if one of the things matches the pos
                                currentPiece = currentPiece.solvedPos
                                currentPiece = arrayOfEdges.find(e => e.pos.every((v, i) => v === currentPiece[i])) // now use solvedPos to find where that piece needs to go
                                edgesMemmoList.push(currentPiece)
                        }
                                //}
                                        // NO THIS IS ALL WRONG, I NEED TO MAKE IT DIFFRENT AND LOOK AT THE PREVIOSE ONE
                } else {
                        // Look at the buffer and see what piece is there and add that to memmo list
                        edgesMemmoList.push(arrayOfEdges.find(e => e.pos[0] === 0 && e.pos[1] === 5))

                        for (let k = 0; k < arrayOfEdges.length; k++) {
                                if (arrayOfEdges[k].solved === false) {
                                        loopLength += 1;
                                }
                        }
                        loopLength = loopLength / 2;
                        for (let j = 0; j < loopLength; j++) {
                                currentPiece = edgesMemmoList[edgesMemmoList.length - 1].pos // Here i need to do something when nothings in memmo list cuz no buffer swap
                                currentPiece = arrayOfEdges.find(e => e.pos == currentPiece)// See if one of the things matches the pos
                                currentPiece = currentPiece.solvedPos
                                currentPiece = arrayOfEdges.find(e => e.pos.every((v, i) => v === currentPiece[i])) // now use solvedPos to find where that piece needs to go
                                console.log(j)
                                if (currentPiece.name === "bW") {
                                        break;
                                        // Still think I need to look and see if i coverd every thing, maybe just compare to loopLength
                                        // Can check if I have looked and added the other unsolved stickers
                                }
                                edgesMemmoList.push(currentPiece)
                        }
                }
                        // Pick another piece as buffer
                        // It should probably be separate
                        // and not have a "main" sticker on an edge
                        // Use the power of oop and make a object array for each piece
                // need to do something with the buffer and
                // aswell as figuring it out if it's idk
                //console.log(arrayOfEdges)
                console.log("Edge memmo list", edgesMemmoList)
        }

}

function makeCornerMemmoList() {

}
analyseer()
