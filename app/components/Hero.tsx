'use client'  // THIS LINE IS CRITICAL FOR INTERACTIVITY

import { useState, useEffect } from 'react'  // Import React tools
import Image from 'next/image'  // Import Next.js Image

export default function Hero() {
  // MEMORY BOX 1: Which image to show
  const [currentImage, setCurrentImage] = useState(0)
  
  // List of images for the carousel
  const backgroundImages = [
    '/images/carousel1.jpg',
    '/images/carousel2.jpg', 
    '/images/carousel3.jpg',
    '/images/carousel4.jpg',
    '/images/carousel5.jpg',
    '/images/carousel6.jpg',
    '/images/carousel7.jpg',
    '/images/carousel8.jpg',
    '/images/carousel9.jpg',
    '/images/carousel10.jpg',
  ]

  // AUTOMATIC TIMER: Changes image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      // Move to next image, loop back to first if at end
      setCurrentImage((prev) => {
        if (prev === backgroundImages.length - 1) {
          return 0  // Go back to first image
        } else {
          return prev + 1  // Go to next image
        }
      })
    }, 5000) // 5000ms = 5 seconds
    
    // Clean up: Stop timer when component unmounts
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      
      {/* BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Agarwood background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* DARK OVERLAY FOR BETTER TEXT READABILITY */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* CONTENT ON TOP */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-slate-50">
        
        {/* MAIN TITLE */}
        <h1 className="text-4xl font-bold mb-4">
          Welcome to
        </h1>
        
        <h2 className="text-7xl font-semibold mb-3 uppercase tracking-wider text-shadow-lg">
          <span className="text-[#efb10c]">C</span>LP Green Venture
        </h2>
        
        <h3 className="max-w-4xl text-md mt-4 mb-8 leading-tight">
          At CLP Green Venture, we are committed to advancing sustainable and responsible agriculture through the cultivation and management of agarwood. Our mission is to provide guidance, expertise, and high-quality seedlings to growers, enthusiasts, and investors, ensuring that every tree reaches its full potential.<br></br><br></br>
          We combine scientific horticulture practices with practical business insight, helping our clients grow not just plants, but long-term value. From seedling care and nursery management to soil testing, sustainable planting, and health standards, CLP is your trusted partner in every step of the agarwood journey.
        </h3>
        
        <div className="mb-8 absolute bottom-0">
          {/* CALL TO ACTION BUTTON */}
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition">
            Learn More
          </button>
          
          {/* CAROUSEL INDICATORS */}
          <div className="flex space-x-3 mt-8">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImage 
                    ? 'bg-white w-8'  // Active indicator
                    : 'bg-white/50'   // Inactive indicator
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  )
}