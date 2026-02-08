'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Gallery images - using your carousel images as templates
  const galleryImages = [
    { id: 1, src: '/images/carousel1.jpg', alt: 'Agarwood Plantation', category: 'plantation' },
    { id: 2, src: '/images/carousel2.jpg', alt: 'Agarwood Harvest', category: 'harvest' },
    { id: 3, src: '/images/carousel3.jpg', alt: 'Agarwood Processing', category: 'processing' },
    { id: 4, src: '/images/carousel4.jpg', alt: 'Agarwood Products', category: 'products' },
    { id: 5, src: '/images/carousel5.jpg', alt: 'Plantation Overview', category: 'plantation' },
    { id: 6, src: '/images/carousel6.jpg', alt: 'Quality Inspection', category: 'quality' },
    { id: 7, src: '/images/carousel7.jpg', alt: 'Sustainable Farming', category: 'plantation' },
    { id: 8, src: '/images/carousel8.jpg', alt: 'Expert Training', category: 'training' },
    { id: 9, src: '/images/carousel9.jpg', alt: 'Community Development', category: 'community' },
    { id: 10, src: '/images/carousel10.jpg', alt: 'Agarwood Resin', category: 'products' },
  ]

  const categories = ['All', 'plantation', 'harvest', 'processing', 'products', 'quality', 'training', 'community']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  // Hide/show navbar when fullscreen is active
  useEffect(() => {
    const navbar = document.querySelector('nav')
    if (navbar) {
      if (isFullscreen) {
        navbar.style.display = 'none'
      } else {
        navbar.style.display = 'flex'
      }
    }
    
    // Cleanup: Ensure navbar is visible when component unmounts
    return () => {
      const navbar = document.querySelector('nav')
      if (navbar) {
        navbar.style.display = 'flex'
      }
    }
  }, [isFullscreen])

  const handleImageClick = (id: number) => {
    setSelectedImage(id)
    setIsFullscreen(true)
    // Prevent body scroll when fullscreen is open
    document.body.style.overflow = 'hidden'
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setTimeout(() => {
      setSelectedImage(null)
      document.body.style.overflow = 'auto'
    }, 300)
  }

  const navigateImage = (direction: 'next' | 'prev') => {
    if (selectedImage === null) return
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredImages.length
      setSelectedImage(filteredImages[nextIndex].id)
    } else {
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
      setSelectedImage(filteredImages[prevIndex].id)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return
      
      switch (e.key) {
        case 'Escape':
          closeFullscreen()
          break
        case 'ArrowRight':
          navigateImage('next')
          break
        case 'ArrowLeft':
          navigateImage('prev')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, selectedImage])

  return (
    <section id="gallery" className="relative z-10 bg-[#060b05] px-6 py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-green-500 font-mono tracking-widest uppercase text-sm block mb-4">Visual Journey</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Our <span className="text-green-600">Agarwood</span> Gallery
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Explore our journey through sustainable agarwood cultivation, from plantation to premium products
          </p>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              className="relative break-inside-avoid group cursor-pointer"
              onClick={() => handleImageClick(image.id)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-zinc-900/30 border border-green-800/20 transition-all duration-500 group-hover:border-green-600/30 group-hover:scale-[1.02]">
                {/* IMAGE */}
                <div className="relative h-64 w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium">{image.alt}</p>
                      <p className="text-green-400 text-sm mt-1 capitalize">{image.category}</p>
                    </div>
                  </div>
                  
                  {/* ZOOM INDICATOR */}
                  <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-zinc-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Images Found</h3>
            <p className="text-zinc-400">Try selecting a different category</p>
          </div>
        )}

        {/* IMAGE COUNT */}
        <div className="text-center mt-12">
          <p className="text-zinc-500 text-sm">
            Showing {filteredImages.length} of {galleryImages.length} images • Click to enlarge
          </p>
        </div>

        {/* FULLSCREEN VIEWER */}
        {selectedImage !== null && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-500 ${
            isFullscreen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            
            {/* CLOSE BUTTON */}
            <button
              onClick={closeFullscreen}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* NAVIGATION BUTTONS */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* IMAGE DISPLAY */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {filteredImages.map((image) => (
                image.id === selectedImage && (
                  <div key={image.id} className="relative w-full max-w-6xl h-full max-h-[90vh]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                    
                    {/* CAPTION */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{image.alt}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-green-400 capitalize">{image.category}</p>
                        <p className="text-zinc-400 text-sm">
                          Image {filteredImages.findIndex(img => img.id === selectedImage) + 1} of {filteredImages.length}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* KEYBOARD SHORTCUTS HINT */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-zinc-400 text-sm">
                <span className="inline-block bg-zinc-800 px-2 py-1 rounded mr-2">← →</span> Navigate
                <span className="inline-block bg-zinc-800 px-2 py-1 rounded mx-2">ESC</span> Close
              </p>
            </div>
          </div>
        )}

        {/* GALLERY INFO */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Behind the Scenes</h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Our gallery showcases the complete journey of sustainable agarwood cultivation. 
              From carefully managed plantations to expert processing techniques, every image tells a story of quality, sustainability, and Filipino agricultural excellence.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">10+</div>
                <div className="text-zinc-400 text-sm">Plantation Sites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">5</div>
                <div className="text-zinc-400 text-sm">Processing Stages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">100%</div>
                <div className="text-zinc-400 text-sm">Sustainable</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">24/7</div>
                <div className="text-zinc-400 text-sm">Quality Monitoring</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}