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
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState<string | null>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  // Generate land dots using a pseudo-random distribution on known landmasses
  const landDots = useMemo(() => {
    const dots: THREE.Vector3[] = [];
    // Approximate land bounding boxes [latMin, latMax, lngMin, lngMax]
    const landRegions = [
      // Europe
      [35, 71, -10, 40],
      // Africa
      [-35, 37, -18, 52],
      // Asia
      [5, 75, 40, 145],
      // North America
      [15, 72, -170, -55],
      // South America
      [-56, 12, -82, -34],
      // Australia
      [-44, -10, 112, 155],
      // Middle East
      [12, 42, 25, 63],
    ];

    // Simple land check using seed-based pseudo-random
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    let seed = 0;
    for (const [latMin, latMax, lngMin, lngMax] of landRegions) {
      const latStep = 2.5;
      const lngStep = 2.5;
      for (let lat = latMin; lat <= latMax; lat += latStep) {
        for (let lng = lngMin; lng <= lngMax; lng += lngStep) {
          seed++;
          if (seededRandom(seed) > 0.35) {
            const jLat = lat + (seededRandom(seed * 2) - 0.5) * latStep;
            const jLng = lng + (seededRandom(seed * 3) - 0.5) * lngStep;
            dots.push(latLngToVector3(jLat, jLng, 2.01));
          }
        }
      }
    }
    return dots;
  }, []);

  // Create instanced mesh geometry for dots
  const dotMatrix = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrices: THREE.Matrix4[] = [];
    landDots.forEach(pos => {
      dummy.position.copy(pos);
      dummy.lookAt(pos.clone().multiplyScalar(2));
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());
    });
    return matrices;
  }, [landDots]);

  return (
    <group ref={groupRef}>
      {/* Ocean sphere — deep navy */}
      <mesh>
        <sphereGeometry args={[2, 64, 48]} />
        <meshPhongMaterial
          color="#0a1628"
          shininess={30}
          specular="#1a3050"
        />
      </mesh>

      {/* Inner atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.005, 64, 48]} />
        <meshBasicMaterial color="#1a3a6a" transparent opacity={0.12} />
      </mesh>

      {/* Outer atmosphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.12, 64, 48]} />
        <meshBasicMaterial color="#3a7bd5" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {/* Second atmosphere ring */}
      <mesh>
        <sphereGeometry args={[2.2, 48, 32]} />
        <meshBasicMaterial color="#5a9fd4" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>

      {/* Land dots — instanced for performance */}
      <instancedMesh args={[undefined, undefined, dotMatrix.length]}>
        <circleGeometry args={[0.022, 6]} />
        <meshBasicMaterial color="#3ddc84" transparent opacity={0.55} side={THREE.DoubleSide} />
        {dotMatrix.map((matrix, i) => {
          const ref = (mesh: THREE.InstancedMesh) => {
            if (mesh) mesh.setMatrixAt(i, matrix);
          };
          // We set matrices via effect below
          return null;
        })}
      </instancedMesh>

      {/* Fallback: individual land dots (simpler, guaranteed to work) */}
      {landDots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <circleGeometry args={[0.02, 6]} />
          <meshBasicMaterial color="#4ae68a" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Subtle graticule rings */}
      {[-60, -30, 0, 30, 60].map(lat => {
        const points: THREE.Vector3[] = [];
        for (let lng = 0; lng <= 360; lng += 4) {
          points.push(latLngToVector3(lat, lng, 2.005));
        }
        const curve = new THREE.CatmullRomCurve3(points, true);
        const geo = new THREE.TubeGeometry(curve, 90, 0.002, 4, true);
        return (
          <mesh key={`lat-${lat}`} geometry={geo}>
            <meshBasicMaterial color="#1e3a5f" transparent opacity={0.15} />
          </mesh>
        );
      })}

      {/* Store pins */}
      {stores.map((store) => {
        const pos = latLngToVector3(store.lat, store.lng, 2.04);
        const outerPos = latLngToVector3(store.lat, store.lng, 2.3);
        const isHovered = hovered === store.name;
        
        const lineMat = new THREE.LineBasicMaterial({ color: '#c9a96e', transparent: true, opacity: 0.7 });
        const lineGeo = new THREE.BufferGeometry().setFromPoints([pos, outerPos]);
        const lineObj = new THREE.Line(lineGeo, lineMat);

        return (
          <group key={store.name}>
            <primitive object={lineObj} />
            {/* Pin head */}
            <mesh
              position={outerPos}
              onPointerOver={() => setHovered(store.name)}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial
                color={isHovered ? '#ffffff' : '#c9a96e'}
                emissive={isHovered ? '#c9a96e' : '#c9a96e'}
                emissiveIntensity={isHovered ? 2 : 0.6}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Pulse ring */}
            <mesh position={outerPos} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.07, 0.1, 24]} />
              <meshBasicMaterial color="#c9a96e" transparent opacity={isHovered ? 0.5 : 0.2} side={THREE.DoubleSide} />
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -5, -10]} intensity={0.2} color="#3a7bd5" />
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
