import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const planetRef   = useRef()
  const ring1Ref    = useRef()
  const ring2Ref    = useRef()
  const moonGroup   = useRef()
  const moon2Group  = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    planetRef.current.rotation.y  = t * 0.05
    ring1Ref.current.rotation.z   = t * 0.018
    ring2Ref.current.rotation.z   = -t * 0.012
    moonGroup.current.rotation.y  = t * 0.28
    moon2Group.current.rotation.y = -t * 0.18
  })

  return (
    <>
      {/* 별 */}
      <Stars radius={120} depth={80} count={5000} factor={2.5} saturation={0.2} fade speed={0.3} />

      {/* 행성 */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.6, 80, 80]} />
        <meshStandardMaterial
          color="#1a0533"
          emissive="#5b21b6"
          emissiveIntensity={0.5}
          roughness={0.55}
          metalness={0.3}
        />
      </mesh>

      {/* 표면 와이어 패턴 */}
      <mesh>
        <sphereGeometry args={[1.62, 22, 22]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.035} />
      </mesh>

      {/* 대기권 1 */}
      <mesh>
        <sphereGeometry args={[1.75, 48, 48]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          transparent opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 대기권 2 — 넓은 글로우 */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial
          color="#4f46e5"
          transparent opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 링 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI * 0.32, 0.05, 0]}>
        <torusGeometry args={[2.2, 0.07, 2, 180]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.5} />
      </mesh>

      {/* 링 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI * 0.34, -0.04, 0]}>
        <torusGeometry args={[2.55, 0.04, 2, 180]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.28} />
      </mesh>

      {/* 링 3 얇은 */}
      <mesh rotation={[Math.PI * 0.30, 0.08, 0]}>
        <torusGeometry args={[2.85, 0.018, 2, 180]} />
        <meshBasicMaterial color="#f9a8d4" transparent opacity={0.18} />
      </mesh>

      {/* 위성 1 — 핑크 */}
      <group ref={moonGroup}>
        <mesh position={[2.05, 0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={2} />
        </mesh>
        <pointLight position={[2.05, 0.2, 0]} intensity={1.2} color="#f472b6" distance={2.5} />
      </group>

      {/* 위성 2 — 청록 */}
      <group ref={moon2Group}>
        <mesh position={[0, 0.3, 2.3]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} />
        </mesh>
        <pointLight position={[0, 0.3, 2.3]} intensity={0.8} color="#22d3ee" distance={2} />
      </group>
    </>
  )
}

export default function CurriculumDeco() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 6.5], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.08} />
      <pointLight position={[6, 5, 4]}  intensity={3}   color="#c4b5fd" />
      <pointLight position={[-5, -3, 2]} intensity={1.5} color="#67e8f9" />
      <Scene />
    </Canvas>
  )
}
