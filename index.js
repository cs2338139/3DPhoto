let camera, scene, renderer;
let mesh;
let materials = new Array();
let controls;
let step;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var buttonList = new Array();
// var buttonData = [
//   {
//     "PosX":,
//     "PosY":,
//     "PosZ":,
//     "RoationX":,
//     "RoationY":.
//     "RoationZ":,
//     "Step":,
//     "ToGo":
//   }
// ];

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

  for (var i = 0; i <= 5; i++) {
    const addressTemp = "img/0n.jpg";
    const address = addressTemp.replace("n", i);
    const texture = new THREE.TextureLoader().load(address);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });

    materials.push(material);
  }

  const geometry = new THREE.SphereGeometry(500, 64, 64);
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

  CreateButton();

  step = 0;
  ChangeMaterial(step);
  ChangeButton(step);
}

function CreateButton() {
  const arrowButtonTexture = new THREE.TextureLoader().load("img/arrow.png");
  const arrowButtonGeometry = new THREE.PlaneGeometry(200, 200);
  const arrowButtonMaterial = new THREE.MeshBasicMaterial({
    map: arrowButtonTexture,
    transparent: true,
    side: THREE.BackSide,
  });
  arrowButton = new THREE.Mesh(arrowButtonGeometry, arrowButtonMaterial);

  var newButton_00 = arrowButton;
  newButton_00.name = "1";
  newButton_00.position.set(200, -400, 50);
  newButton_00.rotateY(Math.PI / 2.57142857143);
  newButton_00.rotateX(Math.PI / 2);
  buttonList.push(newButton_00);

  var newButton_10 = arrowButton;
  newButton_10.name = "0";
  newButton_10.position.set(0, -400, 0);
  newButton_10.rotateY(Math.PI / 2.57142857143);
  newButton_10.rotateX(Math.PI / 2);
  buttonList.push(newButton_10);

  var newButton_11 = arrowButton;
  newButton_11.name = "2";
  newButton_11.position.set(0, -400, 0);
  newButton_11.rotateY(Math.PI / 2.57142857143);
  newButton_11.rotateX(Math.PI / 2);
  buttonList.push(newButton_11);

  var newButton_12 = arrowButton;
  newButton_12.name = "3";
  newButton_12.position.set(0, -400, 0);
  newButton_12.rotateY(Math.PI / 2.57142857143);
  newButton_12.rotateX(Math.PI / 2);
  buttonList.push(newButton_12);

  var newButton_20 = arrowButton;
  newButton_20.name = "1";
  newButton_20.position.set(0, -400, 0);
  newButton_20.rotateY(Math.PI / 2.57142857143);
  newButton_20.rotateX(Math.PI / 2);
  buttonList.push(newButton_20);

  var newButton_21 = arrowButton;
  newButton_21.name = "4";
  newButton_21.position.set(0, -400, 0);
  newButton_21.rotateY(Math.PI / 2.57142857143);
  newButton_21.rotateX(Math.PI / 2);
  buttonList.push(newButton_21);

  var newButton_30 = arrowButton;
  newButton_30.name = "1";
  newButton_30.position.set(0, -400, 0);
  newButton_30.rotateY(Math.PI / 2.57142857143);
  newButton_30.rotateX(Math.PI / 2);
  buttonList.push(newButton_30);

  var newButton_31 = arrowButton;
  newButton_31.name = "4";
  newButton_31.position.set(0, -400, 0);
  newButton_31.rotateY(Math.PI / 2.57142857143);
  newButton_31.rotateX(Math.PI / 2);
  buttonList.push(newButton_31);

  var newButton_40 = arrowButton;
  newButton_40.name = "3";
  newButton_40.position.set(0, -400, 0);
  newButton_40.rotateY(Math.PI / 2.57142857143);
  newButton_40.rotateX(Math.PI / 2);
  buttonList.push(newButton_40);

  var newButton_41 = arrowButton;
  newButton_41.name = "2";
  newButton_41.position.set(0, -400, 0);
  newButton_41.rotateY(Math.PI / 2.57142857143);
  newButton_41.rotateX(Math.PI / 2);
  buttonList.push(newButton_41);

  var newButton_42 = arrowButton;
  newButton_42.name = "5";
  newButton_42.position.set(0, -400, 0);
  newButton_42.rotateY(Math.PI / 2.57142857143);
  newButton_42.rotateX(Math.PI / 2);
  buttonList.push(newButton_42);

  var newButton_50 = arrowButton;
  newButton_50.name = "4";
  newButton_50.position.set(0, -400, 0);
  newButton_50.rotateY(Math.PI / 2.57142857143);
  newButton_50.rotateX(Math.PI / 2);
  buttonList.push(newButton_50);

  for (var i = 0; i < buttonList.lengthl; i++) {
    scene.add(buttonList[i]);
  }
}

function ChangeMaterial(step) {
  mesh.material = materials[step];
}

function ChangeButton(step) {
  for (var i = 0; i < buttonList.lengthl; i++) {
    buttonList[i].visible = false;
    buttonList[i].layers.enable(2);
  }

  switch (step) {
    case 0:
      buttonList[0].visible = true;
      buttonList[0].layers.enable(1);
      break;
    case 1:
      buttonList[1].visible = true;
      buttonList[1].layers.enable(1);
      buttonList[2].visible = true;
      buttonList[2].layers.enable(1);
      buttonList[3].visible = true;
      buttonList[3].layers.enable(1);
      break;
    case 2:
      buttonList[4].visible = true;
      buttonList[4].layers.enable(1);
      buttonList[5].visible = true;
      buttonList[5].layers.enable(1);
      break;
    case 3:
      buttonList[6].visible = true;
      buttonList[6].layers.enable(1);
      buttonList[7].visible = true;
      buttonList[7].layers.enable(1);
      break;
    case 4:
      buttonList[8].visible = true;
      buttonList[8].layers.enable(1);
      buttonList[9].visible = true;
      buttonList[9].layers.enable(1);
      buttonList[10].visible = true;
      buttonList[10].layers.enable(1);
      break;
    case 5:
      buttonList[11].visible = true;
      buttonList[11].layers.enable(1);
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

  const intersects = raycaster.intersectObjects(buttonList);
  for (var i = 0; i < intersects.length; i++) {
    for (var j = 0; j < buttonList.length; j++) {
      if (intersects[i].object.name === buttonList[j].name) {
        console.log(buttonList[j].name);
      }
    }
  }
}

function ClickButton(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  raycaster.layers.set(1);

  const intersects = raycaster.intersectObjects(buttonList);
  for (var i = 0; i < intersects.length; i++) {
    for (var j = 0; j < buttonList.length; j++) {
      if (intersects[i].object.name === buttonList[j].name) {
        // do
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
