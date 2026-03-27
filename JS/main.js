import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { parser } from "./converterAndRunner.js"
import { wait } from "./utils.js"
console.log("The eggs are at ./egg.jpg")



renderer.setAnimationLoop(rotateOnDrag);

await wait(5000)

async function WR() {
        L(1); B(1); R(2); B(3); R(2); U(2); F(1); D(1); R(2); U(1); R(2); F(2); D(2); R(1); U(1); B(1); L(2);
        x(3);



        await wait(2000);

        // 3xxx cross or what ever
        r(3); await wait(95);
        U(1); await wait(95);
        F(1); await wait(95);
        U(3); await wait(95);
        r(1); await wait(95);
        U(3); await wait(95);
        r(3); await wait(95);
        U(2); await wait(95);
        r(3); await wait(95);
        U(1); await wait(95);
        r(1); await wait(95);

        // 4th pair
        R(1); await wait(95);
        U(2); await wait(95);
        R(2); await wait(95);
        U(3); await wait(95);
        R(1); await wait(95);
        U(1); await wait(95);
        R(1); await wait(95);
        U(2); await wait(95);
        R(3); await wait(95);

        // OLL >> PLL Skip
        U(3); await wait(95);
        F(3); await wait(95);
        r(1); await wait(95);
        U(1); await wait(95);
        R(3); await wait(95);
        U(3); await wait(95);
        r(3); await wait(95);
        F(1); await wait(95);
        R(1); 
        x(2);
        await wait(2000);
        WR();
}

async function betterWR() {
        parser("L B R2 B' R2 U2 F D R2 U R2 F2 D2 R U B L2", 0);

        await wait(2000);

        parser("x' r' U F U' r U' r' U2 r' U r R U2 R2 U' R U R U2 R' U' F' r U R' U' r' F R", 95)
}
betterWR()






