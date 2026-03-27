import { renderer, scene, camera,  rotateOnDrag , moveAPiece  } from "./renderer.js"
console.log("The eggs are at ./egg.jpg")


renderer.setAnimationLoop(rotateOnDrag);

moveAPiece()
