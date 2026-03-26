import { renderer, scene, camera , cube, animate } from "./renderer.js"
console.log("The eggs are at ./egg.jpg")

camera.position.z = 5;

renderer.setAnimationLoop(animate);