let camera, scene, renderer;
let geometry, mesh;
let material;
let controls;
let step;
var pointerState;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var buttonPlaneList = new Array();
var buttonList = new Array();

init();
render();
window.addEventListener("pointerdown", ClickButton);
window.addEventListener("pointermove", GetButton);

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#ffffff");
  document.body.appendChild(renderer.domElement);

  let texture = new THREE.TextureLoader().load("img/01.jpg");
  // texture.flipX=false;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  geometry = new THREE.SphereGeometry(500, 64, 64);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    45,
    30000
  );
  camera.position.set(0, 0, 250);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.minDistance = 250;
  controls.maxDistance = 250;
  controls.enablePan = false;

  step = 1;
  CreateButton(step);
}
function CheckStep() {}

function GetButton(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(buttonPlaneList);
  for (var i = 0; i < intersects.length; i++) {
    for (var j = 0; j < buttonPlaneList.length; j++) {
      if (intersects[i].object.name===buttonPlaneList[j].name) {
        console.log(buttonPlaneList[j].name);
      }
    }
  }
}

function ClickButton(event) {}

function CreateButton(step) {
  switch (step) {
    case 1:
      const geometry = new THREE.PlaneGeometry(50, 50);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 0, 0);
      plane.name="buttonPlaneList_0";

      buttonPlaneList.push(plane);
      scene.add(plane);
      plane.visible=false；

      break;

    default:
      break;
  }
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
