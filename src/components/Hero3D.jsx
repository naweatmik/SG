import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// 스크롤 진행도 (0~1) 공유
const scrollProgress = { value: 0 }

function TorusKnot({ mouse }) {
  const meshRef = useRef()
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const sp = scrollProgress.value

    meshRef.current.rotation.x = t * 0.12
    meshRef.current.rotation.y = t * 0.18

    // 스크롤 시: 커지면서 흩어지듯 사라짐
    const scale = 1 + sp * 2.5
    groupRef.current.scale.setScalar(scale)
    if (meshRef.current?.material) {
      meshRef.current.material.opacity = Math.max(0, 1 - sp * 2.2)
    }

    // 마우스 기울기
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, mouse.current[1] * 0.18, 0.04
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, mouse.current[0] * 0.22, 0.04
    )
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0} floatIntensity={0.4}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.0, 0.32, 160, 20, 2, 3]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#6d28d9"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>
    </group>
  )
}

function Particles({ mouse }) {
  const count = 320
  const ref = useRef()

  // 초기 위치 (구형 분포)
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 2.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      // 분산 방향 (바깥쪽)
      velocities[i * 3]     = positions[i * 3] * 0.012
      velocities[i * 3 + 1] = positions[i * 3 + 1] * 0.012
      velocities[i * 3 + 2] = positions[i * 3 + 2] * 0.012
    }
    return { positions, velocities }
  }, [])

  const basePositions = useMemo(() => positions.slice(), [positions])

  useFrame((state) => {
    const sp = scrollProgress.value
    const t = state.clock.elapsedTime
    const geo = ref.current.geometry
    const pos = geo.attributes.position.array

    for (let i = 0; i < count; i++) {
      // 스크롤 분산
      pos[i * 3]     = basePositions[i * 3]     + velocities[i * 3]     * sp * 180
      pos[i * 3 + 1] = basePositions[i * 3 + 1] + velocities[i * 3 + 1] * sp * 180
      pos[i * 3 + 2] = basePositions[i * 3 + 2] + velocities[i * 3 + 2] * sp * 180
    }
    geo.attributes.position.needsUpdate = true

    // 천천히 회전
    ref.current.rotation.y = t * 0.04 + mouse.current[0] * 0.15
    ref.current.rotation.x = mouse.current[1] * 0.1

    // 스크롤 시 투명해짐
    ref.current.material.opacity = Math.max(0, 0.75 - sp * 1.2)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#a78bfa"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  )
}

function Rings({ mouse }) {
  const r1 = useRef()
  const r2 = useRef()
  const r3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const sp = scrollProgress.value

    r1.current.rotation.z = t * 0.1
    r1.current.rotation.x = 0.4 + mouse.current[1] * 0.12
    r2.current.rotation.z = -t * 0.07
    r2.current.rotation.y = 0.6 + mouse.current[0] * 0.1
    r3.current.rotation.x = t * 0.08
    r3.current.rotation.z = mouse.current[0] * 0.12

    // 스크롤 분산: 링들이 밀려남
    r1.current.position.z = sp * -8
    r2.current.position.z = sp * -5
    r3.current.position.x = sp * 10

    ;[r1, r2, r3].forEach(r => {
      r.current.material.opacity = Math.max(0, 0.22 - sp * 0.4)
    })
  })

  return (
    <>
      <mesh ref={r1}>
        <torusGeometry args={[2.2, 0.01, 8, 120]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.22} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[2.8, 0.008, 8, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.18} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[3.4, 0.006, 8, 120]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.14} />
      </mesh>
    </>
  )
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#8b5cf6" />
      <pointLight position={[-3, -2, 2]} intensity={2} color="#22d3ee" />
      <pointLight position={[0, -3, -2]} intensity={1.5} color="#f472b6" />
      <TorusKnot mouse={mouse} />
      <Rings mouse={mouse} />
      <Particles mouse={mouse} />
    </>
  )
}

export default function Hero3D() {
  const mouse = useRef([0, 0])

  useEffect(() => {
    const heroEl = document.querySelector('.hero')

    const onScroll = () => {
      const heroH = heroEl?.offsetHeight || window.innerHeight
      scrollProgress.value = Math.min(1, window.scrollY / heroH)
    }

    const onMouseMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ]
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  )
}
