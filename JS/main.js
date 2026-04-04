import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { parserAndRunnerVisual, runTheBitch } from "./converterAndRunner.js"
import { wait } from "./utils.js"
console.log("The eggs are at ./egg.jpg")



renderer.setAnimationLoop(rotateOnDrag);

await wait(5000)
console.log("time is up")


async function betterWR() {
        await parserAndRunnerVisual("L B R2 B' R2 U2 F D R2 U R2 F2 D2 R U B L2", 0);

        await wait(2000);

        await parserAndRunnerVisual("x' r' U F U' r U' r' U2 r' U r R U2 R2 U' R U R U2 R' U' F' r U R' U' r' F R", 70)

        await wait(1000);
        await parserAndRunnerVisual("x2");
        betterWR();
}

async function betterBetterWR() { // 63 tps
        let start = performance.now();
        let j = 1;
        let KeepRunning = true;

        // 100 random moves * 200, 10000 moves/ rotations
        //await parserAndRunnerVisual("R U2 f' M x L2 d B' y r U' S E2 F l' z D2 b U M' R2 y' f U2 x' L b' S2 r' D E' z2 u F' R d2 B x U' l E2 M' y2 f' R2 U b z' D' S u2 L' x2 r F M2 y' B2 d' U2 z E l2 f x' R' S2 u B' M d2 y L U' z2 r2 F' E' b x U M' S' D2 f2 R y2 l' U b' x2 z F2 d E2 r' S L' U2 M b2 y' R' f' x z2 D' u E' B2 l2 S' R2")
        // 100 Jperms + auf = 1414 moves.
        //await parserAndRunnerVisual("R U R' F' R U R' U' R' F R2 U' R' U'")
        await parserAndRunnerVisual("B F D2 B2 F' D2 L' F' D U R' B R' D' F U' L2 B2")


        //while (KeepRunning) {
                await runTheBitch();
                //await wait(1500)
        //        if (j === 100) { KeepRunning = false }
        //        j++;
        //        console.log(j)
        //}
        console.log(`Total: ${((performance.now() - start) / 1000).toFixed(2)}s`);
}
betterBetterWR();


