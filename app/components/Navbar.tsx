'use client' // Add this at the top for interactivity

import Image from 'next/image'
import { Send } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')

  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'gallery']
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if section is in viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo/clplogo.png"
              alt="CLP Logo"
              width={80}
              height={40}
              className="object-cover"
            />
          </div>
          
          {/* MENU LINKS */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <a 
              href="#home" 
              className={`px-2 py-1 uppercase text-sm font-bold transition-colors ${
                activeSection === 'home' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </a>
            
            <a 
              href="#about" 
              className={`px-2 py-1 uppercase text-sm font-bold transition-colors ${
                activeSection === 'about' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              About
            </a>
            
            <a 
              href="#seminars" 
              className={`px-2 py-1 uppercase text-sm font-bold transition-colors ${
                activeSection === 'gallery' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Seminars
            </a>

            <a 
              href="#gallery" 
              className={`px-2 py-1 uppercase text-sm font-bold transition-colors ${
                activeSection === 'gallery' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Gallery
            </a>
            
            <a 
              href="https://web.facebook.com/profile.php?id=61586268879623" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-colors"
            >
              <Send size={16} className="text-white" />
              <span>Message Us</span>
            </a>
          </div>
          
        </div>
      </div>
    </nav>
  )
}