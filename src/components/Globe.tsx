import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import { useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';

interface StorePin {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeMesh({ stores }: { stores: StorePin[] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  const gridLinePoints = useMemo(() => {
    const lines: [number, number, number][][] = [];
    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: [number, number, number][] = [];
      for (let lng = 0; lng <= 360; lng += 5) {
        const v = latLngToVector3(lat, lng, 2.01);
        points.push([v.x, v.y, v.z]);
      }
      lines.push(points);
    }
    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const points: [number, number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const v = latLngToVector3(lat, lng, 2.01);
        points.push([v.x, v.y, v.z]);
      }
      lines.push(points);
    }
    return lines;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Globe sphere */}
      <mesh>
        <sphereGeometry args={[2, 36, 24]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.6}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2, 36, 24]} />
        <meshBasicMaterial wireframe color="#334155" transparent opacity={0.15} />
      </mesh>

      {/* Grid lines */}
      {gridLinePoints.map((pts, i) => (
        <Line key={i} points={pts} color="#475569" transparent opacity={0.2} lineWidth={0.5} />
      ))}

      {/* Store pins */}
      {stores.map((store) => {
        const pos = latLngToVector3(store.lat, store.lng, 2.05);
        const outerPos = latLngToVector3(store.lat, store.lng, 2.25);
        const isHovered = hovered === store.name;
        return (
          <group key={store.name}>
            {/* Pin line */}
            <Line
              points={[[pos.x, pos.y, pos.z], [outerPos.x, outerPos.y, outerPos.z]]}
              color="#c9a96e"
              lineWidth={1.5}
              transparent
              opacity={0.8}
            />
            {/* Pin dot */}
            <mesh
              position={outerPos}
              onPointerOver={() => setHovered(store.name)}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial
                color={isHovered ? '#ffffff' : '#c9a96e'}
                emissive={isHovered ? '#c9a96e' : '#c9a96e'}
                emissiveIntensity={isHovered ? 1.5 : 0.5}
              />
            </mesh>
            {/* Pulse ring */}
            <mesh position={outerPos}>
              <ringGeometry args={[0.08, 0.12, 24]} />
              <meshBasicMaterial color="#c9a96e" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
            {/* Label */}
            {isHovered && (
              <Html position={outerPos} center style={{ pointerEvents: 'none' }}>
                <div className="bg-background/95 backdrop-blur-sm border border-border px-3 py-2 -translate-y-10 whitespace-nowrap">
                  <p className="font-display text-sm text-foreground">{store.name}</p>
                  <p className="text-[0.65rem] text-muted-foreground font-body">{store.address}</p>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useMemo(() => {
    camera.position.set(0, 1.5, 5);
  }, [camera]);
  return null;
}

export default function Globe({ stores }: { stores: StorePin[] }) {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <Canvas>
        <CameraSetup />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#6495ed" />
        <Suspense fallback={null}>
          <GlobeMesh stores={stores} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
          rotateSpeed={0.5}
        />
      </Canvas>
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[0.6rem] text-muted-foreground font-body tracking-wide uppercase">
        Drag to explore
      </p>
    </div>
  );
}
