let camera, scene, renderer;
let geometry, mesh;
let material;
let controls;

init();

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#ffffff");
  document.body.appendChild(renderer.domElement);

  let texture = new THREE.TextureLoader().load("img_1.jpeg");
  material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  geometry = new THREE.SphereGeometry(1000, 64, 64);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    45,
    30000
  );
  camera.position.set(0, 0, 500);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.minDistance = 100;
  controls.maxDistance = 700;
  controls.enablePan = false;
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1.0;
}

animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // console.log(a1 + "  " + a2 + "  " + l);
  // console.log(light.))
}
