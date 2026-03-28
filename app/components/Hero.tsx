'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === backgroundImages.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      
      {/* BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={src}
              alt={`Agarwood background ${index + 1}`}
              fill
              className="object-cover transition-transform duration-1000 ease-in-out"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-700"></div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-slate-50">
        
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Welcome to
        </h1>
        
        <h2 className={`text-3xl sm:text-5xl md:text-7xl font-semibold mb-2 sm:mb-3 uppercase tracking-wider text-shadow-lg transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="text-[#efb10c]">C</span>LP GREEN VENTURE INC.
        </h2>
        
        <h3 className={`max-w-4xl text-xs sm:text-sm md:text-md mt-3 sm:mt-4 mb-6 sm:mb-8 leading-relaxed transition-all duration-700 delay-300 px-2 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          At CLP GREEN VENTURE INC., we are committed to advancing sustainable and responsible agriculture through the cultivation and management of agarwood. Our mission is to provide guidance, expertise, and high-quality seedlings to growers, enthusiasts, and investors, ensuring that every tree reaches its full potential.<br/><br/>
          We combine scientific horticulture practices with practical business insight, helping our clients grow not just plants, but long-term value. From seedling care and nursery management to soil testing, sustainable planting, and health standards, CLP is your trusted partner in every step of the agarwood journey.
        </h3>
        
        <div className={`mb-8 absolute bottom-4 sm:bottom-0 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button 
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 active:scale-95"
          >
            Learn More
          </button>
          
          {/* CAROUSEL INDICATORS */}
          <div className="flex space-x-2 sm:space-x-3 mt-6 sm:mt-8">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ease-out ${
                  index === currentImage 
                    ? 'bg-white w-4 sm:w-8' 
                    : 'bg-white/50 w-2 sm:w-3 hover:bg-white/70'
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