import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html position={[-11, 5, -8]}>
      <div className="flex items-center justify-center">
        <div className="w-96 h-96 scale-150">
          <img src="/logo.png" className="w-full h-full" alt="logo" />
        </div>
      </div>
    </Html>
  );
};

export default Loader;
