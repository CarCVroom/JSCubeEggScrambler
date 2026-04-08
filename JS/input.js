import { parserAndRunnerVisual, runTheBitch } from "./converterAndRunner.js"
import { wait } from "./utils.js"

document.querySelector("button").addEventListener("click", getSrambleInput);

export async function getSrambleInput() {
        let loop, scram, sol, scramMoves, solMoves, tps;

        loop = document.getElementById('loop').checked;
        scramMoves = document.getElementById('sramleInput').value;
        solMoves = document.getElementById('solutionInput').value;
        tps = Number(document.getElementById('TPSInput').value);

        if (!tps) {
                alert("Enter a tps");
                return;
        }

        if (!scramMoves) { scram = false; } else { scram = true; }
        if (!solMoves) { sol = false; } else { sol = true;}

        if (tps > 30 ) { 
                alert("Over 30 tps")
                return;
        }

        tps = 1000 / tps;
        console.log(tps) //x' r' U F U' r U' r' U2 r' U r R U2 R2 U' R U R U2 R' U' F' r U R' U' r' F R
        console.log(`Scramble: ${scramMoves}, Solution: ${solMoves}`)

        if (scram && sol) { 
                if (loop) {
                        await parserAndRunnerVisual(scramMoves, true);
                        await parserAndRunnerVisual(solMoves, false); // Gets the moves now, and then runs them without computing them

                        while (loop) {
                                // Scramble
                                await runTheBitch(0, true)

                                // Wait
                                await wait(2000);

                                let start = performance.now();
                                // Solve
                                await runTheBitch(tps, false)
                                console.log(`Total: ${((performance.now() - start) / 1000).toFixed(2)}s`);

                                await wait(1000)
                        }
                } else {
                        parserAndRunnerVisual(scramMoves, true);
                        parserAndRunnerVisual(solMoves, false); // Gets the moves now, and then runs them without computing them
                        
                        // Scramble
                        await runTheBitch(0, true)

                        // Wait
                        await wait(2000);
                        console.log(tps)

                        let start = performance.now();
                        // Solve
                        await runTheBitch(tps, false)
                        console.log(`Total: ${((performance.now() - start) / 1000).toFixed(2)}s`);
                }
        }        

        if (scram && !sol) {
                if (loop) {

                while (loop) {
                        // Scramble
                        parserAndRunnerVisual(scramMoves, true);
                        await runTheBitch(0, true)

                        await wait(1000)
                }

                } else {
                        // Scramble
                        parserAndRunnerVisual(scramMoves, true);
                        await runTheBitch(0, true)
                }
        }

        if (!scram && sol) {
                
                await parserAndRunnerVisual(solMoves, false)
                let h = 1
                
                if (loop) {

                while (loop) {
                        // Solve
                        let start = performance.now();
                        await runTheBitch(tps, false)
                        console.log(`Total: ${((performance.now() - start))}mss${h}`);
                        h++;

                        await wait(1000)
                }

                } else {
                        // Solve
                        await runTheBitch(tps, false)
                }

        }


}       