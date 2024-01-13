import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControler, useGLTF } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Lab from "./assets/model/Lab";
// import nipplejs from "nipplejs";
import React, { useRef } from "react";

// const manager = nipplejs.create({
//   zone: document.getElementById("joystick")!,
//   mode: "static",
//   position: { bottom: "10%", right: "10%" },
// });

let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;

function handleKeyDown(event: KeyboardEvent) {
  switch (event.keyCode) {
    case 38: // up
      fwdValue = 0.1;
      break;
    case 40: // down
      bkdValue = 0.1;
      break;
    case 39: // right
      rgtValue = 0.05;
      break;
    case 37: // left
      lftValue = 0.05;
      break;
    default:
      break;
  }
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", function (event) {
  switch (event.keyCode) {
    case 38: // up
      fwdValue = 0;
      break;
    case 40: // down
      bkdValue = 0;
      break;
    case 39: // right
      rgtValue = 0;
      break;
    case 37: // left
      lftValue = 0;
      break;
    default:
      break;
  }
});

// manager.on("move", (evt, data) => {
//   const forward = data.vector.y * 0.05;
//   const turn = data.vector.x * 0.05;

//   if (forward > 0) {
//     fwdValue = Math.abs(forward) * 0.1;
//     bkdValue = 0;
//   } else if (forward < 0) {
//     fwdValue = 0;
//     bkdValue = Math.abs(forward) * 0.1;
//   }

//   if (turn > 0) {
//     lftValue = 0;
//     rgtValue = Math.abs(turn) * 0.1;
//   } else if (turn < 0) {
//     lftValue = Math.abs(turn) * 0.1;
//     rgtValue = 0;
//   }
// });

// manager.on("end", function (evt) {
//   bkdValue = 0;
//   fwdValue = 0;
//   lftValue = 0;
//   rgtValue = 0;
// });

type labMesh = THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
>;

export default function View() {
  const controls = useRef<OrbitControls>(null);
  const labRef = useRef<labMesh>(null!);

  useFrame((state, delta) => {
    // var moveDistance = 10 * delta; // 200 pixels per second
    var rotateAngle = (Math.PI / 2) * delta; // pi/2 radians (90 degrees) per second

    if (fwdValue > 0) labRef.current.translateZ(-fwdValue);
    if (bkdValue > 0) labRef.current.translateZ(bkdValue);

    if (lftValue > 0)
      labRef.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotateAngle);
    if (rgtValue > 0)
      labRef.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);

    // update the texture camera's position and look direction
    var relativeCameraOffset = new THREE.Vector3(0, 0, 1);
    relativeCameraOffset.applyMatrix4(labRef.current.matrixWorld);
    var cameraOffset = relativeCameraOffset;

    state.camera.position.x = cameraOffset.x;
    state.camera.position.y = cameraOffset.y;
    state.camera.position.z = cameraOffset.z;
    var relativeCameraLookOffset = new THREE.Vector3(0, 0, -1);
    var cameraLookOffset = relativeCameraLookOffset.applyMatrix4(
      labRef.current.matrixWorld
    );
    state.camera.lookAt(cameraLookOffset);
  });

  return (
    <>
      <OrbitControler
        // @ts-ignore
        ref={controls}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        autoRotate={false}
        autoRotateSpeed={0}
        rotateSpeed={0.4}
        enableDamping={false}
        dampingFactor={0.1}
        // enableZoom={false}
        // enablePan={false}
        // minAzimuthAngle={-Math.PI / 2}
        // maxAzimuthAngle={Math.PI / 4}
      />

      {/* <axesHelper args={[50]} /> */}
      <gridHelper args={[100, 50]} />

      <mesh //
        ref={labRef}
        position={[5, 1.3, 8]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial attach="material" transparent opacity={0} />
      </mesh>

      <Lab />
    </>
  );
}
