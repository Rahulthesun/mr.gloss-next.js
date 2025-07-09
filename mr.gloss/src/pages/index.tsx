import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import ReviewSection from '../components/ReviewSection'
import CountUp from '../components/CounterSection'
import WhyChooseUs from '../components/StatItem'

import ProfileCard from '../components/ProfileCard'
import Footer from '../components/Footer'
  


interface Package {
  name: string
  features: string[]
  color: string
}

interface Service {
  name: string
  icon?: string
}

export default function Home(): JSX.Element {
  const [activePackage, setActivePackage] = useState<number | null>(null)

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
      <Head>
        <title>Mr. Gloss Ceramic Coating - Protect Your Ride</title>
        <meta name="description" content="Premium ceramic coating services for your vehicle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="w-72 h-auto">
              <img className="h-full w-auto" src="assets/images/logo-v2.png" alt="Mr.Gloss Ceramic Coating Logo"></img>
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
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Protect Your Ride
          </h2>
          
          <div className="relative max-w-4xl mx-auto mb-16">
              <img
                src="https://www.pngarts.com/files/8/Ferrari-SF90-Stradale-Transparent-Image.png"
                alt="Ferrari Sports Car"
               className="w-full h-full object-contain rounded-2xl"
              />
          </div>

        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Star Packages</h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg: Package, index: number) => (
              <div 
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  activePackage === index ? 'ring-2 ring-green-400' : ''
                }`}
                onMouseEnter={() => handlePackageHover(index)}
                onMouseLeave={handlePackageLeave}
              >
                <h4 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                  {pkg.name}
                </h4>
                
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
            <button className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300">
              More Details About Packages
            </button>
          </div>
        </div>
      </section>

      <ReviewSection /> 

      {/* Counter Section */}
      <section className="w-full py-24 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white">
        <WhyChooseUs />
      </section>


      {/* Rating Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto bg-gradient-to-r from-blue-900/50 to-blue-800/50 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/20">
            <div className="text-6xl font-bold text-yellow-400 mb-4">4.8</div>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i: number) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <p className="text-xl font-semibold mb-6">Mr.Gloss Ceramic Coating</p>
            <button className="bg-white text-blue-900 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Visit Google Profile
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Services</h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service: string, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-400 to-green-600 text-black font-bold py-6 px-8 rounded-2xl text-center text-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

    
      {/* Footer */}
        
        <Footer/>
    
    </div>
  )
}