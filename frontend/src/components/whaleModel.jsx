import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Whale from "./whale";

const WhaleModel = () => {
  return (
    <div
      className="pointer-events-auto justify-self-end"
      
      style={{
        position: "relative",
        // width: "50%",
        // height: "600px",
        // zIndex: 50,
        width: "100%",
        height: '400px',
        zIndex: 50,
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
<Canvas
  camera={{ position: [2, 2, 2], fov: 50 }}
  shadows
  gl={{ preserveDrawingBuffer: true }}
>
  {/* Ambient for base light */}
  <ambientLight intensity={1} />

  {/* A brighter directional light */}
  <directionalLight
    position={[5, 5, 5]}
    intensity={1.5}
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
  />

  {/* Extra soft light to brighten shadows */}
  <hemisphereLight intensity={0.5} groundColor={"#444"} />

  <Suspense fallback={null}>
    <Whale/>
  </Suspense>

  {/* Controls */}
  <OrbitControls enableZoom={false} enableRotate={true}
  
   minDistance={3} // 👈 Zoom in limit
  maxDistance={5}   />
</Canvas>

      </div>
    </div>
  );
};

export default WhaleModel;
