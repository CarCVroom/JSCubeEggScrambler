import { parserAndRunnerVisual, runTheBitch, movesScramble, movesSolution, reverseMovesRun } from "./converterAndRunner.js"
import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { wait } from "./utils.js"

document.querySelector("button").addEventListener("click", makeReadableCodeFromShittyInput);

let scrambleMovesReverse = [];
let solutionMovesReverse = [];

export { scrambleMovesReverse, solutionMovesReverse };

export async function inputRunner(scramMoves, solMoves) {
        console.warn("Button pressed")
        
        await reverseOldMoves()
        await reverseMovesRun(true);
        await reverseMovesRun(false);

        let tps, loop; 
        // Moves are from the parser

        loop = document.getElementById('loop').checked;
        
        tps = Number(document.getElementById('TPSInput').value);

        if (!tps) {
                alert("Enter a tps");
                return;
        }

        if (tps > 30 ) { 
                alert("Over 30 tps")
                return;
        }

        tps = (1000 / tps) - 8;
        console.log(tps) //x' r' U F U' r U' r' U2 r' U r R U2 R2 U' R U R U2 R' U' F' r U R' U' r' F R
        console.log(`Scramble: ${scramMoves}, Solution: ${solMoves}`)

        if (scramMoves && solMoves) { 
                if (document.getElementById('loop').checked) {
                        //await parserAndRunnerVisual(scramMoves, true);
                        //await parserAndRunnerVisual(solMoves, false); // Gets the moves now, and then runs them without computing them

                        while (loop) {
                                await wait(500);
                                parserAndRunnerVisual(scramMoves, true)
                                parserAndRunnerVisual(solMoves, false) // lol, but i might still not take that much time
                                // Scramble
                                await runTheBitch(0, true)

                                // Wait
                                await wait(2000);

                                let start = performance.now();
                                // Solve
                                await runTheBitch(tps, false)
                                console.log(`Total: ${((performance.now() - start) / 1000).toFixed(2)}s`);

                                await wait(500);

                                await reverseOldMoves()
                                await reverseMovesRun(false);
                                await reverseMovesRun(true);
                        }
                } else {
                        parserAndRunnerVisual(scramMoves, true);
                        parserAndRunnerVisual(solMoves, false); // Gets the moves now, and then runs them without computing them
                        
                        // Scramble
                        await runTheBitch(0, true)

                        // Wait
                        await wait(2000);

                        let start = performance.now();
                        // Solve
                        await runTheBitch(tps, false)
                        console.log(`Total: ${((performance.now() - start) / 1000).toFixed(2)}s`);
                        console.log(movesScramble)
                        
                }
        }        

        if (scramMoves && !solMoves) {
                
                if (loop) {

                while (loop) {
                        await wait(500);
                        // Scramble
                        parserAndRunnerVisual(scramMoves, true);
                        
                        await runTheBitch(0, true)

                        await wait(500)
                        
                        await reverseOldMoves()
                        await reverseMovesRun(false);
                        await reverseMovesRun(true);
                }

                } else {
                        await parserAndRunnerVisual(scramMoves, true); // I have it at the start of the function and i forgor because im stupid and dumb
                        await runTheBitch(0, true)
                }
                //console.warn("In if statment")
                //console.log(movesScramble)
        }

        if (!scramMoves && solMoves) {
                
                let h = 1
                
                if (loop) {

                while (loop) {
                        await wait(500);
                        parserAndRunnerVisual(solMoves, false)
                        // Solve
                        let start = performance.now();
                        await runTheBitch(tps, false)
                        console.log(`Total: ${((performance.now() - start))}mss${h}`);
                        h++;

                        await wait(500)
                        
                        await reverseOldMoves()
                        await reverseMovesRun(false);
                        await reverseMovesRun(true);
                }

                } else {
                        // Solve
                        await parserAndRunnerVisual(solMoves, false)
                        await runTheBitch(tps, false)
                }

        }


}       


async function makeReadableCodeFromShittyInput() {
        console.warn("Button pressed")
        let scramble = document.getElementById('sramleInput').value;
        let solution = document.getElementById('solutionInput').value;

        if (scramble) {
                scramble = scramble.match(/[RUFBLDMSErufbldxyz][2']?/g); // I LOVE REGEX THANK YOU CLAUDE FOR THIS IDK WHAT THIS MEANS
                scramble = scramble.join(" ")
        }

        if (solution) {
                solution = solution.match(/[RUFBLDMSErufbldxyz][2']?/g);
                solution = solution.join(" ")
        }
        // Makes an array split 

        // Rejoins them into a string

        //console.warn("In makecodereadable")
        //console.log(movesScramble)
        await inputRunner(scramble, solution);
        
}

async function reverseOldMoves() {
        let fn;
        let firstParamVar;

        scrambleMovesReverse = movesScramble.map(fn => ({
                moveName: fn.moveName,
                firstParam: fn.firstParam
        }));
        solutionMovesReverse = movesSolution.map(fn => ({
                moveName: fn.moveName,
                firstParam: fn.firstParam
        }));

        scrambleMovesReverse.reverse()
        scrambleMovesReverse.forEach((move, i) => {
                console.log(move.moveName, move.firstParam) // ← what does this show?
                if (move.firstParam === 1) { 
                        // Reads the added things and then uses that to do the revese 1 -> 3, 3 -> 1
                        firstParamVar = 3;
                } else if (move.firstParam === 3) {
                        firstParamVar = 1;
                } else {
                        firstParamVar = 2;
                }

                const moveMap = {
                        R, L, U, D, F, B,
                        r, l, u, d, f, b,
                        M, E, S,
                        x, y, z
                };

                const moveFn = moveMap[move.moveName];

                if (moveFn) {
                        const param = firstParamVar;
                        fn = () => moveFn(param);
                        fn.firstParam = firstParamVar;
                        fn.moveName = move.moveName;
                        scrambleMovesReverse[i] = fn;
                }
                // Bro how am i going to do this shit bro
        })
        solutionMovesReverse.reverse()
        solutionMovesReverse.forEach((move, i) => {
                if (move.firstParam === 1) { 
                        // Reads the added things and then uses that to do the revese 1 -> 3, 3 -> 1
                        firstParamVar = 3;
                } else if (move.firstParam === 3) {
                        firstParamVar = 1;
                } else {
                        firstParamVar = 2;
                }

                const moveMap = {
                        R, L, U, D, F, B,
                        r, l, u, d, f, b,
                        M, E, S,
                        x, y, z
                };

                const moveFn = moveMap[move.moveName];

                if (moveFn) {
                        const param = firstParamVar;
                        fn = () => moveFn(param);
                        fn.firstParam = firstParamVar;
                        fn.moveName = move.moveName;
                        solutionMovesReverse[i] = fn;
                }
                // Bro how am i going to do this shit bro
        })
        //console.warn("MOVESCRAMBLE IN REVERSE OLD MOVES")
        //console.log(movesScramble);
        // I thinks it works with scramble
        // NOW I NEED TO DO IT WITH SOLUTION
        // FUCK
        // (its really i just cant be asked)

        // do i make the scrambles a diffrent array and so that there could be a setting to not have them as rn its kinda dumb.
        // Also i want it so that i can stop it.
}