let camera, scene, renderer;
let mesh;
let materials = new Array();
let buttonList = new Array();
let controls;
let step;
let getIndex;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var buttonData = [
  {
    Name: "Button_0",
    PosX: 300,
    PosY: -250,
    PosZ: 50,
    RoationX: 90,
    RoationY: 0,
    RoationZ: -70,
    Step: 0,
    ToGo: 1,
  },
  {
    Name: "Button_1",
    PosX: -300,
    PosY: -250,
    PosZ: 0,
    RoationX: 90,
    RoationY: 0,
    RoationZ: 90,
    Step: 1,
    ToGo: 0,
  },
  {
    Name: "Button_2",
    PosX: 300,
    PosY: -250,
    PosZ: 0,
    RoationX: 90,
    RoationY: 0,
    RoationZ: -90,
    Step: 1,
    ToGo: 2,
  },
  {
    Name: "Button_3",
    PosX: 0,
    PosY: -250,
    PosZ: 300,
    RoationX: 90,
    RoationY: 0,
    RoationZ: 0,
    Step: 1,
    ToGo: 3,
  },
  {
    Name: "Button_4",
    PosX: 0,
    PosY: -250,
    PosZ: -300,
    RoationX: 90,
    RoationY: 0,
    RoationZ: 180,
    Step: 2,
    ToGo: 1,
  },
  {
    Name: "Button_5",
    PosX: -300,
    PosY: -250,
    PosZ: 0,
    RoationX: 90,
    RoationY: 0,
    RoationZ: 90,
    Step: 2,
    ToGo: 4,
  },
  {
    Name: "Button_6",
    PosX: -270,
    PosY: -250,
    PosZ: -200,
    RoationX: 90,
    RoationY: 0,
    RoationZ: 145,
    Step: 3,
    ToGo: 1,
  },
  {
    Name: "Button_7",
    PosX: 300,
    PosY: -250,
    PosZ: -100,
    RoationX: 90,
    RoationY: 0,
    RoationZ: -130,
    Step: 3,
    ToGo: 4,
  },
  {
    Name: "Button_8",
    PosX: -300,
    PosY: -250,
    PosZ: 0,
    RoationX: 90,
    RoationY: 0,
    RoationZ: 90,
    Step: 4,
    ToGo: 3,
  },
  {
    Name: "Button_9",
    PosX: 0,
    PosY: -250,
    PosZ: -300,
    RoationX: 90,
    RoationY: 0,
    RoationZ: 180,
    Step: 4,
    ToGo: 2,
  },
  {
    Name: "Button_10",
    PosX: 300,
    PosY: -250,
    PosZ: 0,
    RoationX: 90,
    RoationY: 0,
    RoationZ: -90,
    Step: 4,
    ToGo: 5,
  },
  {
    Name: "Button_11",
    PosX: -300,
    PosY: -250,
    PosZ: 50,
    RoationX: 90,
    RoationY: 0,
    RoationZ: 90,
    Step: 5,
    ToGo: 4,
  },
];

init();
// helper();
render();

function init() {
  window.addEventListener("pointermove", OverButton);
  window.addEventListener("pointerdown", ClickButton);
  window.addEventListener("resize", resize, false);
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
    side: THREE.DoubleSide,
  });

  for (var i = 0; i < buttonData.length; i++) {
    const button = new THREE.Mesh(arrowButtonGeometry, arrowButtonMaterial);
    button.name = buttonData[i].Name;
    button.position.set(
      buttonData[i].PosX,
      buttonData[i].PosY,
      buttonData[i].PosZ
    );
    button.rotateX(Math.PI / (180 / buttonData[i].RoationX));
    button.rotateY(Math.PI / (180 / buttonData[i].RoationY));
    button.rotateZ(Math.PI / (180 / buttonData[i].RoationZ));

    scene.add(button);
    buttonList.push(button);
  }
}

function ChangeMaterial(step) {
  mesh.material = materials[step];
}

function ChangeButton(step) {
  for (var i = 0; i < buttonList.length; i++) {
    if (buttonData[i].Step === step) {
      buttonList[i].visible = true;
      buttonList[i].layers.enable(1);
    } else {
      buttonList[i].visible = false;
      buttonList[i].layers.disable(1);
    }
  }

  console.log(buttonList);
}

function OverButton(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  raycaster.layers.set(1);

  const intersects = raycaster.intersectObjects(buttonList);

  if (intersects.length > 0) {
    for (var i = 0; i < intersects.length; i++) {
      for (var j = 0; j < buttonList.length; j++) {
        if (intersects[i].object.name === buttonList[j].name) {
          // console.log(buttonList[j]);
          buttonList[j].scale.set(1.05, 1.05, 1.05);
          getIndex = j;
        } else {
          buttonList[j].scale.set(1, 1, 1);
        }
      }
    }
  } else {
    for (var i = 0; i < buttonList.length; i++) {
      buttonList[i].scale.set(1, 1, 1);
      getIndex = -1;
    }
  }
}

function ClickButton(event) {
  if (getIndex != -1) {
    step = buttonData[getIndex].ToGo;
    ChangeMaterial(step);
    ChangeButton(step);
  }
  // buttonList[getIndex].scale.set(1.5, 1.5, 1.5);
  // pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  // pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // raycaster.setFromCamera(pointer, camera);
  // raycaster.layers.set(1);

  // const intersects = raycaster.intersectObjects(buttonList);
  // for (var i = 0; i < intersects.length; i++) {
  //   for (var j = 0; j < buttonList.length; j++) {
  //     if (intersects[i].object.name === buttonList[j].name) {
  //       // do
  //       break;
  //     }
  //   }
  // }
}

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
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
