import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { parserVisual, runTheBitch, movesScramble, movesSolution, reverseMovesRun } from "./parserAndRunner.js"
import { wait } from "./utils.js"
import { inputRunner } from './input.js';
console.log("The eggs are at ./assets/egg-BGdf_5a1.png")



renderer.setAnimationLoop(rotateOnDrag);

