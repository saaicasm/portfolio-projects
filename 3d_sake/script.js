// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvasContainer').appendChild(renderer.domElement);

// Add OrbitControls for interactivity
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth damping (inertia)
controls.dampingFactor = 0.05;
controls.enableZoom = true;    // Allow zooming with mouse wheel

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Set the camera position
camera.position.z = 5;

// Background color control
const bgColorInput = document.getElementById('bgColor');
bgColorInput.addEventListener('input', function() {
  renderer.setClearColor(this.value);
});

// Load the OBJ model when the button is clicked
document.getElementById('loadModel').addEventListener('click', function() {
  const loader = new THREE.OBJLoader();
  loader.load(
    'bugatti.obj', // Path to your OBJ file in the root folder
    function (object) {
      scene.add(object);
      document.getElementById('modelStatus').innerText = 'Model loaded successfully!';
    },
    function (xhr) {
      document.getElementById('modelStatus').innerText = `${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`;
    },
    function (error) {
      document.getElementById('modelStatus').innerText = 'An error occurred while loading the model.';
    }
  );
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
