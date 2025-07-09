import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three'
import { ThreeElements } from '@react-three/fiber'

const CarModel = forwardRef<Group, ThreeElements['primitive']>((props, ref) => {
  const { scene } = useGLTF('/car-model/scene.gltf') as { scene: Group }
  return <primitive ref={ref} object={scene} {...props} />
})

useGLTF.preload('/car-model/scene.gltf')

export default CarModel 