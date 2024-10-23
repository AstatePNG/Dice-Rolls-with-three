import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 300 );
camera.position.set(0,.5,4);

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

document.body.appendChild( renderer.domElement );

const light = new THREE.PointLight(0xffffff, 30, 200);
light.position.set(0,.5,4);
light.castShadow = true;
scene.add(light);

light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;


const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );

const texture = new THREE.TextureLoader().load("../images/pimped.jpg");
texture.repeat.set( 4, 4 );
const pimpedMaterial = new THREE.MeshStandardMaterial( { map: texture } );

const d6geometry = new THREE.BoxGeometry( 1, 1, 1 );
const six = new THREE.Mesh( d6geometry, material );
six.receiveShadow = true;
six.position.set(0, .7, 0);
scene.add( six );

const d12geometry = new THREE.DodecahedronGeometry();
const twelve = new THREE.Mesh( d12geometry, pimpedMaterial );
twelve.receiveShadow = true;
twelve.position.set(-2, .7, -3);
scene.add( twelve );

const d20geometry = new THREE.IcosahedronGeometry();
const twenty = new THREE.Mesh( d20geometry, material );
twenty.receiveShadow = true;
twenty.position.set(2, .7, -3);
scene.add( twenty );

const d8geometry = new THREE.OctahedronGeometry();
const eight = new THREE.Mesh( d8geometry, material );
eight.receiveShadow = true;
eight.position.set(2, -1.7, -3);
scene.add( eight );

const d4geometry = new THREE.TetrahedronGeometry();
const four = new THREE.Mesh( d4geometry, material );
four.receiveShadow = true;
four.position.set(-2, -1.7, -3);
scene.add( four );


const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const d10geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );

// const d10geometry = new THREE.OctahedronGeometry();
const ten = new THREE.Mesh( d10geometry, material );
ten.receiveShadow = true;
ten.position.set(0, -10.7, -50);
scene.add( ten );



camera.position.z = 5;

function animate() {
    six.rotation.x += 0.01;
    six.rotation.y += 0.01;
    twelve.rotation.x += 0.01;
    twelve.rotation.y += 0.01;
    twenty.rotation.x += 0.01;
    twenty.rotation.y += 0.01;
    eight.rotation.x += 0.01;
    eight.rotation.y += 0.01;
    four.rotation.x += 0.01;
    four.rotation.y += 0.01;
    ten.rotation.x += 0.01;
    ten.rotation.y += 0.01;
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

window.addEventListener("resize", ()=> {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
})