import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '@components/common/ErrorBoundary';
import HeroFallback from './HeroFallback';

// Floating laptop wireframe mesh
const LaptopMesh = () => {
  const group = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    // Mouse-based tilt
    const { mouse } = state;
    group.current.rotation.y += mouse.x * 0.1;
    group.current.rotation.x += mouse.y * 0.05;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Screen */}
      <mesh position={[0, 0.55, -0.05]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[2.4, 1.5, 0.06]} />
        <meshStandardMaterial
          color="#0a0f1e"
          emissive="#06b6d4"
          emissiveIntensity={0.08}
          wireframe={false}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Screen glow frame */}
      <mesh position={[0, 0.55, -0.02]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[2.5, 1.6, 0.01]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.4}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      {/* Screen display plane */}
      <mesh position={[0, 0.55, -0.01]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial
          color="#060d20"
          emissive="#06b6d4"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.18, 0.6]} rotation={[-Math.PI / 2 + 0.1, 0, 0]}>
        <boxGeometry args={[2.4, 1.4, 0.08]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Hinge */}
      <mesh position={[0, -0.18, 0.1]}>
        <cylinderGeometry args={[0.04, 0.04, 2.3, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Floating code glyphs as small planes
const CodeGlyph = ({ position, symbol, delay }) => {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime + delay;
    mesh.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
    mesh.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    mesh.current.material.opacity = 0.3 + Math.sin(t * 1.2) * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={1.5}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Particle field
const Particles = ({ count = 200 }) => {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Ambient floating rings
const FloatingRing = ({ radius, color, speed, tilt }) => {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = state.clock.elapsedTime * speed;
    mesh.current.rotation.x = tilt + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[radius, 0.01, 8, 80]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const Scene = () => {
  const glyphs = useMemo(
    () => [
      { pos: [-2.5, 1.2, -1], sym: '<', delay: 0 },
      { pos: [2.8, 0.8, -0.5], sym: '/>', delay: 1 },
      { pos: [-3, -0.5, 0], sym: '{}', delay: 2 },
      { pos: [3.2, -0.8, 0.5], sym: '=>', delay: 3 },
      { pos: [-1.5, 2.2, -1], sym: '()', delay: 0.5 },
      { pos: [1.2, 2, -1.5], sym: '[]', delay: 1.5 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 3, 2]} intensity={2} color="#06b6d4" />
      <pointLight position={[-3, -2, 1]} intensity={1} color="#8b5cf6" />
      <pointLight position={[3, 1, -1]} intensity={0.8} color="#06b6d4" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <LaptopMesh />
      </Float>

      {glyphs.map((g, i) => (
        <CodeGlyph key={i} position={g.pos} symbol={g.sym} delay={g.delay} />
      ))}

      <FloatingRing radius={3.5} color="#06b6d4" speed={0.1} tilt={0.5} />
      <FloatingRing radius={5} color="#8b5cf6" speed={-0.07} tilt={1.2} />

      <Particles count={180} />
      <Stars radius={80} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
    </>
  );
};

const HeroScene = () => {
  // Detect low-performance / mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) return <HeroFallback />;

  return (
    <ErrorBoundary fallback={<HeroFallback />}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <HeroFallback />
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ antialias: false, powerPreference: 'low-power' }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default HeroScene;
