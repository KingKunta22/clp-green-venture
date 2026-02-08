'use client'
import { Send } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  
  // Track previous scroll position
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // DETECT SCROLL DIRECTION
      if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN
        setIsScrollingDown(true)
        // Minimize navbar when scrolling down (after a small threshold)
        if (currentScrollY > 100) {
          setIsMinimized(true)
        }
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP
        setIsScrollingDown(false)
        // Restore navbar size when scrolling up
        setIsMinimized(false)
      }
      
      // Save current scroll position for next comparison
      lastScrollY.current = currentScrollY
      
      // Job 1: Check if at the very top
      if (currentScrollY <= 10) {
        setIsScrolled(false)  // At top = always transparent
        setIsMinimized(false) // At top = restore full size
      } else {
        // Not at top = show background when scrolling UP, transparent when scrolling DOWN
        setIsScrolled(!isScrollingDown)
      }
      
      // Job 2: Check which section is active
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/70 backdrop-blur-md'  // Dark semi-transparent when scrolling UP
        : 'bg-transparent'                // Transparent when scrolling DOWN or at top
    } ${isMinimized ? 'py-1' : 'py-0'}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isMinimized ? 'h-10' : 'h-16'
        }`}>
          
          {/* LEFT: LOGO */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center rounded-full">
              <div className={`relative transition-all duration-300 ${
                isMinimized ? 'w-8 h-8' : 'w-12 h-12'
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

          {/* CENTER: NAV LINKS */}
          <div className={`flex items-center space-x-4 sm:space-x-8 transition-all duration-300 ${
            isMinimized ? 'text-sm' : 'text-base'
          }`}>
            <a 
              href="#home" 
              className={`px-2 py-1 uppercase font-bold transition-colors relative ${
                activeSection === 'home' 
                  ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-green-500' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Home
            </a>
            
            <a 
              href="#about" 
              className={`px-2 py-1 uppercase font-bold transition-colors relative ${
                activeSection === 'about' 
                  ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-green-500' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              About
            </a>

            <a 
              href="#products"
              className={`px-2 py-1 uppercase font-bold transition-colors relative ${
                activeSection === 'products'
                  ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-green-500' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Products
            </a>      

            <a 
              href="#seminars"
              className={`px-2 py-1 uppercase font-bold transition-colors relative ${
                activeSection === 'seminars'
                  ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-green-500' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Seminars
            </a>

            <a 
              href="#gallery" 
              className={`px-2 py-1 uppercase font-bold transition-colors relative ${
                activeSection === 'gallery' 
                  ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-green-500' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Gallery
            </a>
          </div>
              
          {/* RIGHT: MESSAGE US BUTTON */}
          <a 
            href="https://web.facebook.com/profile.php?id=61586268879623" 
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 transition-all duration-300 ${
              isScrolled 
                ? 'bg-green-600 hover:bg-green-700 text-white backdrop-blur-sm'  // Solid green when navbar has background
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'    // Glass button when transparent
            } ${isMinimized ? 'px-2 py-1 text-sm' : 'px-3 py-2'} rounded-md border border-green-500/30 hover:border-green-500/50`}
          >
            <Send size={isMinimized ? 14 : 16} />
            <span>Message Us</span>
          </a>

        </div>
      </div>
    </nav>
  )
}