import { parserAndRunnerVisual, runTheBitch } from "./converterAndRunner.js"
import { wait } from "./utils.js"

document.querySelector("button").addEventListener("click", getSrambleInput);

export async function getSrambleInput() {
        let loop, scram, sol, scramMoves, solMoves, tps;

        loop = document.getElementById('loop').checked;
        scramMoves = document.getElementById('sramleInput').value;
        solMoves = document.getElementById('solutionInput').value;
        tps = Number(document.getElementById('TPSInput').value);

        if (!scramMoves) { scram = false; } else { scram = true; }
        if (!solMoves) { sol = false; } else { sol = true;}

        if (tps > 30 ) { 
                alert("Over 30 tps")
                return;
        }

        tps = 1000 / tps;

        if (scram && sol) { 
                if (loop) {
                        
                        while (loop) {
                                // Scramble
                                parserAndRunnerVisual(scramMoves, true);
                                await runTheBitch(0, true)

                                // Wait
                                await wait(2000);
                                console.log(tps)

                                let start = performance.now();
                                // Solve
                                parserAndRunnerVisual(solMoves, false)
                                await runTheBitch(tps, false)
                                console.log(`Total: ${((performance.now() - start) / 1000).toFixed(2)}s`);

                                await wait(1000)
                        }
                }
        }        

        if (scram && !sol) {
                // Scramble
                parserAndRunnerVisual(scramMoves, true);
                await runTheBitch(0, true)
        }

        if (!scram && sol) {
                // Solve
                parserAndRunnerVisual(solMoves, false)
                await runTheBitch(tps, false)
        }


}       