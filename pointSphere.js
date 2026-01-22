import * as THREE from 'three';

// creating three.js renderer, scene, and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('widGraphic').appendChild( renderer.domElement );

const numPoints = 400; 

// generating numPoints points across the shape of a sphere
const points = [];
for (let i = 0; i < numPoints; i++) {

    const spherePointSize = 1.4; // essentially a scale factor, also can be seen as radius of the sphere
    
    // geometry and trigonometry used for generating a latitude and longitude for the points
    const theta = Math.acos(1 - 2 * (i + 0.5) / numPoints);
    const phi = Math.PI * (1 + Math.sqrt(5)) * i; 
    const x = Math.sin(theta) * Math.cos(phi) * spherePointSize;
    const y = Math.sin(theta) * Math.sin(phi) * spherePointSize;
    const z = Math.cos(theta) * spherePointSize;
    points.push(new THREE.Vector3(x, y, z));
}

// Optionally visualize the points
const pointsGeometry = new THREE.BufferGeometry().setFromPoints(points);
const pointsMaterial = new THREE.PointsMaterial({ color: 0xababab, size: 0.05 });
const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
scene.add(pointsMesh);

// set camera aback to see point sphere
camera.position.z = 5;

// animate the renderer and rotate the point mesh
function animate() {
    renderer.render( scene, camera );
    pointsMesh.rotation.x += 0.0065;
    pointsMesh.rotation.y += 0.0035;
    // pointsMesh.rotation.z += 0.005;
}

// call animation loop
renderer.setAnimationLoop( animate );

// function for breathing effect on sphere scale
function breathe(){
    requestAnimationFrame(breathe);

    // uses sine waves and js datetime millisecond stamp to create a breathing effect
    pointsMesh.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.2; 
    pointsMesh.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.2; 
    pointsMesh.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.2;
}

function handleResize() {
    if (window.innerWidth < 900) {
        renderer.setSize(window.innerWidth - 10, window.innerHeight);
        camera.aspect = (window.innerWidth - 10) / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

window.addEventListener('resize', handleResize);
handleResize();

breathe();