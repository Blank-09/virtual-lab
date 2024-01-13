// import { useRef, useEffect } from "react";
import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
// import { PerspectiveCamera } from "three";

// // extend({ PerspectiveCamera });

// function SecondCamera() {
//   const { scene } = useThree();

//   const ref = useRef(new PerspectiveCamera());
//   useFrame(() => ref.current.updateMatrixWorld());
//   useEffect(() => void setDefaultCamera(ref.current), []);
//   return <perspectiveCamera ref={ref} position={[0, 0, 10]} />;
// }

function Scene() {
  return (
    <>
      <mesh>{/* Your mesh */}</mesh>
      {/* <SecondCamera /> */}
    </>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Scene />
    </Canvas>
  );
}

export default App;
