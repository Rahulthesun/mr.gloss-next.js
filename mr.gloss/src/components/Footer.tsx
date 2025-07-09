import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, MessageCircle, Mail, Home, Settings, Users, Info, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-lime-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand & Address - Enhanced */}
          <div className="lg:col-span-1 space-y-6">
            <div className="group">
              <div className="mb-8 transform transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/assets/images/logo-v2.png" 
                  alt="Mr.Gloss logo"
                  className="h-12 w-auto object-contain drop-shadow-2xl"
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Premium automotive detailing services that bring out the best in your vehicle. 
                Excellence in every detail, shine in every finish.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Location</h4>
              <div className="text-gray-400 text-sm space-y-2 pl-1">
                <p className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span>123 Chennai Street, Chennai Main<br />Tamil Nadu, India<br />Chennai - 600001</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions - Enhanced */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold mb-8 relative">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Quick Actions
              </span>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
            </h3>
            
            <div className="space-y-4">
              {[
                { 
                  href: "tel:8015015467", 
                  icon: Phone, 
                  label: "Call Now", 
                  subtitle: "+91 801-501-5467",
                  color: "text-green-400",
                  bgColor: "bg-green-500/10 hover:bg-green-500/20"
                },
                { 
                  href: "https://maps.google.com/?q=Chennai", 
                  icon: MapPin, 
                  label: "Get Directions", 
                  subtitle: "Find us easily",
                  color: "text-blue-400",
                  bgColor: "bg-blue-500/10 hover:bg-blue-500/20"
                },
                { 
                  href: "https://wa.me/918015015467", 
                  icon: MessageCircle, 
                  label: "WhatsApp Chat", 
                  subtitle: "Quick support",
                  color: "text-emerald-400",
                  bgColor: "bg-emerald-500/10 hover:bg-emerald-500/20"
                },
                { 
                  href: "mailto:contact@mrgloss.com", 
                  icon: Mail, 
                  label: "Email Us", 
                  subtitle: "contact@mrgloss.com",
                  color: "text-emerald-400",
                  bgColor: "bg-emerald-500/10 hover:bg-emerald-500/20"
                }
              ].map((action, index) => (
                <a 
                  key={index}
                  href={action.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group flex items-center p-4 rounded-xl ${action.bgColor} border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:translateY-[-2px] hover:shadow-xl`}
                >
                  <div className={`${action.color} p-2 rounded-lg bg-gray-800/50 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-white font-medium text-sm group-hover:text-gray-100 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">
                      {action.subtitle}
                    </p>
                  </div>
                  <ExternalLink className={`h-4 w-4 ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Enhanced */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold mb-8 relative">
              <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                Navigation
              </span>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-green-400 to-lime-400 rounded-full"></div>
            </h3>
            
            <nav className="space-y-3">
              {[
                { href: "/", label: "Home", icon: Home },
                { href: "/services", label: "Services", icon: Settings },
                { href: "/about", label: "About Us", icon: Info },
                { href: "/contact", label: "Contact", icon: Phone }
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-all duration-300 hover:translate-x-2"
                >
                  <link.icon className="h-4 w-4 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Newsletter - New Section */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold mb-8 relative">
              <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                Stay Connected
              </span>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-lime-400 to-green-400 rounded-full"></div>
            </h3>
            
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Subscribe for exclusive offers and car care tips!
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300"
                />
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Follow Us</h4>
              <div className="flex space-x-3">
                {['facebook', 'instagram', 'twitter', 'youtube'].map((social, index) => (
                  <a 
                    key={index}
                    href={`#${social}`}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm font-bold uppercase">
                      {social[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Section */}
      <div className="relative z-10 border-t border-gray-800/50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            
            {/* Left: Developer Credit */}
            <a 
              href="https://buildify-web.in/" 
              className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xs font-bold">&lt;/&gt;</span>
                </div>
                <div>
                  <p className="font-bold text-sm group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Buildify-Web
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-gray-400">Digital Solutions</p>
                </div>
              </div>
            </a>

            {/* Center: Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © 2025 <span className="font-semibold text-white">Mr.Gloss Ceramic Coating</span>. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Made with ❤️ for automotive excellence
              </p>
            </div>

            {/* Right: Quick Links */}
            <div className="flex items-center space-x-6 text-xs">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;