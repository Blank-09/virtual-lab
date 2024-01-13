import React from "react";
import * as THREE from "three";

import dropper from "../../assets/3d/dropper.glb";
import { useGLTF, Html } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { SpringValue } from "@react-spring/three";
import Droplet from "../../components/Droplet";
// import { ExpContext } from "../../experiments/chemistry/Experiment_01";

const params = {
  color: 0xffffff,
  specularColor: 0xffffff,
  transmission: 1,
  opacity: 1,
  metalness: 0,
  roughness: 0,
  ior: 1.52,
  thickness: 0.1,
  specularIntensity: 1,
  lightIntensity: 1,
  exposure: 1,
};

type DropperProps = {
  setClicked: () => void;
  meshPosition: SpringValue<number[]>;
  scale: number;
};

const Dropper = (props: Partial<typeof a.group> & DropperProps) => {
  // @ts-ignore
  const { nodes, materials } = useGLTF(dropper);

  return (
    <a.group {...props} dispose={null}>
      <a.group
        //  @ts-ignore
        position={props.meshPosition}
      >
        <mesh
          geometry={nodes.model_3.geometry}
          material={materials["Material.005"]}
          rotation={[2.177, 1.321, -0.154]}
          scale={34}
        >
          <meshPhysicalMaterial
            color={"brown"}
            metalness={params.metalness}
            roughness={params.roughness}
            side={THREE.DoubleSide}
            ior={params.ior}
            transmission={params.transmission}
            specularIntensity={params.specularIntensity}
            specularColor={params.specularColor}
          />
        </mesh>
        <a.mesh
          onClick={props.setClicked}
          geometry={nodes.model_1.geometry}
          material={materials["Material.003"]}
          rotation={[2.177, 1.321, -0.154]}
          scale={34}
        />
        <mesh
          geometry={nodes.model_0002.geometry}
          material={materials["Material.004"]}
          rotation={[2.177, 1.321, -0.154]}
          scale={34}
        />
        <mesh
          geometry={nodes.model_3003.geometry}
          material={materials["Material.005"]}
          rotation={[2.177, 1.321, -0.154]}
          scale={34}
        >
          <meshPhysicalMaterial
            color={params.color}
            metalness={params.metalness}
            roughness={params.roughness}
            ior={params.ior}
            transmission={params.transmission}
            specularIntensity={params.specularIntensity}
            specularColor={params.specularColor}
          />
        </mesh>
        <Html position={[0, 0, 0]}>
          <div
            className="px-4 py-2 text-center bg-white rounded-md shadow-md pointer-events-none font-bold
        "
          >
            Bromine Water
          </div>
        </Html>
        <Droplet position={[-0.11, -0.6, 0.38]} />
      </a.group>
      <mesh
        geometry={nodes.model_0001.geometry}
        material={materials["Material.002"]}
        position={[0.195, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          color={params.color}
          metalness={params.metalness}
          roughness={params.roughness}
          ior={params.ior}
          transmission={params.transmission}
          specularIntensity={params.specularIntensity}
          specularColor={params.specularColor}
        />
      </mesh>
      <mesh
        geometry={nodes.model_0003.geometry}
        material={materials["Material.001"]}
        position={[0, 1.037, 0.683]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.015, 1, 2.069]}
      >
        <meshPhysicalMaterial
          color={"brown"}
          metalness={params.metalness}
          roughness={params.roughness}
          side={THREE.DoubleSide}
          ior={params.ior}
          transmission={params.transmission}
          specularIntensity={params.specularIntensity}
          specularColor={params.specularColor}
        />
      </mesh>
    </a.group>
  );
};

export default Dropper;
