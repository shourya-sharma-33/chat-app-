import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Whale = () => {
  const { scene } = useGLTF("/models/cute_whale.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // cute slow rotation
      // ref.current.rotation.z += 0.001; // cute slow rotation
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
      scale={0.8}
    />
  );
};

export default Whale;
