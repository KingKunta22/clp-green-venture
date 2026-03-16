'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Leaf, DollarSign, Calendar, TrendingUp, Shield, Package, Users, CheckCircle, Zap, Clock, X, Facebook } from 'lucide-react'

export default function Products() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // State for product modal and expanded description
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [expandedDesc, setExpandedDesc] = useState<Set<number>>(new Set())

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

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const agarwoodSlides = [
    // ... unchanged ...
    {
      id: 1,
      title: "The Green Gold: Understanding Agarwood",
      subtitle: "Why it's called the most expensive wood in the world",
      content: "Agarwood, also known as 'Oud', is a fragrant dark resinous wood used in perfume, incense, and traditional medicine. It's produced when Aquilaria trees are infected by a specific type of mold.",
      highlight: "Value: ₱50,000 - ₱500,000 per kilogram",
      icon: <Leaf className="w-12 h-12" />,
      color: "from-green-600 to-emerald-700"
    },
    {
      id: 2,
      title: "Market Price & Investment Potential",
      subtitle: "Current Philippine Market Rates",
      content: "Grade AAA Agarwood resin can fetch ₱350,000-₱500,000/kg. Grade A sells for ₱150,000-₱300,000/kg. Even lower grades start at ₱50,000/kg. Prices increase 15-25% annually.",
      highlight: "Investment Return: 300-500% in 5-7 years",
      icon: <DollarSign className="w-12 h-12" />,
      color: "from-emerald-700 to-green-800"
    },
    {
      id: 3,
      title: "Growth Timeline & Harvesting",
      subtitle: "From planting to profit",
      content: "Trees mature in 5-7 years. Inoculation at year 3-4. First harvest at year 5-6. Sustainable harvesting allows trees to continue producing for 15-20 years.",
      highlight: "First Harvest: Year 5-6 | Peak Production: Year 8-12",
      icon: <Calendar className="w-12 h-12" />,
      color: "from-green-800 to-emerald-900"
    },
    {
      id: 4,
      title: "Inoculation Process",
      subtitle: "The science behind resin production",
      content: "We use advanced fungal inoculation techniques that stimulate resin production without harming the tree. Our success rate is 92%, compared to industry average of 65-70%.",
      highlight: "Success Rate: 92% | Industry Average: 65-70%",
      icon: <Zap className="w-12 h-12" />,
      color: "from-emerald-900 to-green-900"
    },
    {
      id: 5,
      title: "Maintenance & Care",
      subtitle: "Keeping your investment healthy",
      content: "Regular monitoring, proper spacing (3m x 3m), organic fertilization every 6 months, pest management, and seasonal adjustments ensure optimal growth.",
      highlight: "Annual Maintenance Cost: ₱5,000-₱8,000 per hectare",
      icon: <Shield className="w-12 h-12" />,
      color: "from-green-900 to-emerald-800"
    },
    {
      id: 6,
      title: "Quality Standards & Grading",
      subtitle: "How we ensure premium quality",
      content: "We follow international grading standards (ASEAN Standard for Agarwood). Our products are tested for resin content, fragrance profile, and purity.",
      highlight: "Grade AAA Resin Content: 60-80% | Industry Standard: 40-60%",
      icon: <CheckCircle className="w-12 h-12" />,
      color: "from-emerald-800 to-green-700"
    },
    {
      id: 7,
      title: "Market Connections & Sales",
      subtitle: "From farm to global market",
      content: "We connect growers with international buyers in Middle East, Japan, and Europe. Handle export documentation, quality certification, and secure payments.",
      highlight: "Export Countries: UAE, Saudi, Japan, Singapore, France",
      icon: <TrendingUp className="w-12 h-12" />,
      color: "from-green-700 to-emerald-600"
    },
    {
      id: 8,
      title: "Start Your Agarwood Journey",
      subtitle: "Minimum investment requirements",
      content: "Start with as little as 10 trees. We provide complete package: seedlings, land preparation guidance, inoculation services, maintenance training, and buy-back guarantee.",
      highlight: "Minimum: 10 trees | Recommended: 100 trees for commercial scale",
      icon: <Users className="w-12 h-12" />,
      color: "from-emerald-600 to-green-600"
    }
  ]

  // Other products with image paths
  const otherProducts = [
    {
      id: 1,
      name: "M-SECRET Korean Skincare",
      description: "Authentic Korean skincare products trusted by thousands. Whitening, anti-aging, and acne solutions.",
      longDescription: "M-SECRET brings you the best of Korean skincare technology. Our products are dermatologically tested, cruelty-free, and formulated to deliver visible results in just 7 days. Choose from a range of serums, creams, and masks tailored to your skin type.",
      price: "From ₱199",
      features: ["Dermatologically tested", "Cruelty-free", "Visible results in 7 days"],
      image: "/images/products/msecret.png"
    },
    {
      id: 2,
      name: "TALA Cleaning Solutions",
      description: "Eco-friendly and powerful cleaning products for home and industrial use.",
      longDescription: "TALA offers a complete line of biodegradable cleaning solutions that are tough on dirt but gentle on the planet. Our concentrated formulas mean you use less, save more, and reduce plastic waste. Safe for kids and pets.",
      price: "From ₱99",
      features: ["Biodegradable formula", "Concentrated", "Safe for kids and pets"],
      image: "/images/products/tala.jpg"
    },
    {
      id: 3,
      name: "Rated Coffee",
      description: "Premium coffee blends for the perfect brew. Sustainably sourced and locally roasted.",
      longDescription: "Rated Coffee is crafted for coffee lovers who appreciate quality. We source 100% Arabica beans from sustainable farms and roast them locally to ensure freshness. Available in grounds or whole beans, with a rich aroma and smooth finish.",
      price: "From ₱250 per pack",
      features: ["100% Arabica beans", "Rich aroma", "Available in grounds or beans"],
      image: "/images/products/ratedcoffee.png"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % agarwoodSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + agarwoodSlides.length) % agarwoodSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleDescription = (productId: number) => {
    const newSet = new Set(expandedDesc)
    if (newSet.has(productId)) {
      newSet.delete(productId)
    } else {
      newSet.add(productId)
    }
    setExpandedDesc(newSet)
  }

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setShowProductModal(true)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
  }

  const closeProductModal = () => {
    setShowProductModal(false)
    setSelectedProduct(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <section id="products" className="relative z-10 bg-[#060b05] px-6 py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div 
          ref={(el) => { sectionRefs.current[0] = el }}
          data-section-index="0"
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-green-500 font-mono tracking-widest uppercase text-sm block mb-4">Premium Products</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Discover <span className="text-green-600">Agarwood</span> Wealth
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Learn everything about the world's most valuable wood and how you can profit from sustainable cultivation
          </p>
        </div>

        {/* AGARWOOD EDUCATION CAROUSEL */}
        <div 
          ref={(el) => { sectionRefs.current[1] = el }}
          data-section-index="1"
          className={`mb-24 transition-all duration-1000 ease-out transform ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative">
            {/* PROGRESS BAR */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-400 text-sm font-medium">Slide {currentSlide + 1} of {agarwoodSlides.length}</span>
                <span className="text-zinc-500 text-sm">Interactive Guide</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-600 to-emerald-500 transition-all duration-500"
                  style={{ width: `${((currentSlide + 1) / agarwoodSlides.length) * 100}%` }}
                />
              </div>
            </div>

            {/* MAIN CAROUSEL */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative h-[500px]">
                {agarwoodSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 translate-x-0'
                        : index < currentSlide
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <div className={`h-full bg-gradient-to-br ${slide.color} p-8 md:p-12 rounded-3xl transition-all duration-500 hover:shadow-xl`}>
                      <div className="flex flex-col lg:flex-row items-center h-full gap-8">
                        {/* ICON SECTION */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-500 hover:bg-white/20 hover:scale-110">
                            <div className="text-white transition-transform duration-500 hover:scale-110">
                              {slide.icon}
                            </div>
                          </div>
                        </div>

                        {/* CONTENT SECTION */}
                        <div className="flex-grow">
                          <div className="mb-4">
                            <span className="text-white/80 text-sm font-medium">{slide.subtitle}</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{slide.title}</h2>
                          </div>
                          
                          <p className="text-white/90 text-lg mb-6 leading-relaxed transition-all duration-300">{slide.content}</p>
                          
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 hover:bg-white/15 hover:border-white/30">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30">
                                <Clock className="w-4 h-4 text-white transition-transform duration-300 hover:scale-110" />
                              </div>
                              <div>
                                <p className="text-white font-bold text-lg transition-colors duration-300">{slide.highlight}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NAVIGATION CONTROLS */}
            <div className="flex items-center justify-center mt-8 gap-6">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-green-900/30 border border-green-800/30 hover:bg-green-800/40 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-green-400 transition-transform duration-300" />
              </button>
              
              {/* SLIDE INDICATORS */}
              <div className="flex gap-2">
                {agarwoodSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentSlide 
                        ? 'bg-green-500 w-8' 
                        : 'bg-zinc-700 hover:bg-zinc-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-green-900/30 border border-green-800/30 hover:bg-green-800/40 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-green-400 transition-transform duration-300" />
              </button>
            </div>

            {/* QUICK TIP */}
            <div className="text-center mt-6">
              <p className="text-zinc-500 text-sm transition-opacity duration-300">
                Each tree can produce 1-3kg of resin worth ₱50,000-₱500,000
              </p>
            </div>
          </div>
        </div>

        {/* OTHER PRODUCTS */}
        <div 
          ref={(el) => { sectionRefs.current[2] = el }}
          data-section-index="2"
          className={`mb-8 transition-all duration-1000 ease-out transform ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Other Available Products</h3>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">From our direct selling family – trusted brands you'll love</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {otherProducts.map((product) => {
              const isExpanded = expandedDesc.has(product.id)
              return (
                <div 
                  key={product.id}
                  className="bg-zinc-900/30 border border-green-800/20 rounded-2xl overflow-hidden hover:border-green-600/30 transition-all duration-500 hover:-translate-y-1 group flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-80 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-green-400">
                      {product.name}
                    </h4>
                    
                    {/* Description with toggle */}
                    <div className="mb-3">
                      <p className={`text-zinc-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {isExpanded ? product.longDescription : product.description}
                      </p>
                      {(product.longDescription || product.description.length > 100) && (
                        <button
                          onClick={() => toggleDescription(product.id)}
                          className="text-green-400 text-xs mt-1 hover:underline"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span className="text-white text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto border-t border-green-800/30 pt-4">
                      <p className="text-green-400 font-bold text-lg mb-3">{product.price}</p>
                      <button
                        onClick={() => openProductModal(product)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        Inquire Now
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* PRODUCT INQUIRY MODAL */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeProductModal} />
          
          <div className="relative bg-[#0f130e] border border-green-800/30 rounded-2xl shadow-2xl w-full max-w-4xl animate-fade-in overflow-hidden">
            

            {/* Modal Body - Two columns */}
            <div className="grid grid-cols-2 gap-6 p-6">
              {/* Left column - Image */}
              <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right column - Details */}
              <div className="flex flex-col">
                
                {/* Modal Header */}
                <div className="py-4 border-b border-green-800/30 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{selectedProduct.name}</h3>
                  <button onClick={closeProductModal} className="p-1.5 hover:bg-zinc-800 rounded-full transition-colors">
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>

                <p className="text-zinc-300 text-sm mb-3">{selectedProduct.longDescription || selectedProduct.description}</p>
                <p className="text-green-400 font-bold text-lg mb-4">{selectedProduct.price}</p>

                {/* Features list */}
                <div className="space-y-2 mb-4">
                  {selectedProduct.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer - Facebook Button full width */}
            <div className="border-t border-green-800/30 p-4">
              <a
                href="https://web.facebook.com/profile.php?id=61573163535908"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
                Message us on Facebook to Order
              </a>
              <p className="text-xs text-zinc-500 text-center mt-2">
                Clicking the button will open Facebook Messenger
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  )
}