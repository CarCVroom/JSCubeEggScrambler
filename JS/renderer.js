import * as THREE from 'three';

export const scene = new THREE.Scene();


export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0);

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.LineBasicMaterial( { color: 0x0000ff} );

// Makes 3 points at different posisons
const points = [];
points.push( new THREE.Vector3( -10, 0, 0));
points.push( new THREE.Vector3(  0, 10, 0));
points.push( new THREE.Vector3(  10, 0, 0));

// Makes it so that the GPU can read it
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// Draws line from the geometry using the material
const line = new THREE.Line( geometry, material);





// ****** CUBE ******
const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshBasicMaterial( {color: 0x00ff00 } );
export const cube = new THREE.Mesh(geometryCube, materialCube);
scene.add(cube);
export function animate( time ) {
        cube.rotation.x = time / 2000;
        cube.rotation.y = time / 1000;
        renderer.render(scene, camera);
}

scene.add( line );
renderer.render(scene, camera)