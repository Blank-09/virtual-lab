import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControler, useGLTF } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Lab from "./assets/model/Lab";
import nipplejs from "nipplejs";
import React, { useRef } from "react";

const manager = nipplejs.create({
  zone: document.getElementById("joystick")!,
  mode: "static",
  position: { bottom: "10%", right: "10%" },
});

let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);

manager.on("move", (evt, data) => {
  const forward = data.vector.y * 0.05;
  const turn = data.vector.x * 0.05;

  if (forward > 0) {
    fwdValue = Math.abs(forward);
    bkdValue = 0;
  } else if (forward < 0) {
    fwdValue = 0;
    bkdValue = Math.abs(forward);
  }

  if (turn > 0) {
    lftValue = 0;
    rgtValue = Math.abs(turn);
  } else if (turn < 0) {
    lftValue = Math.abs(turn);
    rgtValue = 0;
  }
});

manager.on("end", function (evt) {
  bkdValue = 0;
  fwdValue = 0;
  lftValue = 0;
  rgtValue = 0;
});

function updatePlayer(
  controls: OrbitControls,
  camera: THREE.Camera,
  mesh: THREE.Mesh
) {
  // move the player
  const angle = controls.getAzimuthalAngle();

  if (fwdValue > 0) {
    tempVector.set(0, 0, -fwdValue).applyAxisAngle(upVector, angle);
    mesh.position.addScaledVector(tempVector, 1);
  }

  if (bkdValue > 0) {
    tempVector.set(0, 0, bkdValue).applyAxisAngle(upVector, angle);
    mesh.position.addScaledVector(tempVector, 1);
  }

  mesh.updateMatrixWorld();

  camera.position.sub(controls.target);
  camera.position.add(mesh.position);
  controls.target.copy(camera.position);
}

type labMesh = THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
>;

export default function View() {
  const controls = useRef<OrbitControls>(null);
  const labRef = useRef<labMesh>(null!);

  useFrame((state, delta) => {
    updatePlayer(controls.current!, state.camera, labRef.current);
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
        enableZoom={false}
        enablePan={false}
        // minAzimuthAngle={-Math.PI / 2}
        // maxAzimuthAngle={Math.PI / 4}
      />

      <axesHelper args={[50]} />
      <gridHelper args={[100, 50]} />

      <mesh //
        ref={labRef}
        position={[5, 1.3, 8]}
      >
        <boxGeometry args={[1, 1, 1]} />
      </mesh>

      <Lab />
    </>
  );
}
