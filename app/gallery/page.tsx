'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, Maximize2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [showAllImages, setShowAllImages] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-section-index') || '0')
          setVisibleSections(prev => {
            const newSet = new Set(prev)
            newSet.add(index)
            return newSet
          })
        }
      })
    }, observerOptions)

    // Observe all sections
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Gallery images - updated to gallery1 to gallery25 with varied categories
  const galleryImages = Array.from({ length: 25 }, (_, i) => {
    const categories = ['plantation', 'harvest', 'processing', 'products', 'quality', 'training', 'community']
    const category = categories[i % categories.length]
    
    const altTexts = {
      plantation: [
        'Agarwood Plantation Landscape', 'Young Agarwood Saplings', 'Mature Agarwood Trees',
        'Sustainable Farming Practice', 'Plantation Irrigation System', 'Organic Fertilizer Application'
      ],
      harvest: [
        'Agarwood Harvesting Process', 'Selective Tree Harvesting', 'Fresh Agarwood Collection',
        'Sustainable Harvest Methods', 'Harvest Quality Control', 'Field Processing'
      ],
      processing: [
        'Agarwood Processing Facility', 'Resin Extraction Process', 'Quality Grading System',
        'Traditional Processing Methods', 'Modern Extraction Equipment', 'Product Sorting'
      ],
      products: [
        'Premium Agarwood Oil', 'Agarwood Incense Products', 'Finished Agarwood Chips',
        'Product Packaging', 'Quality Assurance Testing', 'Export Ready Products'
      ],
      quality: [
        'Quality Inspection Process', 'Laboratory Testing', 'Expert Quality Assessment',
        'Standards Compliance Check', 'Product Certification', 'Final Quality Control'
      ],
      training: [
        'Farmer Training Session', 'Inoculation Workshop', 'Sustainable Practice Seminar',
        'Hands-on Training', 'Expert Demonstration', 'Community Education'
      ],
      community: [
        'Local Community Partnership', 'Farmer Cooperative Meeting', 'Social Responsibility Project',
        'Community Development Program', 'Local Employment', 'Sustainable Livelihood'
      ]
    }

    const alt = altTexts[category as keyof typeof altTexts]?.[i % altTexts[category as keyof typeof altTexts].length] || `${category} image ${i + 1}`
    
    return {
      id: i + 1,
      src: `/images/gallery${i + 1}.jpg`,
      alt: alt,
      category: category
    }
  })

  const categories = ['All', 'plantation', 'harvest', 'processing', 'products', 'quality', 'training', 'community']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  // Limit display to 15 images initially
  const displayedImages = showAllImages ? filteredImages : filteredImages.slice(0, 15)

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
    
    const currentIndex = displayedImages.findIndex(img => img.id === selectedImage)
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % displayedImages.length
      setSelectedImage(displayedImages[nextIndex].id)
    } else {
      const prevIndex = (currentIndex - 1 + displayedImages.length) % displayedImages.length
      setSelectedImage(displayedImages[prevIndex].id)
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
        <div 
          ref={(el) => { sectionRefs.current[0] = el }}
          data-section-index="0"
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-green-500 font-mono tracking-widest uppercase text-sm block mb-4">Visual Journey</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Our <span className="text-green-600">Agarwood</span> Gallery
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Explore our journey through sustainable agarwood cultivation, from plantation to premium products
          </p>
        </div>

        {/* CATEGORY FILTERS */}
        <div 
          ref={(el) => { sectionRefs.current[1] = el }}
          data-section-index="1"
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ease-out transform ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category)
                setShowAllImages(false)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-green-600 text-white scale-105'
                  : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: visibleSections.has(1) ? 1 : 0,
                transform: visibleSections.has(1) ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div 
          ref={(el) => { sectionRefs.current[2] = el }}
          data-section-index="2"
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {displayedImages.map((image, index) => (
            <div 
              key={image.id}
              className={`relative break-inside-avoid group cursor-pointer transition-all duration-700 ease-out transform ${
                visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                animation: visibleSections.has(2) ? 'fadeInUp 0.5s ease-out forwards' : 'none'
              }}
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
                  <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW MORE / VIEW LESS BUTTON */}
        {filteredImages.length > 15 && (
          <div className="text-center my-8">
            <button
              onClick={() => setShowAllImages(!showAllImages)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/20 hover:shadow-green-900/40"
            >
              {showAllImages ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  View More Images ({filteredImages.length - 15} more)
                </>
              )}
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {filteredImages.length === 0 && (
          <div 
            ref={(el) => { sectionRefs.current[3] = el }}
            data-section-index="3"
            className={`text-center py-20 transition-all duration-1000 ease-out transform ${
              visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
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
        <div 
          ref={(el) => { sectionRefs.current[4] = el }}
          data-section-index="4"
          className={`text-center mt-8 transition-all duration-1000 ease-out transform ${
            visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-zinc-500 text-sm">
            Showing {displayedImages.length} of {filteredImages.length} images • {galleryImages.length} total images in gallery • Click to enlarge
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="text-xs text-zinc-600">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span> Plantation
            </div>
            <div className="text-xs text-zinc-600">
              <span className="inline-block w-3 h-3 rounded-full bg-green-600 mr-1"></span> Harvest
            </div>
            <div className="text-xs text-zinc-600">
              <span className="inline-block w-3 h-3 rounded-full bg-green-700 mr-1"></span> Processing
            </div>
            <div className="text-xs text-zinc-600">
              <span className="inline-block w-3 h-3 rounded-full bg-green-800 mr-1"></span> Products
            </div>
          </div>
        </div>

        {/* FULLSCREEN VIEWER */}
        {selectedImage !== null && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-500 ${
            isFullscreen ? 'opacity-100 animate-fade-in' : 'opacity-0 pointer-events-none'
          }`}>
            
            {/* CLOSE BUTTON */}
            <button
              onClick={closeFullscreen}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* NAVIGATION BUTTONS */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* IMAGE DISPLAY */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {displayedImages.map((image) => (
                image.id === selectedImage && (
                  <div 
                    key={image.id} 
                    className="relative w-full max-w-6xl h-full max-h-[90vh] animate-scale-in"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                    
                    {/* CAPTION */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 animate-fade-up">
                      <h3 className="text-2xl font-bold text-white mb-2">{image.alt}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <p className="text-green-400 capitalize">{image.category}</p>
                          <span className="text-zinc-500">•</span>
                          <p className="text-zinc-400 text-sm">
                            Gallery #{image.id}
                          </p>
                        </div>
                        <p className="text-zinc-400 text-sm">
                          Image {displayedImages.findIndex(img => img.id === selectedImage) + 1} of {displayedImages.length}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* KEYBOARD SHORTCUTS HINT */}
            <div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <p className="text-zinc-400 text-sm">
                <span className="inline-block bg-zinc-800 px-2 py-1 rounded mr-2">← →</span> Navigate
                <span className="inline-block bg-zinc-800 px-2 py-1 rounded mx-2">ESC</span> Close
              </p>
            </div>
          </div>
        )}

        {/* GALLERY INFO */}
        <div 
          ref={(el) => { sectionRefs.current[5] = el }}
          data-section-index="5"
          className={`mt-20 text-center transition-all duration-1000 ease-out transform ${
            visibleSections.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Behind the Scenes</h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Our gallery showcases the complete journey of sustainable agarwood cultivation. 
              From carefully managed plantations to expert processing techniques, every image tells a story of quality, sustainability, and Filipino agricultural excellence.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '25+', label: 'Gallery Images' },
                { value: '7', label: 'Categories' },
                { value: '100%', label: 'Sustainable' },
                { value: '24/7', label: 'Quality Focus' }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="text-center transition-all duration-500 hover:scale-110"
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    opacity: visibleSections.has(5) ? 1 : 0,
                    transform: visibleSections.has(5) ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="text-2xl font-bold text-green-500 mb-1">{item.value}</div>
                  <div className="text-zinc-400 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}