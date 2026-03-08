import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
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
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  const wireframeGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 36, 24);
    return geo;
  }, []);

  const gridLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 5) {
        points.push(latLngToVector3(lat, lng, 2.01));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geo);
    }
    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        points.push(latLngToVector3(lat, lng, 2.01));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geo);
    }
    return lines;
  }, []);

  return (
    <group ref={meshRef}>
      {/* Globe sphere */}
      <mesh geometry={wireframeGeo}>
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.6}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <mesh geometry={wireframeGeo}>
        <meshBasicMaterial wireframe color="#334155" transparent opacity={0.15} />
      </mesh>

      {/* Grid lines */}
      {gridLines.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial color="#475569" transparent opacity={0.2} />
        </line>
      ))}

      {/* Store pins */}
      {stores.map((store) => {
        const pos = latLngToVector3(store.lat, store.lng, 2.05);
        const outerPos = latLngToVector3(store.lat, store.lng, 2.25);
        const isHovered = hovered === store.name;
        return (
          <group key={store.name}>
            {/* Pin line */}
            <line geometry={new THREE.BufferGeometry().setFromPoints([pos, outerPos])}>
              <lineBasicMaterial color="#c9a96e" transparent opacity={0.8} />
            </line>
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
            <mesh position={outerPos} rotation={[0, 0, 0]}>
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
