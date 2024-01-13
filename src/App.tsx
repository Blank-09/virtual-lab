import React, { Suspense } from "react";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import backgroundImage from "./assets/bg/bgimage.hdr";
import Ground from "./components/Ground";
import View from "./View2";
import Experiment_01 from "./experiments/chemistry/Experiment_01";
import Experiment_02 from "./experiments/chemistry/Experiment_02";

import { ChevronRight, X } from "lucide-react";
import Loader from "./components/Loader";

const experiments = [
  {
    label: "Beyer's Test",
    element: <Experiment_02 />,
  },
  {
    label: "Fehling's Test",
    element: <Html />,
  },
  {
    label: "Benedict's Test",
    element: <Html />,
  },
  {
    label: "Bromine Water Test",
    element: <Experiment_01 />,
  },
  {
    label: "Tollen's Test",
    element: <Html />,
  },
  {
    label: "Iodine Test",
    element: <Html />,
  },
  {
    label: "Titration",
    element: <Html />,
  },
  {
    label: "Enthalphy of dissolution",
    element: <Html />,
  },
  {
    label: "Single Displacement Reaction",
    element: <Html />,
  },
  {
    label: "Acid/Base Test",
    element: <Html />,
  },
] as {
  element: JSX.Element;
  label: string;
}[];

function App() {
  const [open, setOpen] = React.useState(true);
  const [index, setIndex] = React.useState(-1);

  return (
    <>
      <div
        className={`absolute top-0 bottom-0 w-1/2 z-10 bg-white rounded m-4 max-w-md py-8 px-6 transition-all shadow duration-700 ${
          open ? "-left-[460px]" : "left-0"
        }`}
      >
        <div className="relative prose prose-slate prose-ul:list-none prose-ul:p-0 prose-li:border prose-li:shadow prose-li:p-4 prose-li:rounded prose-li:cursor-pointer prose-li:bg-slate-950">
          <div className="flex justify-between">
            <h1>🧪 Experiments</h1>
            <X onClick={() => setOpen((e) => !e)} className="cursor-pointer" />
          </div>

          <ChevronRight
            className={`cursor-pointer absolute text-white -right-12 top-1/2 hover:-right-14 transition-all ${
              open && "scale-150"
            }`}
            onClick={() => setOpen((e) => !e)}
          />

          <ul className="grid gap-x-4 grid-cols-2 text-white font-semibold">
            {experiments.map((e, i) => (
              <li
                className="flex text-center items-center justify-center"
                onClick={() => setIndex(i)}
                key={i}
              >
                {e.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Canvas camera={{ position: [5, 1.3, 8], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={2} />
          <directionalLight intensity={1} position={[0, 10, 0]} />
          <pointLight intensity={2} position={[1, 1, 1]} />

          {/* <Ground /> */}
          <View />
          {index != -1 && experiments[index].element}
          <Environment background files={backgroundImage} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;

// function ToolTip1() {
//   return (
//     <Html center position={[-1, 1, -1]}>
//       <p>Click and drag on the white part to move the camera</p>
//     </Html>
//   );
// }
