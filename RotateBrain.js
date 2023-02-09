// Load Three.js and GLTFLoader libraries
var THREE = require('three');
var GLTFLoader = require('three-gltf-loader');

// Initialize Three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Load the GLTF file using GLTFLoader
var loader = new GLTFLoader();
loader.load('brain.gltf', function (gltf) {
  var brain = gltf.scene.children[0];
  scene.add(brain);
  brain.position.set(0, 0, 0);
  brain.rotation.x = 0.5;
});

// Set camera position
camera.position.z = 5;

// Define the start and end colors
var startColor = new THREE.Color(0xff0000);
var endColor = new THREE.Color(0x00ff00);

// Animate the scene
var animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  scene.rotation.y += 0.01;

  // Calculate the interpolated color
  var t = (Math.sin(scene.rotation.y) + 1) / 2;
  var color = new THREE.Color().lerp(startColor, endColor, t);

  // Set the color of the brain model
  scene.children[0].material.color = color;
};

animate();
