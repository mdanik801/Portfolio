import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";
// import pcurlpath from "../../../public/desktop_pc/scene.gltf";

// import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
   const gltfPath = "/desktop_pc/scene.gltf";

   const computer = useGLTF(gltfPath);
   // const computer = useGLTF("./3d components/desktop_pc/scene.gltf");

   return (
      <mesh>
         <hemisphereLight intensity={0.2} groundColor="black" />
         <ambientLight color={"#00ff00"} intensity={0.6 * Math.PI} />
         <ambientLight
            color={"#0000ff"} // Blue color
            intensity={0.6 * Math.PI} // Adjusted intensity
         />
         <pointLight intensity={1} />
         <primitive
            object={computer.scene}
            scale={isMobile ? 1.2 : 0.9}
            position={isMobile ? [0, -3.3, -1.5] : [0, -2.9, -1]}
            // position={isMobile ? [0, -3, -0.5] : [0, -3.25, -1.5]}

            rotation={[-0.01, -0.2, -0.1]}
         />
         color={"#add8e6"}{" "}
      </mesh>
   );
};

const ComputersCanvas = () => {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      // Add a listener for changes to the screen size
      const mediaQuery = window.matchMedia("(max-width: 500px)");

      // Set the initial value of the `isMobile` state variable
      setIsMobile(mediaQuery.matches);

      // Define a callback function to handle changes to the media query
      const handleMediaQueryChange = (event) => {
         setIsMobile(event.matches);
      };

      // Add the callback function as a listener for changes to the media query
      mediaQuery.addEventListener("change", handleMediaQueryChange);

      // Remove the listener when the component is unmounted
      return () => {
         mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
   }, []);

   return (
      <Canvas
         frameloop="demand"
         shadows
         dpr={[1, 2]}
         camera={{ position: [20, 3, 5], fov: 25 }}
         gl={{ preserveDrawingBuffer: true }}>
         <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
               enableZoom={false}
               maxPolarAngle={Math.PI / 2}
               minPolarAngle={Math.PI / 2}
            />
            <Computers isMobile={isMobile} />
         </Suspense>

         <Preload all />
      </Canvas>
   );
};

export default ComputersCanvas;
