'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"




const PaddyPlant = ({ position }) => {
  const group = useRef()

  const stemColor = '#4CAF50'
  const leafColor = '#8BC34A'
  const grainColor = '#FFD700'

  useFrame((state) => {
    group.current.children.forEach((part, index) => {
      part.rotation.x = Math.sin(state.clock.elapsedTime + index * 100) * 0.1
      part.rotation.z = Math.cos(state.clock.elapsedTime + index * 100) * 0.1
    })
  })

  const createLeaf = (curve) => {
    const points = curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return (
      <line geometry={geometry}>
        <lineBasicMaterial attach="material" color={leafColor} linewidth={2} />
      </line>
    )
  }

  const leaves = useMemo(() => {
    const leafCurves = []
    for (let i = 0; i < 5; i++) {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.1 + Math.random() * 0.1, 0.2 + Math.random() * 0.1, 0),
        new THREE.Vector3(0.2 + Math.random() * 0.1, 0.1 + Math.random() * 0.1, 0)
      )
      leafCurves.push(curve)
    }
    return leafCurves.map((curve, index) => (
      <group key={index} rotation={[0, (Math.PI * 2 / 5) * index, 0]}>
        {createLeaf(curve)}
      </group>
    ))
  }, [])

  return (
    <group position={position} ref={group}>
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
        <meshStandardMaterial color={stemColor} />
      </mesh>
      {leaves}
      <group position={[0, 0.25, 0]}>
        {[...Array(10)].map((_, index) => (
          <mesh key={index} position={[0, index * 0.02, 0]} rotation={[0, (Math.PI * 2 / 10) * index, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
            <meshStandardMaterial color={grainColor} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

const PaddyField = ({ count = 400, spread = 1.5 }) => {
  const plants = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => (
      <PaddyPlant
        key={i}
        position={[
          (Math.random() - 0.5) * spread,
          0,
          (Math.random() - 0.5) * spread
        ]}
      />
    ))
  }, [count, spread])

  return <>{plants}</>
}

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} />
      <PaddyField count={1000} spread={9.0} /> {/* Increased crop count and reduced spread */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <planeGeometry args={[11, 9]} /> {/* Reduced ground area */}
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <Environment preset="sunset" />
    </Canvas>
  )
}

export default function RealisticPaddyField() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-8">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Get Recommendation</h1>
      <div className="h-[400px] bg-white rounded-t-lg shadow-lg overflow-hidden">
        <Scene />
       
      </div>
      <motion.div
                className="flex justify-center p-5 bg-white rounded-b-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
  <Button size="lg" onClick={() => window.open('http://127.0.0.1:5000/', '_blank')}>
    Get Recommendation
  </Button>
              </motion.div>
    </div>
  )
}
