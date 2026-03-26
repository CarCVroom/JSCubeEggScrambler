import * as THREE from 'three';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00 } );
export const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

export function animate( time ) {
        cube.rotation.x = time / 2000;
        cube.rotation.y = time / 1000;
        renderer.render(scene, camera);
}