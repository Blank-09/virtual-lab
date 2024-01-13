import React from "react";
import * as THREE from "three";

const Ground = () => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial
        // wireframe
        color="lightgreen"
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Ground;

/*

  if (lftValue > 0) {
    // tempVector.set(-lftValue, 0, 0).applyAxisAngle(upVector, angle);
    // mesh.position.addScaledVector(tempVector, 1);
    mesh.rotation.y += lftValue * 0.5;
  }

  if (rgtValue > 0) {
    // tempVector.set(rgtValue, 0, 0).applyAxisAngle(upVector, angle);
    // mesh.position.addScaledVector(tempVector, 1);
    mesh.rotation.y -= rgtValue * 0.5;
  }

    const cameraQuaternion = new THREE.Quaternion().setFromEuler(camera.rotation);
  const meshQuaternion = new THREE.Quaternion().setFromEuler(mesh.rotation);

  let rotationOffset = cameraQuaternion
    .clone()
    .invert()
    .multiply(meshQuaternion);

  // reposition camera
  // camera.rotation.setFromQuaternion(rotationOffset);
*/
