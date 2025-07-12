'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { a, useSpring, config as springConfig, SpringValue } from '@react-spring/three'
import * as THREE from 'three'
import CarModel from '../components/CarModel'

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
// 5-Second Loader Component
const LoaderModule: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading Model...')
  
  useEffect(() => {
    const loadingMessages = [
      'Loading Model...',
      'Applying Materials...',
      'Optimizing Performance...',
      'Preparing Experience...'
    ]
    
    let messageIndex = 0
    const startTime = Date.now()
    const totalDuration = typeof window !== 'undefined' && window.innerWidth > 900 ? 5 : 10 
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)
      
      // Update messages based on progress
      if (newProgress > 25 && messageIndex === 0) {
        messageIndex = 1
        setLoadingText(loadingMessages[1])
      } else if (newProgress > 50 && messageIndex === 1) {
        messageIndex = 2
        setLoadingText(loadingMessages[2])
      } else if (newProgress > 75 && messageIndex === 2) {
        messageIndex = 3
        setLoadingText(loadingMessages[3])
      }
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        onComplete()
      }
    }
    
    updateProgress()
    
    return () => {
      // Cleanup
    }
  }, [onComplete])
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}
    >
      {/* Animated Car Icon */}
      <div style={{ marginBottom: '40px', position: 'relative' }}>
        <img
          src="assets/images/logo-v2.png"
          alt="Mr.Gloss Logo"
          style={{ 
            width: '120px',
            height: 'auto',
            animation: 'carBounce 2s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Loading Text */}
      <div
        style={{
          color: '#ffffff',
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '30px',
          letterSpacing: '0.5px',
          textAlign: 'center',
        }}
      >
        {loadingText}
      </div>
      
      {/* Progress Bar */}
      <div
        style={{
          width: '300px',
          height: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
            borderRadius: '3px',
            transition: 'width 0.1s linear',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      
      {/* Progress Percentage */}
      <div
        style={{
          color: '#4ade80',
          fontSize: '0.9rem',
          fontWeight: 500,
          marginBottom: '40px',
        }}
      >
        {Math.round(progress)}%
      </div>
      
      {/* Loading Dots */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#4ade80',
              animation: `loadingDot 1.5s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Subtle hint text */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.8rem',
          fontWeight: 400,
          textAlign: 'center',
          letterSpacing: '0.5px',
        }}
      >
        Preparing your premium automotive experience
      </div>
      
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes carBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes loadingDot {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Your existing interfaces
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

// Your existing VIEWS array
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
    rotationY: -0.5,
    rotationX: -0.1,
    posY: -2,
    text: 'Experience the ultimate in automotive protection with our comprehensive ceramic coating and detailing solutions.'
  }
]

// Your existing GlossyCarModel component
const GlossyCarModel: React.FC<GlossyCarModelProps> = ({ scale, position }) => {
  const carRef = useRef<THREE.Group>(null)
  const [materialsApplied, setMaterialsApplied] = useState<boolean>(false)
  
  const ferrariMaterial = new THREE.MeshStandardMaterial({
    color: '#DC143C',
    metalness: 0.52,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.0,
  })

  CarModel.displayName = 'CarModel';
  
  const applyMaterials = (object: THREE.Object3D): void => {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase()
        const materialName = (child.material as THREE.Material)?.name?.toLowerCase() || ''
        
        const isBodyPart = name.includes('body') || name.includes('hood') || 
                         name.includes('door') || name.includes('fender') || 
                         name.includes('bumper') || name.includes('roof') ||
                         name.includes('trunk') || name.includes('panel') ||
                         materialName.includes('paint') || materialName.includes('body')
        
        if (isBodyPart) {
          child.material = ferrariMaterial
        } else {
          const originalMat = (child.material as THREE.MeshStandardMaterial).clone()
          
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

// Your existing AnimatedCar component
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
  
  // Improved responsive scaling
  const getResponsiveScale = () => {
    if (typeof window === 'undefined') return 1.5
    
    const width = window.innerWidth
    const height = window.innerHeight
    
    // Mobile devices
    if (width <= 768) {
      return height <= 667 ? 1.2 : 1.5 // iPhone SE and smaller
    }
    
    // Tablets
    if (width <= 1024) {
      return 1.8
    }
    
    // Small laptops (13-14 inch)
    if (width <= 1366) {
      return 3.0
    }
    
    // Medium laptops (15-16 inch)
    if (width <= 1920) {
      return 3.0
    }
    
    // Large screens
    return 3.0
  }
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  return (
    <group ref={group}>
      <GlossyCarModel 
        scale={getResponsiveScale()}
        position={[0, isMobile ? -0.3 : -0.5, 0]} 
      />
    </group>
  )
}

// Your existing BackgroundText component
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

// Main Component with Loading Integration
const CarAnimationComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [step, setStep] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [slide, setSlide] = useState(0)
  const [slideY, setSlideY] = useState(VIEWS[0].posY)
  const [showText, setShowText] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [canvasHeight, setCanvasHeight] = useState(
    typeof window !== 'undefined'
  ? (window.innerWidth <= 768 ? 600 : window.innerHeight)
  : 800

  )
  const [animationComplete, setAnimationComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const current = VIEWS[step]
  const lastScrollTime = useRef(0)
  const SCROLL_THROTTLE = 300

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
    setStep(0)
    setZoom(1)
    setSlide(0)
    setSlideY(VIEWS[0].posY)
    setShowText(false)
    setIsTransitioning(false)
    setAnimationComplete(false)
    document.body.style.overflow = 'hidden'
    lastScrollTime.current = 0
    
    setTimeout(() => {
      setZoom(0.8)
      setIsTransitioning(true)
      
      setTimeout(() => {
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
    
    setTimeout(() => {
      setZoom(1)
      setIsTransitioning(false)
      if (newView.text) {
        setTimeout(() => {
          setSlide(typeof window !== 'undefined' && window.innerWidth > 900 ? 2.2 : 1.2)
          setSlideY(newView.posY)
          setShowText(true)
        }, 350)
      }
      
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
      restartAnimation()
      setTimeout(() => {
        animateToStep(index)
      }, 300)
    } else if (!isTransitioning) {
      animateToStep(index)
    }
  }

  // Animation sequence effects
  useEffect(() => {
    if (isLoading) return
    
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
  }, [step, current.posY, current.text, isLoading])

  // Initial mount effect
  useEffect(() => {
    if (isLoading) return
    
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
  }, [isLoading])

  // Scroll handling
  useEffect(() => {
    if (isLoading) return
    
    const handleScroll = (e: WheelEvent): void => {
      if (animationComplete) return
      
      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime.current < SCROLL_THROTTLE) return

      if (!isTransitioning) {
        const scrollDirection = e.deltaY > 0 ? 1 : -1
        
        if (scrollDirection > 0 && step < VIEWS.length - 1) {
          animateToStep(step + 1)
          lastScrollTime.current = now
        } else if (scrollDirection < 0 && step > 0) {
          animateToStep(step - 1)
          lastScrollTime.current = now
        }
      }
    }
    
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
  }, [isTransitioning, step, animationComplete, isLoading])

  // Click handling
  useEffect(() => {
    if (isLoading) return
    
    const handleClick = (e: MouseEvent): void => {
      if (animationComplete) return
      
      if (!isTransitioning) {
        const clickX = e.clientX
        const screenWidth = window.innerWidth
        const isRightSide = clickX > screenWidth / 2
        
        if (isRightSide && step < VIEWS.length - 1) {
          animateToStep(step + 1)
        } else if (!isRightSide && step > 0) {
          animateToStep(step - 1)
        }
      }
    }
    
    if (!animationComplete) {
      window.addEventListener('click', handleClick)
    }
    
    return () => window.removeEventListener('click', handleClick)
  }, [isTransitioning, step, animationComplete, isLoading])

  // Keyboard navigation
  useEffect(() => {
    if (isLoading) return
    
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
  }, [isTransitioning, step, animationComplete, isLoading])

  // Show loader while model is loading
  if (isLoading) {
    return <LoaderModule onComplete={() => setIsLoading(false)} />
  }

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
        marginTop: '-80px',
        paddingTop: '80px',
      }}
    >
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
          background: 'transparent',
          display: 'block',
          zIndex: 2
        }}
        camera={{ 
          position: [0, 0, isMobile ? 6 : 12], // Much closer on mobile
        fov: isMobile ? 55 : 45, // Wider field of view on mobile
        near: 0.1,
        far: 1000}}
        shadows
        gl={{ 
          alpha: true,
          antialias: true,
          premultipliedAlpha: false
        }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <directionalLight
          position={[-8, 8, 5]}
          intensity={1.5}
          color="#ffffff"
        />
        <directionalLight
          position={[0, 5, -10]}
          intensity={0.1}
          color="#ffffff"
        />
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
      
      {/* Text overlay */}
      {current.text && (
        <div
          style={{
            position: 'absolute',
            left: typeof window !== 'undefined' && window.innerWidth > 900 ? '10%' : '20%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: typeof window !== 'undefined' && window.innerWidth > 900 ? '30%' : '90%',
            maxWidth: '500px',
            zIndex: 10,
            color: 'white',
            fontFamily: 'Montserrat , sans-serif',
            opacity: showText ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: 'none',
          }}
        >
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
          <p
            style={{
              fontSize: typeof window !== 'undefined' && window.innerWidth > 900 ? '1.1rem' : '0.9rem',
              fontWeight: 400,
              lineHeight: 1.6,
              opacity: 0.9,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {current.text}
          </p>

          {/* Decorative Line */}
          <div
            style={{
              width: '100px',
              height: '3px',
              background: 'linear-gradient(90deg, #4ade80 0%, transparent 100%)',
              marginTop: '24px',
              borderRadius: '2px',
            }}
          >
        </div>
      </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInHint {
          0% { opacity: 0; transform: translateY(-50%) translateX(10px); }
          100% { opacity: 0.6; transform: translateY(-50%) translateX(0); }
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