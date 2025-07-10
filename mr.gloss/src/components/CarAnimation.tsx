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
    posY:  -2,
    text: 'Advanced ceramic coating provides unmatched protection against UV rays, contaminants, and environmental damage while delivering a brilliant, long-lasting shine.'
  },
  {
    key: 'back',
    label: 'PAINT CORRECTION',
    rotationY: Math.PI,
    rotationX: -0.1,
    posY:  -2,
    text: 'Professional paint correction removes swirl marks, scratches, and oxidation, restoring your vehicle\'s paint to its original mirror-like finish.'
  },
  {
    key: 'right',
    label: 'DETAILING SERVICES',
    rotationY: -Math.PI / 2,
    rotationX: -0.1,
    posY:  -2,
    text: 'Complete interior and exterior detailing services designed to preserve your investment and maintain that showroom-quality appearance.'
  },
  {
    key: 'front-text',
    label: 'PREMIUM PROTECTION',
    rotationY: -0.5,
    rotationX: -0.1,
    posY:  -2,
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

  CarModel.displayName = 'CarModel';
  
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
      <GlossyCarModel scale={typeof window !== 'undefined' && window.innerWidth > 900 ? 2.8 : 1.2} position={[0, 0, 0]} />
    </group>
  )
}

const BackgroundText: React.FC<BackgroundTextProps> = ({ show }) => {
  return show ? (
    <div
      style={{
        position: 'absolute',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        textAlign: 'center',
        zIndex: 1,
        pointerEvents: 'none',
        fontFamily: 'Montserrat, sans-serif',
        color: '#ffffff',
        opacity: 0.01,
        userSelect: 'none',
      }}
    >
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
  const lastScrollTime = useRef(0)
  const SCROLL_THROTTLE = 300 // Reduced throttle for better responsiveness

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

  // Function to restart the animation
  const restartAnimation = (): void => {
    // Reset all state variables to initial values
    setStep(0)
    setZoom(1)
    setSlide(0)
    setSlideY(VIEWS[0].posY)
    setShowText(false)
    setIsTransitioning(false)
    setAnimationComplete(false)
    
    // Reset body overflow to hidden to prevent scrolling during animation
    document.body.style.overflow = 'hidden'
    
    // Reset the last scroll time to allow immediate interaction
    lastScrollTime.current = 0
    
    // Trigger the initial animation sequence (zoom out then in)
    setTimeout(() => {
      setZoom(0.8)
      setIsTransitioning(true)
      
      const zoomInTimeout = setTimeout(() => {
        setZoom(1)
        setIsTransitioning(false)
      }, 200)
    }, 50)
  }

  // Function to trigger the full animation sequence for a specific step
  const animateToStep = (newStep: number): void => {
    if (isTransitioning || newStep === step) return
    
    const newView = VIEWS[newStep]
    setStep(newStep)
    setShowText(false)
    setSlide(0)
    setSlideY(newView.posY)
    setZoom(0.8)
    setIsTransitioning(true)
    
    const zoomInTimeout = setTimeout(() => {
      setZoom(1)
      setIsTransitioning(false)
      if (newView.text) {
        setTimeout(() => {
          setSlide(typeof window !== 'undefined' && window.innerWidth > 900 ? 2.2 : 1.2)
          setSlideY(newView.posY)
          setShowText(true)
        }, 350)
      }
      
      // Handle animation completion
      if (newStep === VIEWS.length - 1) {
        setTimeout(() => {
          setAnimationComplete(true)
          document.body.style.overflow = 'auto'
        }, 1000)
      } else {
        setAnimationComplete(false)
        document.body.style.overflow = 'hidden'
      }
    }, 200)
  }

  // Progress indicator click handler
  const handleProgressClick = (index: number): void => {
    if (animationComplete) {
      // If animation is complete, restart the animation
      restartAnimation()
      
      // After a short delay, animate to the selected step
      setTimeout(() => {
        animateToStep(index)
      }, 300) // Give the restart animation time to begin
    } else if (!isTransitioning) {
      // Normal behavior during animation
      animateToStep(index)
    }
  }

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

  // Handle bidirectional scroll for view transitions
  useEffect(() => {
    const handleScroll = (e: WheelEvent): void => {
      if (animationComplete) {
        // Allow normal scrolling when animation is complete
        return
      }
      
      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime.current < SCROLL_THROTTLE) return

      if (!isTransitioning) {
        const scrollDirection = e.deltaY > 0 ? 1 : -1 // Positive for down, negative for up
        
        if (scrollDirection > 0 && step < VIEWS.length - 1) {
          // Scroll down - next view
          animateToStep(step + 1)
          lastScrollTime.current = now
        } else if (scrollDirection < 0 && step > 0) {
          // Scroll up - previous view
          animateToStep(step - 1)
          lastScrollTime.current = now
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

  // Handle bidirectional click navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      if (animationComplete) {
        return
      }
      
      if (!isTransitioning) {
        const clickX = e.clientX
        const screenWidth = window.innerWidth
        const isRightSide = clickX > screenWidth / 2
        
        if (isRightSide && step < VIEWS.length - 1) {
          // Right side click - next view
          animateToStep(step + 1)
        } else if (!isRightSide && step > 0) {
          // Left side click - previous view
          animateToStep(step - 1)
        }
      }
    }
    
    if (!animationComplete) {
      window.addEventListener('click', handleClick)
    }
    
    return () => window.removeEventListener('click', handleClick)
  }, [isTransitioning, step, animationComplete])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (animationComplete) return
      
      if (!isTransitioning) {
        if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && step < VIEWS.length - 1) {
          animateToStep(step + 1)
        } else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && step > 0) {
          animateToStep(step - 1)
        }
      }
    }
    
    if (!animationComplete) {
      window.addEventListener('keydown', handleKeyDown)
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTransitioning, step, animationComplete])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        left: 0,
        top: 0,
        background: 'transparent',
        overflow: 'hidden',
        marginTop: '-80px', // Reduce space from navbar (adjust this value as needed)
        paddingTop: '80px', // Add padding to compensate for negative margin
      }}
    >
      {/* Background text for the front view */}
      <BackgroundText show={current.key === 'front'} />

      {/* Progress indicator */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '40px',
          transform: 'translateY(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {VIEWS.map((_, index) => (
          <div
            key={index}
            style={{
              width: '3px',
              height: '40px',
              backgroundColor: index === step ? '#4ade80' : 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              // Add visual feedback for when animation is complete
              opacity: animationComplete ? 0.8 : 1,
              transform: animationComplete ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={() => handleProgressClick(index)}
            onMouseEnter={(e) => {
              if (animationComplete) {
                e.currentTarget.style.backgroundColor = '#4ade80'
                e.currentTarget.style.opacity = '1'
              }
            }}
            onMouseLeave={(e) => {
              if (animationComplete) {
                e.currentTarget.style.backgroundColor = index === step ? '#4ade80' : 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.opacity = '0.8'
              }
            }}
          />
        ))}
      </div>

      {/* Optional hint when animation is complete */}
      {animationComplete && (
        <div
          style={{
            position: 'absolute',
            top: '45%',
            right: '60px',
            transform: 'translateY(-50%)',
            zIndex: 19,
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: '0.8rem',
            textAlign: 'right',
            pointerEvents: 'none',
            opacity: 0,
            animation: 'fadeInHint 2s ease-in-out 1s forwards',
          }}
        >
          Click to restart
        </div>
      )}

      {/* Navigation hints */}
      {!animationComplete && (
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: '0.9rem',
            textAlign: 'center',
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
          }}
        >
          {step > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>↑</span>
              <span>Scroll up</span>
            </div>
          )}
          {step < VIEWS.length - 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>↓</span>
              <span>Scroll down</span>
            </div>
          )}
        </div>
      )}

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
          width: '100%',
          height: canvasHeight,
          display: 'block',
          zIndex: 2
        }}
        camera={{ position: [0, 0, typeof window !== 'undefined' && window.innerWidth > 900 ? 15 : 9], fov: 40 }}
        shadows
      >
        
        {/* Ambient light for base illumination */}
        <ambientLight intensity={0.2} />
        
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
          intensity={0.1}
          color="#ffffff"
        />
        
        {/* Spotlight from above for dramatic effect */}
        <spotLight
          position={[0, 20, 8]}
          angle={0.4}
          penumbra={0.5}
          intensity={1}
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
      
      {/* Sleek text overlay */}
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
          {/* Main title */}
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
          
          {/* Description text */}
          <p
            style={{
              fontSize: typeof window !== 'undefined' && window.innerWidth > 900 ? '1.1rem' : '0.95rem',
              color: '#fff',
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
          
          {/* Decorative line */}
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
        
        @keyframes fadeInHint {
          0% { opacity: 0; transform: translateY(-50%) translateX(10px); }
          100% { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}

export default CarAnimationComponent