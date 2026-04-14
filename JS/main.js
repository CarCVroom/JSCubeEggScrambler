import { renderer, scene, camera,  rotateOnDrag , R, U, F, B, D, L, x, y, z, r, l, u, d, f, b, M, S, E  } from "./renderer.js"
import { parserAndRunnerVisual, runTheBitch, movesScramble, movesSolution } from "./converterAndRunner.js"
import { wait } from "./utils.js"
import { inputRunner } from './input.js';
console.log("The eggs are at ./assets/egg-BGdf_5a1.png")



renderer.setAnimationLoop(rotateOnDrag);

