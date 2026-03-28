'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Maximize2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { getGalleryImages } from '@/app/admin/dashboard/gallery/actions';

// Import Swiper and its styles (only for mobile carousel)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface GalleryImage {
  id: string;
  url: string;
  tag: string;
  alt: string | null;
}

// Static fallback images (keep them as they are)
const staticGalleryImages = [
  // Milestones
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `static-${i + 1}`,
    src: `/images/gallery/milestones/milestone${i + 1}.jpg`,
    alt: `Company Milestone ${i + 1}`,
    tag: 'Milestones',
  })),
  // Community (7 images)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `static-${i + 3}`,
    src: `/images/gallery/community/community${i + 1}.jpg`,
    alt: `Community Activity ${i + 1}`,
    tag: 'Community',
  })),
  // Plantation (10 images)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `static-${i + 10}`,
    src: `/images/gallery/plantation/plantation${i + 1}.jpg`,
    alt: `Plantation View ${i + 1}`,
    tag: 'Plantation',
  })),
  // Products (1 image)
  {
    id: 'static-20',
    src: '/images/gallery/products/product1.jpg',
    alt: 'Agarwood Product Display',
    tag: 'Products',
  },
  // Registered Agents (25 images)
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `static-${i + 21}`,
    src: `/images/gallery/registered-agents/RA${i + 1}.jpg`,
    alt: `Registered Agent ${i + 1}`,
    tag: 'Registered Agents',
  })),
  // Seminars (13 images)
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `static-${i + 46}`,
    src: `/images/gallery/seminars/seminar${i + 1}.jpg`,
    alt: `Seminar Session ${i + 1}`,
    tag: 'Seminars',
  })),
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [activeTag, setActiveTag] = useState('All');
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch images from database
  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await getGalleryImages();
        setDbImages(images);
      } catch (error) {
        console.error('Failed to load gallery images:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  // Detect mobile viewport (breakpoint at 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Merge static and database images, with DB images first
  const dbImagesMapped = dbImages.map(img => ({
    id: img.id,
    src: img.url,
    alt: img.alt || img.tag,
    tag: img.tag,
  }));

  // Combine: DB images first, then static
  const allGalleryImages = [...dbImagesMapped, ...staticGalleryImages];

  // Deduplicate by src (optional)
  const uniqueImages = Array.from(new Map(allGalleryImages.map(img => [img.src, img])).values());

  const tags = ['All', ...Array.from(new Set(uniqueImages.map(img => img.tag))).sort()];

  const filteredImages = activeTag === 'All'
    ? uniqueImages
    : uniqueImages.filter(img => img.tag === activeTag);
  const displayedImages = showAllImages ? filteredImages : filteredImages.slice(0, 15);

  // Simple intersection observer for fade‑in (optional, but keep the grid always visible)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    sectionRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  // Hide navbar when fullscreen
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = isFullscreen ? 'none' : 'flex';
    }
  }, [isFullscreen]);

  const handleImageClick = (id: string) => {
    setSelectedImage(id);
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setTimeout(() => {
      setSelectedImage(null);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    const currentIndex = displayedImages.findIndex(img => img.id === selectedImage);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % displayedImages.length;
      setSelectedImage(displayedImages[nextIndex].id);
    } else {
      const prevIndex = (currentIndex - 1 + displayedImages.length) % displayedImages.length;
      setSelectedImage(displayedImages[prevIndex].id);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, selectedImage, displayedImages]);

  if (loading) {
    return (
      <section className="bg-[#060b05] min-h-screen flex items-center justify-center">
        <div className="text-white">Loading gallery...</div>
      </section>
    );
  }

  return (
    <section id="gallery" className="relative z-10 bg-[#060b05] px-4 sm:px-6 py-12 sm:py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER - responsive text */}
        <div 
          ref={(el) => { sectionRefs.current[0] = el }}
          className="text-center mb-12 sm:mb-16 transition-all duration-1000 opacity-100 translate-y-0"
        >
          <span className="text-green-500 font-mono tracking-widest uppercase text-xs sm:text-sm block mb-2 sm:mb-4">Visual Journey</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">
            Our <span className="text-green-600">Agarwood</span> Gallery
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            Explore our journey through sustainable agarwood cultivation, from plantation to premium products
          </p>
        </div>

        {/* TAG FILTERS - responsive */}
        <div 
          ref={(el) => { sectionRefs.current[1] = el }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 transition-all duration-1000 opacity-100 translate-y-0"
        >
          {tags.map((tag, index) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setShowAllImages(false);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTag === tag
                  ? 'bg-green-600 text-white scale-105'
                  : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* GALLERY: on mobile, carousel; on desktop, masonry grid */}
        {isMobile ? (
          // Mobile carousel
          <div className="relative w-full max-w-full mx-auto pb-12">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides
              loop={filteredImages.length > 1}
              className="w-full"
            >
              {filteredImages.map((image) => (
                <SwiperSlide key={image.id}>
                  <div 
                    className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-900/30 border border-green-800/20 group"
                    onClick={() => handleImageClick(image.id)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium text-sm sm:text-base">{image.alt}</p>
                        <p className="text-green-400 text-xs sm:text-sm mt-1">{image.tag}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          // Desktop masonry grid (unchanged)
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {displayedImages.map((image, index) => (
              <div 
                key={image.id}
                className="relative break-inside-avoid group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                onClick={() => handleImageClick(image.id)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-zinc-900/30 border border-green-800/20 transition-all duration-500 group-hover:border-green-600/30">
                  <div className="relative h-64 w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium">{image.alt}</p>
                        <p className="text-green-400 text-sm mt-1">{image.tag}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MORE / VIEW LESS BUTTON (only shown on desktop; mobile already loops all) */}
        {!isMobile && filteredImages.length > 15 && (
          <div className="text-center my-8">
            <button
              onClick={() => setShowAllImages(!showAllImages)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/20 hover:shadow-green-900/40 text-sm sm:text-base"
            >
              {showAllImages ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  View All Images ({filteredImages.length - 15} more)
                </>
              )}
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-zinc-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Images Found</h3>
            <p className="text-zinc-400">Try selecting a different tag</p>
          </div>
        )}

        {/* IMAGE COUNT */}
        <div className="text-center mt-8">
          <p className="text-zinc-500 text-xs sm:text-sm">
            Showing {displayedImages.length} of {filteredImages.length} images • {uniqueImages.length} total images in gallery • Click to enlarge
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
            {tags.filter(t => t !== 'All').map((tag, index) => {
              const colors = ['bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-700'];
              return (
                <div key={tag} className="text-[10px] sm:text-xs text-zinc-600">
                  <span className={`inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full ${colors[index % colors.length]} mr-1`}></span> {tag}
                </div>
              );
            })}
          </div>
        </div>

        {/* FULLSCREEN VIEWER (unchanged, works with both views) */}
        {selectedImage !== null && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-500 ${
            isFullscreen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button
              onClick={closeFullscreen}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
              {displayedImages.map((image) => (
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{image.alt}</h3>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-4">
                          <p className="text-green-400">{image.tag}</p>
                          <span className="text-zinc-500">•</span>
                          <p className="text-zinc-400 text-sm">Gallery #{image.id}</p>
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

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-zinc-400 text-xs sm:text-sm">
                <span className="inline-block bg-zinc-800 px-2 py-1 rounded mr-2">← →</span> Navigate
                <span className="inline-block bg-zinc-800 px-2 py-1 rounded mx-2">ESC</span> Close
              </p>
            </div>
          </div>
        )}

        {/* GALLERY INFO (responsive) */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Behind the Scenes</h3>
            <p className="text-zinc-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              Our gallery showcases the complete journey of sustainable agarwood cultivation. 
              From carefully managed plantations to expert processing techniques, every image tells a story of quality, sustainability, and Filipino agricultural excellence.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: '25+', label: 'Gallery Images' },
                { value: '7', label: 'Categories' },
                { value: '100%', label: 'Sustainable' },
                { value: '24/7', label: 'Quality Focus' }
              ].map((item, index) => (
                <div key={index} className="text-center transition-all duration-500 hover:scale-110">
                  <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">{item.value}</div>
                  <div className="text-zinc-400 text-xs sm:text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}