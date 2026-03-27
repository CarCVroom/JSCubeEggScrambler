import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
console.log("The eggs are at ./egg.jpg")

function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}


renderer.setAnimationLoop(rotateOnDrag);

await wait(5000)

L(1); B(1); R(2); B(3); R(2); U(2); F(1); D(1); R(2); U(1); R(2); F(2); D(2); R(1); U(1); B(1); L(2);

x(3);

await wait(2000);

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

// ZBLL
U(3); await wait(95);
F(3); await wait(95);
r(1); await wait(95);
U(1); await wait(95);
R(3); await wait(95);
U(3); await wait(95);
r(3); await wait(95);
F(1); await wait(95);
R(1);






