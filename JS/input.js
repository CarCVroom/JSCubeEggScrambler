import { scanlines } from "three/examples/jsm/tsl/display/CRT.js";

document.querySelector("button").addEventListener("click", getSrambleInput);

export function getSrambleInput() {
        let loop, scram, sol, scramMoves, solMoves, tps;

        loop = document.getElementById('loop').checked;
        scramMoves = document.getElementById('sramleInput').value;
        solMoves = document.getElementById('solutionInput').value;

        if (!scramMoves) {
                scram = false;
        }
        if (!solMoves) {
                sol = false;
        }

        return [loop, scram , sol, scramMoves, solMoves, tps]
}       