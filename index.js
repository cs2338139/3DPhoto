let camera, scene, renderer;
let mesh;
let materials = new Array();
let controls;
let step;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var buttonPlaneList = new Array();
var buttonList = new Array();

init();
helper();
render();
window.addEventListener("pointermove", OverButton);
window.addEventListener("pointerdown", ClickButton);

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#ffffff");
  document.body.appendChild(renderer.domElement);

  for (var i = 1; i < 7; i++) {
    var addressTemp = "img/0n.jpg";
    var address = addressTemp.replace("n", i);
    let texture = new THREE.TextureLoader().load(address);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;

    let material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });

    materials.push(material);
  }

  let geometry = new THREE.SphereGeometry(500, 64, 64);
  mesh = new THREE.Mesh(geometry, materials[0]);
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

  step = 0;
  ChangeMaterial(step);
  CreateButton(step);
}

function ChangeMaterial(step) {
  mesh.material = materials[step];
}

function CreateButton(step) {
  switch (step) {
    case 0:
      const geometry = new THREE.PlaneGeometry(100, 200);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(200, -400, 50);
      plane.rotateY(Math.PI / 2.57142857143);
      plane.rotateX(Math.PI / 2);
      plane.name = "buttonPlaneList_0";

      buttonPlaneList.push(plane);
      scene.add(plane);
      plane.visible = true;
      plane.layers.enable(1);

      break;

    default:
      break;
  }
}

function OverButton(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  raycaster.layers.set(1);

  const intersects = raycaster.intersectObjects(buttonPlaneList);
  for (var i = 0; i < intersects.length; i++) {
    for (var j = 0; j < buttonPlaneList.length; j++) {
      if (intersects[i].object.name === buttonPlaneList[j].name) {
        console.log(buttonPlaneList[j].name);
      }
    }
  }
}

function ClickButton(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  raycaster.layers.set(1);

  const intersects = raycaster.intersectObjects(buttonPlaneList);
  for (var i = 0; i < intersects.length; i++) {
    for (var j = 0; j < buttonPlaneList.length; j++) {
      if (intersects[i].object.name === buttonPlaneList[j].name) {
        // ForwardsMove(buttonPlaneList[j]);

        break;
      }
    }
  }
}

function helper() {
  var grid = new THREE.GridHelper(1000, 10, 0xff0000, 0x000000);
  grid.material.opacity = 1;
  grid.material.transparent = true;
  grid.position.set(0, -300, 0);
  scene.add(grid);

  var axesHelper = new THREE.AxesHelper(100);
  axesHelper.position.set(0, -300, 0);
  scene.add(axesHelper);

  const dir = new THREE.Vector3(1, 2, 0);
  dir.normalize();

  const origin = new THREE.Vector3(0, 0, 0);
  const length = 100;
  const hex = 0xffff00;

  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  arrowHelper.position.set(0, -300, 0);
  scene.add(arrowHelper);
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
