import { useGLTF } from "@react-three/drei";
import lab from "../3d/lab.glb";

export default function Lab(props: any) {
  const { scene } = useGLTF(lab);

  return (
    <mesh>
      <primitive object={scene} />
    </mesh>
  );
}
