import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

// Simplified continent outlines (rough coordinates for recognizable shapes)
const continentData: [number, number][][] = [
  // Europe
  [[-10,35],[0,43],[3,43],[5,44],[7,43],[10,44],[13,45],[15,46],[20,47],[22,45],[25,42],[28,41],[30,40],[27,37],[25,35],[20,36],[15,38],[10,37],[5,36],[0,36],[-5,36],[-10,35]],
  // Africa
  [[-15,30],[-17,15],[-12,5],[-5,5],[5,5],[10,2],[12,5],[15,5],[20,10],[30,10],[35,12],[40,10],[42,12],[50,12],[50,0],[42,-5],[40,-15],[35,-25],[30,-30],[28,-33],[25,-34],[20,-33],[15,-28],[12,-25],[10,-20],[8,-5],[5,5],[0,5],[-5,5],[-10,5],[-15,10],[-17,15],[-15,30]],
  // Asia
  [[25,42],[30,40],[35,37],[40,38],[45,40],[50,40],[55,45],[60,50],[65,55],[70,55],[80,50],[90,45],[100,40],[105,35],[110,30],[115,25],[120,25],[120,30],[125,35],[130,40],[135,45],[140,45],[140,40],[135,35],[130,30],[120,22],[115,20],[110,15],[105,10],[100,15],[95,20],[90,25],[85,25],[80,30],[75,30],[70,25],[65,25],[60,30],[55,35],[50,35],[45,35],[40,35],[35,37],[30,40],[25,42]],
  // North America
  [[-170,65],[-160,70],[-140,70],[-130,65],[-125,50],[-120,45],[-120,35],[-115,30],[-105,25],[-100,20],[-95,18],[-90,20],[-85,22],[-82,25],[-80,30],[-75,35],[-70,42],[-65,45],[-60,47],[-55,50],[-60,55],[-65,60],[-70,65],[-80,68],[-90,70],[-100,70],[-120,72],[-140,70],[-160,70],[-170,65]],
  // South America
  [[-80,10],[-75,5],[-70,5],[-65,0],[-60,-5],[-55,-10],[-50,-15],[-45,-20],[-42,-22],[-40,-23],[-38,-15],[-35,-10],[-35,-5],[-40,0],[-50,5],[-55,5],[-60,5],[-65,10],[-70,12],[-75,10],[-80,10]],
  // Australia
  [[115,-35],[120,-35],[125,-33],[130,-30],[135,-25],[137,-20],[140,-18],[145,-15],[148,-18],[150,-22],[152,-25],[153,-28],[150,-33],[148,-38],[145,-39],[140,-38],[135,-35],[130,-33],[125,-33],[120,-35],[115,-35]],
];

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
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: [number, number, number][] = [];
      for (let lng = 0; lng <= 360; lng += 5) {
        const v = latLngToVector3(lat, lng, 2.01);
        points.push([v.x, v.y, v.z]);
      }
      lines.push(points);
    }
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

  const continentMeshes = useMemo(() => {
    return continentData.map((outline) => {
      const points: [number, number, number][] = outline.map(([lng, lat]) => {
        const v = latLngToVector3(lat, lng, 2.02);
        return [v.x, v.y, v.z] as [number, number, number];
      });
      return points;
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Ocean sphere */}
      <mesh>
        <sphereGeometry args={[2, 48, 32]} />
        <meshStandardMaterial
          color="#1a3a5c"
          transparent
          opacity={0.85}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.08, 48, 32]} />
        <meshBasicMaterial color="#4a90d9" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {/* Grid lines */}
      {gridLinePoints.map((pts, i) => (
        <Line key={`grid-${i}`} points={pts} color="#2a5a8a" transparent opacity={0.15} lineWidth={0.5} />
      ))}

      {/* Continent outlines */}
      {continentMeshes.map((pts, i) => (
        <Line key={`cont-${i}`} points={pts} color="#7cb87c" lineWidth={1.5} transparent opacity={0.7} />
      ))}

      {/* Continent fill dots for landmass feel */}
      {continentData.map((outline, ci) => {
        // Add scatter dots along continent outlines for a filled look
        const dots: THREE.Vector3[] = [];
        outline.forEach(([lng, lat]) => {
          const v = latLngToVector3(lat, lng, 2.015);
          dots.push(v);
          // Add some inner dots
          const v2 = latLngToVector3(lat + 1, lng + 1, 2.015);
          dots.push(v2);
        });
        return dots.map((pos, di) => (
          <mesh key={`dot-${ci}-${di}`} position={pos}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#5a9a5a" transparent opacity={0.4} />
          </mesh>
        ));
      })}

      {/* Store pins */}
      {stores.map((store) => {
        const pos = latLngToVector3(store.lat, store.lng, 2.05);
        const outerPos = latLngToVector3(store.lat, store.lng, 2.25);
        const isHovered = hovered === store.name;
        return (
          <group key={store.name}>
            <Line
              points={[[pos.x, pos.y, pos.z], [outerPos.x, outerPos.y, outerPos.z]]}
              color="#c9a96e"
              lineWidth={1.5}
              transparent
              opacity={0.8}
            />
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
            <mesh position={outerPos}>
              <ringGeometry args={[0.08, 0.12, 24]} />
              <meshBasicMaterial color="#c9a96e" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
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
