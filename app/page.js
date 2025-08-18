'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const earthRef = useRef();
  const cloudRef = useRef();

  
  const [colorMap, cloudsMap, nightMap] = useTexture([
    '/daymap.jpg',       
    '/clouds.jpg',       
    '/nightmap.jpg'      
  ]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = elapsed * 0.05; 
    if (cloudRef.current) cloudRef.current.rotation.y = elapsed * 0.02; 
  });

  return (
    <>
      
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.02, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          emissiveMap={nightMap}
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );
}

export default function App() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', background: 'black' }}
      camera={{ position: [0, 0, 3], fov: 45 }}
    >
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />

      
      <Stars radius={200} depth={50} count={10000} factor={4} saturation={0} fade />

      
      <Earth />

      
      <OrbitControls enableZoom={true} enablePan={false} rotateSpeed={0.4} zoomSpeed={0.6} />
    </Canvas>
  );
}
