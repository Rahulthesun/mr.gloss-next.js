'use client'

import React, { useRef, useState, useEffect, RefObject } from 'react'
import { Canvas, useFrame, RootState } from '@react-three/fiber'
import { a, useSpring, config as springConfig, SpringValue } from '@react-spring/three'
import * as THREE from 'three'
import CarModel from '../components/CarModel'

// Type definitions
interface View {
  key: string
  label: string
  rotationY: number
  rotationX: number
  posY: number
  text: string | null
}

interface AnimatedCarProps {
  rotationY: SpringValue<number>
  rotationX: SpringValue<number>
  scale: SpringValue<number>
  posX: SpringValue<number>
  posY: SpringValue<number>
}

interface GlossyCarModelProps {
  scale: number
  position: [number, number, number]
}

interface BackgroundTextProps {
  show: boolean
}

// All views with rotation, text, and Y-centering (no top view)
const VIEWS: View[] = [
  {
    key: 'front',
    label: 'PREMIUM PROTECTION',
    rotationY: 0,
    rotationX: -0.1,
    posY: -2,
    text: null
  },
  {
    key: 'left',
    label: 'CERAMIC COATING',
    rotationY: Math.PI / 2,
    rotationX: -0.1,
    posY: -2,
    text: 'Advanced ceramic coating provides unmatched protection against UV rays, contaminants, and environmental damage while delivering a brilliant, long-lasting shine.'
  },
  {
    key: 'back',
    label: 'PAINT CORRECTION',
    rotationY: Math.PI,
    rotationX: -0.1,
    posY: -2,
    text: 'Professional paint correction removes swirl marks, scratches, and oxidation, restoring your vehicle\'s paint to its original mirror-like finish.'
  },
  {
    key: 'right',
    label: 'DETAILING SERVICES',
    rotationY: -Math.PI / 2,
    rotationX: -0.1,
    posY: -2,
    text: 'Complete interior and exterior detailing services designed to preserve your investment and maintain that showroom-quality appearance.'
  },
  {
    key: 'front-text',
    label: 'PREMIUM PROTECTION',
    rotationY: 0,
    rotationX: 0,
    posY: -2,
    text: 'Experience the ultimate in automotive protection with our comprehensive ceramic coating and detailing solutions.'
  }
]

// Enhanced CarModel wrapper with selective glossy Ferrari material
const GlossyCarModel: React.FC<GlossyCarModelProps> = ({ scale, position }) => {
  const carRef = useRef<THREE.Group>(null)
  const [materialsApplied, setMaterialsApplied] = useState<boolean>(false)
  
  // Create glossy Ferrari red material
  const ferrariMaterial = new THREE.MeshStandardMaterial({
    color: '#DC143C', // Ferrari red
    metalness: 0.52,   // High metalness for metallic look
    roughness: 0.1,   // Low roughness for glossy finish
    clearcoat: 1.0,   // Clear coat for extra shine
    clearcoatRoughness: 0.05, // Smooth clear coat
    envMapIntensity: 2.0, // Enhanced environment reflection
  })
  
  // Apply materials immediately when model loads
  const applyMaterials = (object: THREE.Object3D): void => {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase()
        const materialName = (child.material as THREE.Material)?.name?.toLowerCase() || ''
        
        // Only apply Ferrari red to explicitly identified body parts
        const isBodyPart = name.includes('body') || name.includes('hood') || 
                         name.includes('door') || name.includes('fender') || 
                         name.includes('bumper') || name.includes('roof') ||
                         name.includes('trunk') || name.includes('panel') ||
                         materialName.includes('paint') || materialName.includes('body')
        
        if (isBodyPart) {
          child.material = ferrariMaterial
        } else {
          // Keep original material but enhance it slightly
          const originalMat = (child.material as THREE.MeshStandardMaterial).clone()
          
          // Only enhance if it's not glass or transparent
          if (!originalMat.transparent && originalMat.opacity > 0.5) {
            originalMat.metalness = Math.min((originalMat.metalness || 0) + 0.1, 1.0)
            originalMat.roughness = Math.max((originalMat.roughness || 0.5) - 0.1, 0.0)
          }
          
          child.material = originalMat
        }
        
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
  
  // Apply materials on every frame until they're applied
  useFrame(() => {
    if (carRef.current && !materialsApplied) {
      applyMaterials(carRef.current)
      setMaterialsApplied(true)
    }
  })
  
  return (
    <group ref={carRef}>
      <CarModel scale={scale} position={position} />
    </group>
  )
}

// Animated group for the car model with zoom, rotation, and movement
const AnimatedCar: React.FC<AnimatedCarProps> = ({ rotationY, rotationX, scale, posX, posY }) => {
  const group = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = rotationY.get()
      group.current.rotation.x = rotationX.get()
      group.current.scale.set(scale.get(), scale.get(), scale.get())
      group.current.position.x = posX.get()
      group.current.position.y = posY.get()
    }
  })
  
  return (
    <group ref={group}>
      <GlossyCarModel scale={typeof window !== 'undefined' && window.innerWidth > 900 ? 2.5 : 1.2} position={[0, 0, 0]} />
    </group>
  )
}

const BackgroundText: React.FC<BackgroundTextProps> = ({ show }) => {
  return show ? (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        textAlign: 'center',
        zIndex: 1,
        pointerEvents: 'none',
        fontFamily: 'Inter, -apple-system, sans-serif',
        color: '#ffffff',
        opacity: 0.03,
        userSelect: 'none',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 900,
          letterSpacing: '0.08em',
          marginBottom: '1rem',
          textShadow: '0 0 60px rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        PREMIUM
      </div>
      <div
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 300,
          letterSpacing: '0.12em',
          opacity: 0.8,
          textTransform: 'uppercase',
        }}
      >
        Ceramic Coating & Detailing
      </div>
    </div>
  ) : null
}

const CarAnimationComponent: React.FC = () => {
  const [step, setStep] = useState<number>(0)
  const [zoom, setZoom] = useState<number>(1)
  const [slide, setSlide] = useState<number>(0)
  const [slideY, setSlideY] = useState<number>(VIEWS[0].posY)
  const [showText, setShowText] = useState<boolean>(false)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [canvasHeight, setCanvasHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 800)
  const [animationComplete, setAnimationComplete] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const current = VIEWS[step]

  // Responsive resize effect
  useEffect(() => {
    const handleResize = (): void => setCanvasHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Animate rotation, zoom, and slide using react-spring
  const springs = useSpring({
    rotY: current.rotationY,
    rotX: current.rotationX,
    scale: zoom,
    posX: slide,
    posY: slideY,
    config: springConfig.gentle
  })

  // Animation sequence: zoom out, rotate, zoom in, then slide car and show text if needed
  useEffect(() => {
    setShowText(false)
    setSlide(0)
    setSlideY(current.posY)
    setZoom(0.8)
    setIsTransitioning(true)
    const zoomInTimeout = setTimeout(() => {
      setZoom(1)
      setIsTransitioning(false)
      if (current.text) {
        setTimeout(() => {
          setSlide(typeof window !== 'undefined' && window.innerWidth > 900 ? 2.2 : 1.2)
          setSlideY(current.posY)
          setShowText(true)
        }, 350)
      }
    }, 200)
    return () => clearTimeout(zoomInTimeout)
  }, [step, current.posY, current.text])

  // On initial mount, trigger zoom out and in for the first view (no text, no slide)
  useEffect(() => {
    setShowText(false)
    setSlide(0)
    setSlideY(VIEWS[0].posY)
    setZoom(0.8)
    setIsTransitioning(true)
    const zoomInTimeout = setTimeout(() => {
      setZoom(1)
      setIsTransitioning(false)
    }, 200)
    return () => clearTimeout(zoomInTimeout)
  }, [])

  // Handle scroll and click for view transitions
  useEffect(() => {
    const handleScroll = (e: WheelEvent): void => {
      if (animationComplete) {
        // Allow normal scrolling when animation is complete
        return
      }
      
      e.preventDefault()
      if (!isTransitioning) {
        const nextStep = (step + 1) % VIEWS.length
        setStep(nextStep)
        
        // Check if we've completed all views
        if (nextStep === 0 && step === VIEWS.length - 1) {
          setTimeout(() => {
            setAnimationComplete(true)
            // Restore body scroll
            document.body.style.overflow = 'auto'
          }, 1000)
        }
      }
    }
    
    // Prevent scrolling during animation
    if (!animationComplete) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('wheel', handleScroll, { passive: false })
    }
    
    return () => {
      window.removeEventListener('wheel', handleScroll)
      if (animationComplete) {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isTransitioning, step, animationComplete])

  useEffect(() => {
    const handleClick = (): void => {
      if (animationComplete) {
        return
      }
      
      if (!isTransitioning) {
        const nextStep = (step + 1) % VIEWS.length
        setStep(nextStep)
        
        // Check if we've completed all views
        if (nextStep === 0 && step === VIEWS.length - 1) {
          setTimeout(() => {
            setAnimationComplete(true)
            // Restore body scroll
            document.body.style.overflow = 'auto'
          }, 1000)
        }
      }
    }
    
    if (!animationComplete) {
      window.addEventListener('click', handleClick)
    }
    
    return () => window.removeEventListener('click', handleClick)
  }, [isTransitioning, step, animationComplete])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative', // Changed from fixed to relative
        left: 0,
        top: 0,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #0d0d0d 75%, #000000 100%)',
        overflow: 'hidden',
        marginBottom: animationComplete ? '0' : '100vh' // Add space for next section
      }}
    >
      {/* Background text for the front view */}
      <BackgroundText show={current.key === 'front'} />

      {/* Completion indicator */}
      {animationComplete && (
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            color: '#4ade80',
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            textAlign: 'center',
            animation: 'fadeIn 1s ease-in-out'
          }}
        >
          <div style={{ marginBottom: '10px' }}>Scroll down to explore our services</div>
          <div style={{ 
            fontSize: '1.5rem', 
            animation: 'bounce 2s infinite',
            color: '#4ade80'
          }}>
            ↓
          </div>
        </div>
      )}

      <Canvas
        style={{
          width: '100vw',
          height: canvasHeight,
          display: 'block',
          zIndex: 2
        }}
        camera={{ position: [0, 0, typeof window !== 'undefined' && window.innerWidth > 900 ? 15 : 9], fov: 40 }}
        shadows // Enable shadows for better realism
      >
        {/* Add environment map for reflections */}
        <mesh>
          <sphereGeometry args={[100, 32, 32]} />
          <meshBasicMaterial 
            color="#1a1a1a" 
            side={THREE.BackSide}
            transparent
            opacity={0.3}
          />
        </mesh>
        
        {/* Invisible reflector surfaces for more realistic reflections */}
        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial 
            color="#000000" 
            metalness={0.8} 
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        
        {/* Ambient light for base illumination */}
        <ambientLight intensity={0.4} />
        
        {/* Main directional light from top-right */}
        <directionalLight
          position={[10, 15, 10]}
          intensity={3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        
        {/* Fill light from the left to reduce harsh shadows */}
        <directionalLight
          position={[-8, 8, 5]}
          intensity={1.5}
          color="#ffffff"
        />
        
        {/* Rim light from behind to create edge definition */}
        <directionalLight
          position={[0, 5, -10]}
          intensity={0.2}
          color="#ffffff"
        />
        
        {/* Spotlight from above for dramatic effect */}
        <spotLight
          position={[0, 20, 8]}
          angle={0.4}
          penumbra={0.5}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        <a.group>
          <AnimatedCar
            rotationY={springs.rotY}
            rotationX={springs.rotX}
            scale={springs.scale}
            posX={springs.posX}
            posY={springs.posY}
          />
        </a.group>
      </Canvas>
      
      {/* Sleek text overlay like in the image */}
      {current.text && (
        <div
          style={{
            position: 'absolute',
            left: typeof window !== 'undefined' && window.innerWidth > 900 ? '80px' : '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: typeof window !== 'undefined' && window.innerWidth > 900 ? '450px' : '280px',
            zIndex: 10,
            pointerEvents: 'none',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-50px)',
            transition: 'opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {/* Main title with proper green-400 color */}
          <h1
            style={{
              fontSize: typeof window !== 'undefined' && window.innerWidth > 900 ? '3.5rem' : '2.5rem',
              fontWeight: 900,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.1,
              fontFamily: 'Inter, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            {current.label.split(' ')[0]}
            <br />
            <span style={{ color: '#4ade80' }}>
              {current.label.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          
          {/* Description text with green-400 color and bold */}
          <p
            style={{
              fontSize: typeof window !== 'undefined' && window.innerWidth > 900 ? '1.1rem' : '0.95rem',
              color: '#4ade80',
              margin: 0,
              lineHeight: 1.6,
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.01em',
              maxWidth: '100%',
            }}
          >
            {current.text}
          </p>
          
          {/* Decorative line with green-400 color */}
          <div
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #4ade80 0%, transparent 100%)',
              marginTop: '24px',
              borderRadius: '2px',
            }}
          />
        </div>
      )}
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}

export default CarAnimationComponent