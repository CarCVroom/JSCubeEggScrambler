import { EffectComposer } from "three/examples/jsm/Addons.js";
import { cube, cubePlaying, move , rotation, wideMove } from "./cube.js";
import { printCube } from "./utils.js";
import { mx_fractal_noise_float } from "three/src/nodes/materialx/lib/mx_noise.js";
import { error } from "three";
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

                makeEdgeMemmoList();
                makeCornerMemmoList();

                // Then execute the moves

                console.log(solution)
        }
        while (solved === false)
        console.log("Final solution: " + solution)

}

function centerAnalyser() {
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
                        solution += `y${count} `
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
        let found = false;

        let unsolvedEdges = checkUnsolvedEdges();

        let arrayOfEdges = [
                //name: "cW"
                //pos: cubePlaying[0][7],
                //solved: false, Something like this
                //buffer: false
        ]

        let buffer = cubePlaying[0][5]
        if (edgeChecker(unsolvedEdges)) {
                console.log("The edges are solved")
                return;
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

                        for (let k = 0; k < arrayOfEdges.length; k++) {
                                if (arrayOfEdges[k].solved === false) {
                                        loopLength += 1;
                                }
                        }
                        loopLength = Math.ceil(loopLength / 2);
                        console.log("LoopLength is: "  + loopLength)
                        for (let j = 0; j < loopLength; j++) {
                                currentPiece = edgesMemmoList[edgesMemmoList.length - 1].pos
                                currentPiece = arrayOfEdges.find(e => e.pos == currentPiece)// See if one of the things matches the pos
                                currentPiece = currentPiece.solvedPos
                                currentPiece = arrayOfEdges.find(e => e.pos.every((v, i) => v === currentPiece[i])) // now use solvedPos to find where that piece needs to go
                                edgesMemmoList.push(currentPiece)
                        }
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
                        console.log("LoopLength is: "  + loopLength)
                        for (let j = 0; j < loopLength; j++) {

                                found = false;

                                currentPiece = edgesMemmoList[edgesMemmoList.length - 1].pos // Here i need to do something when nothings in memmo list cuz no buffer swap
                                //console.log(currentPiece , 1)
                                currentPiece = arrayOfEdges.find(e => e.pos == currentPiece)// See if one of the things matches the pos
                                //console.log(currentPiece, 2 )
                                currentPiece = currentPiece.solvedPos
                                //console.log(currentPiece, 3 )
                                currentPiece = arrayOfEdges.find(e => e.pos.every((v, i) => v === currentPiece[i])) // now use solvedPos to find where that piece needs to go
                                //console.log(currentPiece, 4 )
                                if (currentPiece.name === "bW") {
                                        // Pick another edge as buffer
                                        for (const edge of arrayOfEdges) {
                                                if (!currentPiece.buffer && !edge.solved && !([0, 1].includes(edge.pos[0])) && !([1, 3].includes(edge.pos[1])) && !edgesMemmoList.includes(edge) && edge.name !== "bW" && edge.name !== "mR") {
                                                        edgesMemmoList.push(edge) // LOOK MORE INTO THIS
                                                        found = true;
                                                        break;
                                                } // Wait this code sucks and I need to fix it
                                        }

                                        if (found) { continue; }

                                        //break;
                                        // Still think I need to look and see if i coverd every thing, maybe just compare to loopLength
                                        // Can check if I have looked and added the other unsolved stickers
                                } else if (currentPiece.name !== "bW" && currentPiece.name !== "mR"){
                                        edgesMemmoList.push(currentPiece)
                                }
                                // Thinking just making it a switch case and then looking at the frist letter
                                //console.log(edgesMemmoList , "NUMBER IN THE LOOP: " , j)
                        }
                }
                // Strip memmoList to just be name, and then do the edge solving logic.
                for (let i = 0; i < edgesMemmoList.length; i++) {
                        edgesMemmoList[i] = edgesMemmoList[i].name;
                }
                console.log(edgesMemmoList)

                edgesSolver(edgesMemmoList);
               //console.log("Edge memmo list", edgesMemmoList)
        }

}

function makeCornerMemmoList() {

}

function edgesSolver(memmoList) {
        let useList = structuredClone(memmoList);
        let n, C;
        let unsolvedEdges = checkUnsolvedEdges();

        printCube(cubePlaying)

        for (const edge of useList) {
                n = edge.substring(0, 1);
                C = edge.substring(1);

                switch (n) {
                        case "j":
                                wideMove(false, true, "d");
                                move(false, false, "L");
                                Tperm();
                                move(true, false, "L");
                                wideMove(false, true, "d");

                                solution += "d2 L [tPerm] L' d2 ";
                                break;
                        case "v":
                                move(false, true, "D");
                                move(false, true, "L");
                                Tperm();
                                move(false, true, "L");
                                move(false, true, "D");

                                solution += "D2 L2 [tPerm] L2 D2 ";
                                break;
                        case "t":
                                wideMove(false, true, "d");
                                move(true, false, "L")
                                Tperm();
                                move(false, false, "L");
                                wideMove(false, true, "d");

                                solution += "d2 L' [tPerm] L d2 ";
                                break;
                        case "x":
                                move(false, true, "L");
                                Tperm()
                                move(false, true, "L");

                                solution += "L2 [tPerm] L2 ";
                                break;
                        case "l":
                                move(true, false, "L");
                                Tperm()
                                move(false, false, "L");

                                solution += "L' [tPerm] L ";
                                break;
                        case "d":
                                Tperm()

                                solution += "[tPerm] ";
                                break;
                        case "r":
                                move(false, false, "L");
                                Tperm();
                                move(true, false, "L");

                                solution += "L [tPerm] L' "
                                break;
                        default:
                                throw new error("Invalid edge name, how? Or have am I not done writing the move things")
                                break;
                }

                unsolvedEdges = checkUnsolvedEdges();
                //console.log(unsolvedEdges)
                if (edgeChecker(unsolvedEdges)) {
                        return;
                } else {
                        console.log("Not solved")
                        printCube(cubePlaying)
                }
        }
}

function edgeChecker(unsolvedEdges) {
        return JSON.stringify(unsolvedEdges) === JSON.stringify(solvedEdges)
}

function checkUnsolvedEdges() {
        let arr = [
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
        return arr;
}
analyseer()
