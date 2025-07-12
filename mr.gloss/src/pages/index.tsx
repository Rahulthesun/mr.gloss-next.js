import Head from 'next/head'
import { useEffect , useState } from 'react'




import ReviewSection from '../components/ReviewSection'
import WhyChooseUs from '../components/StatItem'

import Footer from '../components/Footer'
import CarAnimationComponent from '../components/CarAnimation'
import ShinyText from '../components/ShinyText'
import BackgroundText from '../components/BackGroundText'
import { SpotlightRatingCard } from '../components/SpotlightRatingCard'

import GlassIcons from '../components/GlassIcons'
import { FiShield, FiDroplet, FiSun, FiLayers } from "react-icons/fi";

import RibbonCursor from '../components/RibbonCursor';




  


interface Package {
  name: string
  features: string[]
  color: string
}

interface Service {
  name: string
  icon?: string
}

export default function Home() {
  const [activePackage, setActivePackage] = useState<number | null>(null)

  
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      setScale(
        width > 1440 ? 1 : 
        width > 1280 ? 0.9 : 
        width > 1024 ? 0.85 : 
        0.8
      );
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const packages: Package[] = [
    {
      name: 'Gold',
      features: [
        'Yearly Ceramic Coating for 3 Years',
        'Yearly Ceramic Coating for 3 Years',
        'Yearly Ceramic Coating for 3 Years',
        'Yearly Ceramic Coating for 3 Years',
        'Yearly Ceramic Coating for 3 Years'
      ],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'Silver',
      features: [
        'Yearly Ceramic Coating for 5 Years',
        'Yearly Ceramic Coating for 5 Years',
        'Yearly Ceramic Coating for 5 Years',
        'Yearly Ceramic Coating for 5 Years',
        'Yearly Ceramic Coating for 5 Years'
      ],
      color: 'from-gray-300 to-gray-500'
    },
    {
      name: 'Platinum',
      features: [
        'Yearly Ceramic Coating for 7 Years',
        'Yearly Ceramic Coating for 7 Years',
        'Yearly Ceramic Coating for 7 Years',
        'Yearly Ceramic Coating for 7 Years',
        'Yearly Ceramic Coating for 7 Years'
      ],
      color: 'from-purple-400 to-purple-600'
    }
  ]

  const services: string[] = [
    'CERAMIC COATING',
    'CAR WASH & DETAILING',
    'SUNFILM INSTALLATION',
    'PAINT PROTECTION'
  ]

  const handlePackageHover = (index: number): void => {
    setActivePackage(index)
  }

  const handlePackageLeave = (): void => {
    setActivePackage(null)
  }

  const handleEnquireClick = (packageName: string): void => {
    console.log(`Enquiring about ${packageName} package`)
    // Add your enquiry logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a0d] via-[#001100] to-black">
      <RibbonCursor 
        color="#ffffff"
        size={15}
        trailLength={12}
        speed={0.8}
      />
      <Head>
        <title>Mr. Gloss Ceramic Coating - Protect Your Ride</title>
        <meta name="description" content="Premium ceramic coating services for your vehicle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://kit.fontawesome.com/c0974ead1d.js" crossorigin="anonymous"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      'sans': ['Inter', 'sans-serif'],
                    },
                    animation: {
                      'float': 'float 6s ease-in-out infinite',
                      'glow': 'glow 2s ease-in-out infinite alternate',
                    },
                    keyframes: {
                      float: {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-20px)' },
                      },
                      glow: {
                        '0%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
                        '100%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)' },
                      },
                    },
                  },
                },
              }
            `,
          }}
        />
      </Head>

      <div classname="bg-gradient-to-b from-[#001a0d] via-[#001100] to-black" style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${100/scale}%`,
        height: `${100/scale}%`,
        position: 'absolute',
        
      }}>
        
      

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10" >
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="max-w-[180px] h-auto flex items-center">
              <img
                className="w-full max-h-16 object-contain"
                src="assets/images/logo-v2.png"
                alt="Mr.Gloss Ceramic Coating Logo"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-green-400 transition-colors">Home</a>
              <a href="#services" className="hover:text-green-400 transition-colors">Services</a>
              <a href="#testimonials" className="hover:text-green-400 transition-colors">Testimonials</a>
              <a href="#franchise" className="hover:text-green-400 transition-colors">Franchise</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-5 sm:py-10 md:py-20 px-2">
        <BackgroundText text="MR.GLOSS" />
        <CarAnimationComponent/>
      </section>

      {/* Packages Section */}
      <section id="next-section" className="py-20 px-6 bg-gradient-to-b from-[#001a0d] via-[#001100] to-black ">
  <div className="container mx-auto">
    <h3 className="text-5xl font-extrabold text-center mb-16">Star Packages</h3>
    
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {packages.map((pkg: Package, index: number) => (
        <div 
          key={index}
          className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
            activePackage === index ? 'ring-2 ring-green-400' : ''
          }`}
          onMouseEnter={() => handlePackageHover(index)}
          onMouseLeave={handlePackageLeave}
        >
            <ShinyText
              text={pkg.name}
              disabled={false}
              speed={8}
              className="text-4xl font-black tracking-wide mb-6 font-montserrat uppercase drop-shadow-2xl"
              gradient={
                pkg.name === 'Gold'
                  ? 'linear-gradient(90deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #FFA500 75%, #FFD700 100%)'
                  : pkg.name === 'Silver'
                  ? 'linear-gradient(90deg, #696969 0%, #A9A9A9 25%, #696969 50%, #A9A9A9 75%, #696969 100%)'
                  : pkg.name === 'Platinum'
                  ? 'linear-gradient(90deg, #E5E4E2 0%, #C0C0C0 25%, #E5E4E2 50%, #C0C0C0 75%, #E5E4E2 100%)'
                  : undefined
              }
            />
          
          <div className="space-y-4 mb-8">
            {pkg.features.map((feature: string, featureIndex: number) => (
              <div key={featureIndex} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => handleEnquireClick(pkg.name)}
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-black font-bold py-3 px-6 rounded-xl hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Enquire Now
          </button>
        </div>
      ))}
    </div>
    
    <div className="text-center mt-12">
      <button className="text-lg  bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300 ">
        More Details About Packages
      </button>
    </div>
  </div>
</section>


      <ReviewSection /> 

      <div className="text-center mt-12">
        <button className="text-lg  bg-white/10  border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300 ">
          See Our Star Reviews 
        </button>
      </div>

      {/* Counter Section */}
      <section className="w-full py-24 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white">
        <WhyChooseUs />
      </section>


      {/* Rating Section */}
      <div className="flex items-center justify-center p-5">
        <SpotlightRatingCard
          logo={
            <div className="flex flex-col items-center mb-4">
              <img src="assets/images/logo-v2.png" alt="Mr. Gloss Logo" className="w-3/4 h-auto object-contain m-5" />
              {/* <span className="text-2xl font-extrabold text-green-300 tracking-wide">MR.GLOSS</span>
              <span className="text-sm font-semibold text-green-100 tracking-widest mt-1">CERAMIC COATING</span> */}
            </div>
          }
          rating={4.8}
          reviewCount={125}
          reviewSource="Google Reviews"
          glowColor="#10b981"
          onViewReviews={() => {
            window.open('https://your-google-reviews-link', '_blank');
          }}
        />
      </div>
      
      






      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Services</h3>
          <div className="flex justify-center items-center" style={{ minHeight: '400px' }}>
            <GlassIcons
              items={[
                {
                  icon: <FiShield size={32} />,
                  color: 'green',
                  label: 'Ceramic Coating',
                  link: '/blog/ceramic-coating',
                },
                {
                  icon: <FiDroplet size={32} />,
                  color: 'green',
                  label: 'Car Wash & Detailing',
                  link: '/blog/car-wash-detailing',
                },
                {
                  icon: <FiSun size={32} />,
                  color: 'green',
                  label: 'Sunfilm Installation',
                  link: '/blog/sunfilm-installation',
                },
                {
                  icon: <FiLayers size={32} />,
                  color: 'green',
                  label: 'Paint Protection',
                  link: '/blog/paint-protection',
                },
              ]}
              className="justify-center items-center"
            />
          </div>
        </div>
      </section>

    
      {/* Footer */}
        
        <Footer/>
    
    </div>

    </div>
  )
}