import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const scene = new THREE.Scene();


export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 10)
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
                        
                        border.scale.setScalar(1.005); // slightly bigger
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

// Outer turns
export function R(numberAfterLetter) {
        
        const worldPos = new THREE.Vector3();   

        const pivotPoint = new THREE.Object3D()
        pivotPoint.position.set(0, 0, 0)

        cubies.forEach(element => {
                element.getWorldPosition(worldPos);
                if (Math.abs(worldPos.x - 1) < 0.01) { // selects all on the x === 1 side
                        pivotPoint.add(element);
                }
        });

        pivotPoint.rotation.x = -Math.PI / 2 * numberAfterLetter;
        scene.add(pivotPoint)

        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}

export function U(numberAfterLetter) {

        const worldPos = new THREE.Vector3();   

        const pivotPoint = new THREE.Object3D()
        pivotPoint.position.set(0, 0, 0)

        cubies.forEach(element => {
                element.getWorldPosition(worldPos);
                if (Math.abs(worldPos.y - 1) < 0.01) { // selects all on the y === 1 side
                        pivotPoint.add(element);
                }
        });

        pivotPoint.rotation.y = -Math.PI / 2 * numberAfterLetter;
        scene.add(pivotPoint);

        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}
export function F(numberAfterLetter) {

        const worldPos = new THREE.Vector3();   

        const pivotPoint = new THREE.Object3D()
        pivotPoint.position.set(0, 0, 0)

        cubies.forEach(element => {
                element.getWorldPosition(worldPos);
                if (Math.abs(worldPos.z - 1) < 0.01) { // selects all on the z === 1 side
                        pivotPoint.add(element);
                }
        });

        pivotPoint.rotation.z = -Math.PI / 2 * numberAfterLetter;
        scene.add(pivotPoint);

        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}
export function B(numberAfterLetter) {

        const worldPos = new THREE.Vector3();   
        
        // Makes an object to twist around
        const pivotPoint = new THREE.Object3D() 
        pivotPoint.position.set(0, 0, 0)

        // Adds all of the B side pieces to the object
        cubies.forEach(element => {
                element.getWorldPosition(worldPos);
                if (Math.abs(worldPos.z + 1) < 0.01) { // selects all on the z === -1 side
                        pivotPoint.add(element);
                }
        });

        // Twists them
        pivotPoint.rotation.z = Math.PI / 2 * numberAfterLetter;
        scene.add(pivotPoint);

        // Removes the cubies from the object so that they can be used by other moves later
        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}
export function L(numberAfterLetter) {

        const worldPos = new THREE.Vector3();   
        
        // Makes an object to twist around
        const pivotPoint = new THREE.Object3D() 
        pivotPoint.position.set(0, 0, 0)

        // Adds all of the B side pieces to the object
        cubies.forEach(element => {
                element.getWorldPosition(worldPos);
                if (Math.abs(worldPos.x + 1) < 0.01) { // selects all on the z === -1 side
                        pivotPoint.add(element);
                }
        });

        // Twists them
        pivotPoint.rotation.x = Math.PI / 2 * numberAfterLetter;
        scene.add(pivotPoint);

        // Removes the cubies from the object so that they can be used by other moves later
        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}
export function D(numberAfterLetter) {

        const worldPos = new THREE.Vector3();   
        
        // Makes an object to twist around
        const pivotPoint = new THREE.Object3D() 
        pivotPoint.position.set(0, 0, 0)

        // Adds all of the B side pieces to the object
        cubies.forEach(element => {
                element.getWorldPosition(worldPos);
                if (Math.abs(worldPos.y + 1) < 0.01) { // selects all on the z === -1 side
                        pivotPoint.add(element);
                }
        });

        // Twists them
        pivotPoint.rotation.y = Math.PI / 2 * numberAfterLetter;
        scene.add(pivotPoint);

        // Removes the cubies from the object so that they can be used by other moves later
        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}

// Rotations
export function x(numberAfterLetter) {

        const pivotPoint = new THREE.Object3D();
        pivotPoint.position.set(0, 0, 0);

        cubies.forEach(element => {
                pivotPoint.add(element);     
        });

        pivotPoint.rotation.x = -Math.PI / 2 * numberAfterLetter;

        // Removes the cubies from the object so that they can be used by other moves later
        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}
export function y(numberAfterLetter) {

        const pivotPoint = new THREE.Object3D();
        pivotPoint.position.set(0, 0, 0);

        cubies.forEach(element => {
                pivotPoint.add(element);     
        });

        pivotPoint.rotation.y = -Math.PI / 2 * numberAfterLetter;

        // Removes the cubies from the object so that they can be used by other moves later
        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}
export function z(numberAfterLetter) {

        const pivotPoint = new THREE.Object3D();
        pivotPoint.position.set(0, 0, 0);

        cubies.forEach(element => {
                pivotPoint.add(element);     
        });

        pivotPoint.rotation.z = -Math.PI / 2 * numberAfterLetter;

        // Removes the cubies from the object so that they can be used by other moves later
        let children = Array.prototype.slice.call(pivotPoint.children)
        children.forEach(cubie => {
                scene.attach(cubie)
        });
        scene.remove(pivotPoint);
        renderer.render(scene, camera)
}

// Wide moves
export function r(numberAfterLetter) {
        L(numberAfterLetter);
        x(numberAfterLetter)
}
export function l(numberAfterLetter) {
        R(numberAfterLetter);
        if (numberAfterLetter === 1) {
                numberAfterLetter = 3;
        } else if (numberAfterLetter === 3) {
                numberAfterLetter = 1;
        } else {
                numberAfterLetter = 2;
        }
        x(numberAfterLetter)
}
export function u(numberAfterLetter) {
        D(numberAfterLetter);
        y(numberAfterLetter)
}
export function d(numberAfterLetter) {
        U(numberAfterLetter);
        if (numberAfterLetter === 1) {
                numberAfterLetter = 3;
        } else if (numberAfterLetter === 3) {
                numberAfterLetter = 1;
        } else {
                numberAfterLetter = 2;
        }
        y(numberAfterLetter)
}
export function f(numberAfterLetter) {
        B(numberAfterLetter);
        z(numberAfterLetter)
}
export function b(numberAfterLetter) {
        F(numberAfterLetter);
        if (numberAfterLetter === 1) {
                numberAfterLetter = 3;
        } else if (numberAfterLetter === 3) {
                numberAfterLetter = 1;
        } else {
                numberAfterLetter = 2;
        }
        z(numberAfterLetter)
}

// M moves
export function M(numberAfterLetter) {
        if (numberAfterLetter >= 4) {return 1;}
        R(numberAfterLetter);
        if (numberAfterLetter === 1) {
                numberAfterLetter = 3;
        } else if (numberAfterLetter === 3) {
                numberAfterLetter = 1;
        } else {
                numberAfterLetter = 2;
        }
        L(numberAfterLetter)
        x(numberAfterLetter)
}
export function S(numberAfterLetter) {
        if (numberAfterLetter >= 4) {return 1;}
        B(numberAfterLetter)
        z(numberAfterLetter)
        if (numberAfterLetter === 1) {
                numberAfterLetter = 3;
        } else if (numberAfterLetter === 3) {
                numberAfterLetter = 1;
        } else {
                numberAfterLetter = 2;
        }
        F(numberAfterLetter);
}
export function E(numberAfterLetter) {
        if (numberAfterLetter >= 4) {return 1;}
        U(numberAfterLetter);
        if (numberAfterLetter === 1) {
                numberAfterLetter = 3;
        } else if (numberAfterLetter === 3) {
                numberAfterLetter = 1;
        } else {
                numberAfterLetter = 2;
        }
        D(numberAfterLetter)
        y(numberAfterLetter)
}
renderer.render(scene, camera)