import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { parser } from "./converterAndRunner.js"
import { wait } from "./utils.js"
console.log("The eggs are at ./egg.jpg")



renderer.setAnimationLoop(rotateOnDrag);

await wait(5000)


async function betterWR() {
        await parser("L B R2 B' R2 U2 F D R2 U R2 F2 D2 R U B L2", 0);

        await wait(2000);

        await parser("x' r' U F U' r U' r' U2 r' U r R U2 R2 U' R U R U2 R' U' F' r U R' U' r' F R", 70)

        await wait(1000);
        await parser("x2");
        betterWR();
}
betterWR()






