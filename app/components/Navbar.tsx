'use client'
import { Send, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY.current) {
        setIsScrollingDown(true)
        if (currentScrollY > 100) setIsMinimized(true)
      } else if (currentScrollY < lastScrollY.current) {
        setIsScrollingDown(false)
        setIsMinimized(false)
      }
      
      lastScrollY.current = currentScrollY
      
      if (currentScrollY <= 10) {
        setIsScrolled(false)
        setIsMinimized(false)
      } else {
        setIsScrolled(!isScrollingDown)
      }
      
      const sections = ['home', 'about', 'seminars', 'products', 'gallery']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrollingDown])

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/70 backdrop-blur-md' 
        : 'bg-transparent'
    } ${isMinimized ? 'py-1' : 'py-0'}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isMinimized ? 'h-10' : 'h-16'
        }`}>
          
          {/* LEFT: LOGO */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center rounded-full">
              <div className={`relative transition-all duration-300 ${
                isMinimized ? 'w-8 h-8' : 'w-10 h-10 sm:w-12 sm:h-12'
              }`}>
                <Image
                  src="/images/logo/clplogo.png"
                  alt="CLP Logo"
                  fill
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 40px, 48px"
                  priority
                />
              </div>
            </a>
          </div>

          {/* DESKTOP NAV LINKS (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 transition-all duration-300">
            {['home', 'about', 'products', 'seminars', 'gallery'].map((section) => (
              <a 
                key={section}
                href={`#${section}`}
                className={`px-2 py-1 uppercase font-bold transition-colors relative ${
                  activeSection === section 
                    ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-green-500' 
                    : 'text-white/80 hover:text-white'
                } ${isMinimized ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'}`}
              >
                {section === 'home' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* RIGHT: MESSAGE US BUTTON (desktop) */}
          <a 
            href="https://www.facebook.com/profile.php?id=61573163535908" 
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:flex items-center gap-2 transition-all duration-300 ${
              isScrolled 
                ? 'bg-green-600 hover:bg-green-700 text-white backdrop-blur-sm' 
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
            } ${isMinimized ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'} rounded-md border border-green-500/30 hover:border-green-500/50`}
          >
            <Send size={isMinimized ? 14 : 16} />
            <span>Message Us</span>
          </a>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-green-800/30 py-4 px-4 flex flex-col space-y-3">
            {['home', 'about', 'products', 'seminars', 'gallery'].map((section) => (
              <a 
                key={section}
                href={`#${section}`}
                onClick={handleLinkClick}
                className={`block py-2 px-3 rounded-lg uppercase font-bold transition-colors ${
                  activeSection === section 
                    ? 'bg-green-600 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {section === 'home' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            {/* Mobile Message Us button */}
            <a 
              href="https://www.facebook.com/profile.php?id=61573163535908" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg mt-2"
            >
              <Send size={16} />
              <span>Message Us</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}