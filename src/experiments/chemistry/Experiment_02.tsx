import { OrbitControls, useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import testTubeWithStand from "../../assets/3d/testtube-stand-empty.glb";
import TestTube from "../../assets/model/TestTube";
import Dropper from "../../assets/model/Dropper";
import React from "react";

const initialState = {
  testtube: [false, false],
  color: ["lightblue", "lightblue"],
  dropper: false,
  droplet: false,
};

export type State = typeof initialState;

export const ExpContext = React.createContext({
  state: initialState,
  setState: (prev: React.SetStateAction<State>) => {},
});

const Experiment_02 = () => {
  // @ts-ignore
  const { nodes, materials } = useGLTF(testTubeWithStand);
  const [state, setState] = React.useState(initialState);

  function dropperLogic() {
    if (state.dropper) {
      if (state.testtube[0]) {
        return [0.3, 2.9, 2.15];
      }

      if (state.testtube[1]) {
        return [0.3, 2.9, 1.3];
      }

      return [0.3, 2.9, -0.4];
    }

    return [0.3, 0.9, -0.4];
  }

  const { position } = useSpring({
    position: dropperLogic(),
    config: { mass: 1, tension: 170, friction: 26 },
  });

  function testTubeHandler(testtube: number) {
    setState((e) => {
      setTimeout(() => {
        setState((e) => ({
          ...e,
          droplet: true,
        }));
      }, 1000);
      setTimeout(() => {
        setState((e) => ({
          ...e,
          droplet: true,
        }));
      }, 2000);
      setTimeout(() => {
        setState((e) => ({
          ...e,
          testtube: [false, false],
        }));
      }, 3000);
      setTimeout(() => {
        setState((e) => ({
          ...e,
          dropper: false,
        }));
      }, 4000);
      setTimeout(() => {
        setState((e) => ({
          ...e,
          color: testtube == 0 ? ["pink", e.color[1]] : e.color,
        }));
      }, 6000);
      setTimeout(() => {
        setState((e) => ({
          ...e,
          color: testtube == 1 ? [e.color[0], "white"] : e.color,
        }));
      }, 7000);

      return {
        ...e,
        testtube: [testtube === 0, testtube === 1],
      };
    });
  }

  return (
    // @ts-ignore
    <ExpContext.Provider value={{ state, setState }}>
      <group scale={0.5} position={[0, 0.89, -3.3]} rotation={[0, 1.58, 0]}>
        <OrbitControls />
        <group position={[0.05, 0, 0]}>
          <mesh
            geometry={nodes.Cube001.geometry}
            material={materials.Material}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.096, -0.012, -0.214]}
          />
          <TestTube
            index={0}
            position={[0, 0.15, -0.235]}
            onClick={() => state.dropper && testTubeHandler(0)}
          />
          <TestTube
            index={1}
            position={[0, 0.15, -0.48]}
            onClick={() => state.dropper && testTubeHandler(1)}
          />
        </group>
        <Dropper
          setClicked={() => {
            setState((e) => ({
              ...e,
              testtube: [false, false],
              dropper: !e.dropper,
            }));
          }}
          // @ts-ignore
          position={[0, -0.2, -1]}
          meshPosition={position}
          // meshPosition={[0.3, 3, 2.15]}
          scale={0.3}
        />
      </group>
    </ExpContext.Provider>
  );
};

export default Experiment_02;
