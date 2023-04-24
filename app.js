const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.OrthographicCamera(
  -width / 2, width / 2,
  height / 2, -height / 2,
  0.1, 1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const aspectRatio = window.innerWidth / window.innerHeight;
const geometry = new THREE.PlaneBufferGeometry(width, height);
const clock = new THREE.Clock();

const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 }
  },
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
});

camera.position.z = 100;
const plane = new THREE.Mesh(geometry, material);
scene.add(plane); 

camera.position.z = 2;

function animate() {
  // Update time uniform
  material.uniforms.time.value = clock.getElapsedTime();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const newAspectRatio = width / height;
  plane.scale.x = newAspectRatio;

  renderer.setSize(width, height);
}

window.addEventListener('resize', onWindowResize, false);


animate();

