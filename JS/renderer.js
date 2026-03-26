import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const scene = new THREE.Scene();


export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0);

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Dumb stupid line
//const material = new THREE.LineBasicMaterial( { color: 0x0000ff} );

// Makes 3 points at different posisons
//const points = [];
//points.push( new THREE.Vector3( -10, 0, 0));
//points.push( new THREE.Vector3(  0, 10, 0));
//points.push( new THREE.Vector3(  10, 0, 0));

// Makes it so that the GPU can read it
//const geometry = new THREE.BufferGeometry().setFromPoints(points);

// Draws line from the geometry using the material
//const line = new THREE.Line( geometry, material);



// ****** CUBE ******
const materials = [ // colors
        new THREE.MeshBasicMaterial({ color: 0xFF1100 }), // right
        new THREE.MeshBasicMaterial({ color: 0xFF6600 }), // left
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), // top
        new THREE.MeshBasicMaterial({ color: 0xFFEE00 }), // bottom
        new THREE.MeshBasicMaterial({ color: 0x00DD00 }), // front
        new THREE.MeshBasicMaterial({ color: 0x0055FF }), // back
];

const geometryCube = new THREE.BoxGeometry(1, 1, 1); 
const cubies = [];

for(let x = -1; x <= 1; x++) {
        for(let y = -1; y <= 1; y++) {
                for(let z = -1; z <= 1; z++) {
                        if (x === 0 && y === 0 && z === 0) continue;

                        const cubie = new THREE.Mesh(geometryCube, materials);
                        cubie.position.set(x, y, z);
                        const borderGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
                        const borderMat = new THREE.LineBasicMaterial({ color: 0x000000});

                        const border = new THREE.LineSegments(borderGeo, borderMat);
                        border.scale.setScalar(1.01); // slightly bigger
                        cubie.add(border); // attach to cubie so it moves with it
                        scene.add(cubie);
                        cubies.push(cubie);
                }
        }
}

const controls = new OrbitControls(camera, renderer.domElement);

//export function animate( time ) {
//        cube.rotation.x = time / 2000;
//        cube.rotation.y = time / 1000;
//        renderer.render(scene, camera);
//}


export function rotateOnDrag() {
        controls.update();
        renderer.render(scene, camera);
}

renderer.render(scene, camera)