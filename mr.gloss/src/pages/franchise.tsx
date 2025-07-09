import Head from 'next/head'
import { useState } from 'react'
import Footer from '../components/Footer'

export default function Franchise() {
  const [showEnquiry, setShowEnquiry] = useState(false)

  const handleEnquireClick = () => {
    setShowEnquiry(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a0d] via-[#001100] to-black">
      <Head>
        <title>Franchise - Mr. Gloss Ceramic Coating</title>
        <meta name="description" content="Join the best car detailing franchise in the industry!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="w-72 h-auto">
              <img className="h-full w-auto" src="assets/images/logo-v2.png" alt="Mr.Gloss Ceramic Coating Logo" />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="hover:text-green-400 transition-colors">Home</a>
              <a href="/franchise" className="hover:text-green-400 transition-colors font-bold">Franchise</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Franchise
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
            Unlock your entrepreneurial potential with Mr. Gloss! Discover why car detailing is the most exciting and profitable industry to invest in today.
          </p>
        </div>
      </section>

      {/* Article Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20">
          <h3 className="text-3xl font-bold mb-6 text-green-400">Why Car Detailing is the Best Industry for Entrepreneurs</h3>
          <article className="text-gray-200 space-y-6 text-lg">
            <p>
              The automotive detailing industry is booming, driven by the ever-increasing demand for vehicle care and protection. As more people invest in their cars, the need for professional detailing services has skyrocketed. This industry offers a unique blend of passion, profitability, and growth potential.
            </p>
            <p>
              <strong>High Demand:</strong> Every car owner wants their vehicle to look its best. With the rise of luxury vehicles and a growing awareness of paint protection, ceramic coating and detailing services are more sought after than ever.
            </p>
            <p>
              <strong>Recurring Revenue:</strong> Detailing is not a one-time service. Customers return for regular maintenance, upgrades, and new protection solutions, ensuring a steady stream of income.
            </p>
            <p>
              <strong>Low Entry Barrier:</strong> With the right training and support, anyone can start a successful detailing business. Our franchise model provides you with all the tools, training, and branding you need to hit the ground running.
            </p>
            <p>
              <strong>Community & Support:</strong> Join a network of passionate entrepreneurs and benefit from ongoing support, marketing, and operational guidance from the Mr. Gloss team.
            </p>
            <p>
              <strong>Future-Proof:</strong> As vehicles become more advanced, the need for specialized care only increases. Stay ahead of the curve with our innovative products and services.
            </p>
            <p>
              Ready to take the next step? Download our franchise brochure or enquire now to learn more about this exciting opportunity!
            </p>
          </article>

          <div className="flex flex-col sm:flex-row gap-6 mt-10 justify-center">
            <a
              href="/assets/brochure.pdf"
              download
              className="bg-gradient-to-r from-green-400 to-green-600 text-black font-bold py-3 px-8 rounded-xl hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 text-center"
            >
              Download Brochure
            </a>
            <button
              onClick={handleEnquireClick}
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-bold text-center"
            >
              Enquire Now
            </button>
          </div>

          {showEnquiry && (
            <div className="mt-8 p-6 bg-black/80 rounded-xl border border-green-400 text-green-200 text-center">
              <h4 className="text-2xl font-bold mb-2">Thank you for your interest!</h4>
              <p>Our team will contact you soon regarding franchise opportunities.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
} 