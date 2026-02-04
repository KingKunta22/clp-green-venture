'use client'
import Image from 'next/image'
import { Send } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'  // Added useRef

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  
  // Track previous scroll position
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // DETECT SCROLL DIRECTION
      if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN
        setIsScrollingDown(true)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP
        setIsScrollingDown(false)
      }
      
      // Save current scroll position for next comparison
      lastScrollY.current = currentScrollY
      
      // Job 1: Check if at the very top
      if (currentScrollY <= 10) {
        setIsScrolled(false)  // At top = always transparent
      } else {
        // Not at top = white when scrolling down, transparent when scrolling up
        setIsScrolled(isScrollingDown)
      }
      
      // Job 2: Check which section is active
      const sections = ['home', 'about', 'seminars', 'gallery']
      
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
  }, [isScrollingDown])  // Added dependency

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md'  // White when scrolling down
        : 'bg-transparent'       // Transparent when scrolling up or at top
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* MENU LINKS */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <a 
              href="#home" 
              className={`px-2 py-1 uppercase text-sm font-bold transition-colors ${
                activeSection === 'home' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : `${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-green-600`
              }`}
            >
              Home
            </a>
            
            <a 
              href="#about" 
              className={`px-2 py-1 uppercase text-sm font-bold transition-colors ${
                activeSection === 'about' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : `${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-green-600`
              }`}
            >
              About
            </a>
            
            <a 
              href="#seminars"
              className={`px-2 py-1 uppercase text-sm font-bold transition-colors ${
                activeSection === 'seminars'
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : `${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-green-600`
              }`}
            >
              Seminars
            </a>

            <a 
              href="#gallery" 
              className={`px-2 py-1 uppercase text-sm font-bold transition-colors ${
                activeSection === 'gallery' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : `${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-green-600`
              }`}
            >
              Gallery
            </a>
            
          </div>
              
          <a 
            href="https://web.facebook.com/profile.php?id=61586268879623" 
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${
              isScrolled 
                ? 'bg-green-600 hover:bg-green-700 text-white'  // Green button when white navbar
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'  // Glass button when transparent
            } px-3 py-2 rounded-md transition-colors`}
          >
            <Send size={16} />
            <span>Message Us</span>
          </a>

        </div>
      </div>
    </nav>
  )
}