'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Leaf, DollarSign, Calendar, TrendingUp, Shield, Package, Users, CheckCircle, Zap, Clock, X, Facebook } from 'lucide-react'

export default function Products() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [expandedDesc, setExpandedDesc] = useState<Set<number>>(new Set())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-section-index') || '0')
          setVisibleSections(prev => new Set(prev).add(index))
        }
      })
    }, observerOptions)
    sectionRefs.current.forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  const agarwoodSlides = [
    { id: 1, title: "The Green Gold: Understanding Agarwood", subtitle: "Why it's called the most expensive wood in the world", content: "Agarwood, also known as 'Oud', is a fragrant dark resinous wood used in perfume, incense, and traditional medicine. It's produced when Aquilaria trees are infected by a specific type of mold.", highlight: "Value: ₱50,000 - ₱500,000 per kilogram", icon: <Leaf className="w-12 h-12" />, color: "from-green-600 to-emerald-700" },
    { id: 2, title: "Market Price & Investment Potential", subtitle: "Current Philippine Market Rates", content: "Grade AAA Agarwood resin can fetch ₱350,000-₱500,000/kg. Grade A sells for ₱150,000-₱300,000/kg. Even lower grades start at ₱50,000/kg. Prices increase 15-25% annually.", highlight: "Investment Return: 300-500% in 5-7 years", icon: <DollarSign className="w-12 h-12" />, color: "from-emerald-700 to-green-800" },
    { id: 3, title: "Growth Timeline & Harvesting", subtitle: "From planting to profit", content: "Trees mature in 5-7 years. Inoculation at year 3-4. First harvest at year 5-6. Sustainable harvesting allows trees to continue producing for 15-20 years.", highlight: "First Harvest: Year 5-6 | Peak Production: Year 8-12", icon: <Calendar className="w-12 h-12" />, color: "from-green-800 to-emerald-900" },
    { id: 4, title: "Inoculation Process", subtitle: "The science behind resin production", content: "We use advanced fungal inoculation techniques that stimulate resin production without harming the tree. Our success rate is 92%, compared to industry average of 65-70%.", highlight: "Success Rate: 92% | Industry Average: 65-70%", icon: <Zap className="w-12 h-12" />, color: "from-emerald-900 to-green-900" },
    { id: 5, title: "Maintenance & Care", subtitle: "Keeping your investment healthy", content: "Regular monitoring, proper spacing (3m x 3m), organic fertilization every 6 months, pest management, and seasonal adjustments ensure optimal growth.", highlight: "Annual Maintenance Cost: ₱5,000-₱8,000 per hectare", icon: <Shield className="w-12 h-12" />, color: "from-green-900 to-emerald-800" },
    { id: 6, title: "Quality Standards & Grading", subtitle: "How we ensure premium quality", content: "We follow international grading standards (ASEAN Standard for Agarwood). Our products are tested for resin content, fragrance profile, and purity.", highlight: "Grade AAA Resin Content: 60-80% | Industry Standard: 40-60%", icon: <CheckCircle className="w-12 h-12" />, color: "from-emerald-800 to-green-700" },
    { id: 7, title: "Market Connections & Sales", subtitle: "From farm to global market", content: "We connect growers with international buyers in Middle East, Japan, and Europe. Handle export documentation, quality certification, and secure payments.", highlight: "Export Countries: UAE, Saudi, Japan, Singapore, France", icon: <TrendingUp className="w-12 h-12" />, color: "from-green-700 to-emerald-600" },
    { id: 8, title: "Start Your Agarwood Journey", subtitle: "Minimum investment requirements", content: "Start with as little as 10 trees. We provide complete package: seedlings, land preparation guidance, inoculation services, maintenance training, and buy-back guarantee.", highlight: "Minimum: 10 trees | Recommended: 100 trees for commercial scale", icon: <Users className="w-12 h-12" />, color: "from-emerald-600 to-green-600" }
  ]

  const otherProducts = [
    {
      id: 1,
      name: "M-SECRET Korean Skincare",
      description: "Authentic Korean skincare products trusted by thousands.",
      longDescription: "M-SECRET brings you the best of Korean skincare technology. Our products are dermatologically tested, cruelty-free, and formulated to deliver visible results in just 7 days.",
      price: "From ₱199",
      features: ["Dermatologically tested", "Cruelty-free", "Visible results in 7 days", "Korean technology", "Safe for all skin types"],
      image: "/images/products/msecret.png",
    },
    {
      id: 2,
      name: "TALA Cleaning Solutions",
      description: "Powerful deep cleaning solution that works on multiple surfaces. Become a reseller for only ₱500!",
      longDescription: "TALA Toilet Fix is a deep cleaning solution that softens dirt and works on toilet bowls, sinks, tiles, faucets, stainless steel, kitchen sinks, walls, and even outdoor areas. It’s trending and mabenta! Now you can become a reseller with just ₱500 minimum order. Dealership, wholesale, and distributor packages available.",
      price: "₱255 / liter (COD, DF Apply)",
      priceTiers: [
        "Reseller: 2 bottles min order",
        "Distributor: 1 box (12 bottles) min",
        "Wholesaler: 30 boxes min"
      ],
      features: [
        "🧼 Deep cleaning – softens dirt automatically",
        "🪣 Works on: toilet bowl, sink, floor tiles, walls, faucet, kitchen sink, living room tiles, outdoor tiles, lobby",
        "🔥 Used by everyone – mabenta at trending",
        "💰 COD available, DF apply",
        "🛍️ Reseller package: ₱500 minimum",
        "📦 Distributor & wholesaler packages available"
      ],
      images: [
        "/images/products/tala.jpg",
        "/images/products/tala2.jpg",
        "/images/products/tala3.jpg"
      ],
    },
    {
      id: 3,
      name: "RATED COFFEE",
      description: "Premium coffee with natural stamina boost. 10 sachets per box, free shipping nationwide.",
      longDescription: "RATED COFFEE is specially formulated for men and women who want an energy boost and wellness benefits. It combines Robusta coffee with natural ingredients like Maca Root, L-Arginine, Tongkat Ali, and Korean Ginseng to support stamina, focus, and overall vitality. Each box contains 10 sachets. With FREE SHIPPING and COD available nationwide.",
      price: "₱550 / box (10 sachets)",
      priceTiers: [
        "2 boxes: ₱980",
        "3 boxes: ₱1,285",
        "4 boxes: ₱1,680",
        "5 boxes: ₱2,050",
        "8 boxes: ₱2,700",
        "10 boxes: ₱3,500"
      ],
      features: [
        "☕ 10 sachets per box",
        "💵 Cash on Delivery (COD) available",
        "🌱 All-natural ingredients",
        "❌ No harmful chemicals",
        "⚡ Boosts stamina, energy, and focus",
        "❤️ Safe for both men and women"
      ],
      image: "/images/products/ratedcoffee.png",
    }
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % agarwoodSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + agarwoodSlides.length) % agarwoodSlides.length)
  const goToSlide = (index: number) => setCurrentSlide(index)

  const toggleDescription = (productId: number) => {
    const newSet = new Set(expandedDesc)
    newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId)
    setExpandedDesc(newSet)
  }

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setShowProductModal(true)
    document.body.style.overflow = 'hidden'
  }

  const closeProductModal = () => {
    setShowProductModal(false)
    setSelectedProduct(null)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    if (!selectedProduct) return
    const images = selectedProduct.images || (selectedProduct.image ? [selectedProduct.image] : [])
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (!selectedProduct) return
    const images = selectedProduct.images || (selectedProduct.image ? [selectedProduct.image] : [])
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section id="products" className="relative z-10 bg-[#060b05] px-4 sm:px-6 py-12 sm:py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={(el) => { sectionRefs.current[0] = el }} data-section-index="0" className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out transform ${visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-green-500 font-mono tracking-widest uppercase text-xs sm:text-sm block mb-3 sm:mb-4">Premium Products</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">Discover <span className="text-green-600">Agarwood</span> Wealth</h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">Learn everything about the world's most valuable wood and how you can profit from sustainable cultivation</p>
        </div>

        {/* Agarwood Carousel - responsive height */}
        <div ref={(el) => { sectionRefs.current[1] = el }} data-section-index="1" className={`mb-16 sm:mb-24 transition-all duration-1000 ease-out transform ${visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-400 text-xs sm:text-sm font-medium">Slide {currentSlide + 1} of {agarwoodSlides.length}</span>
                <span className="text-zinc-500 text-xs sm:text-sm">Interactive Guide</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-600 to-emerald-500 transition-all duration-500" style={{ width: `${((currentSlide + 1) / agarwoodSlides.length) * 100}%` }} />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="relative h-[400px] sm:h-[500px]">
                {agarwoodSlides.map((slide, index) => (
                  <div key={slide.id} className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 translate-x-0' : index < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'}`}>
                    <div className={`h-full bg-gradient-to-br ${slide.color} p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:shadow-xl`}>
                      <div className="flex flex-col lg:flex-row items-center h-full gap-4 sm:gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-500 hover:bg-white/20 hover:scale-110">
                            <div className="text-white transition-transform duration-500 hover:scale-110">{slide.icon}</div>
                          </div>
                        </div>
                        <div className="flex-grow text-center lg:text-left">
                          <div className="mb-3 sm:mb-4">
                            <span className="text-white/80 text-xs sm:text-sm font-medium">{slide.subtitle}</span>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2 mb-2 sm:mb-4">{slide.title}</h2>
                          </div>
                          <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">{slide.content}</p>
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center"><Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" /></div>
                              <div><p className="text-white font-bold text-sm sm:text-base lg:text-lg">{slide.highlight}</p></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center mt-6 sm:mt-8 gap-4 sm:gap-6">
              <button onClick={prevSlide} className="p-2 sm:p-3 rounded-full bg-green-900/30 border border-green-800/30 hover:bg-green-800/40 transition-all hover:scale-110 active:scale-95"><ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" /></button>
              <div className="flex gap-1.5 sm:gap-2">
                {agarwoodSlides.map((_, index) => (
                  <button key={index} onClick={() => goToSlide(index)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all hover:scale-125 ${index === currentSlide ? 'bg-green-500 w-4 sm:w-8' : 'bg-zinc-700 hover:bg-zinc-600'}`} />
                ))}
              </div>
              <button onClick={nextSlide} className="p-2 sm:p-3 rounded-full bg-green-900/30 border border-green-800/30 hover:bg-green-800/40 transition-all hover:scale-110 active:scale-95"><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" /></button>
            </div>
            <div className="text-center mt-4 sm:mt-6"><p className="text-zinc-500 text-xs sm:text-sm">Each tree can produce 1-3kg of resin worth ₱50,000-₱500,000</p></div>
          </div>
        </div>

        {/* Other Products */}
        <div ref={(el) => { sectionRefs.current[2] = el }} data-section-index="2" className={`mb-8 transition-all duration-1000 ease-out transform ${visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Other Available Products</h3>
            <p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto px-4">From our direct selling family – trusted brands you'll love</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {otherProducts.map((product) => {
              const isExpanded = expandedDesc.has(product.id)
              const displayedFeatures = product.features.slice(0, 3)
              const hasMoreFeatures = product.features.length > 3
              return (
                <div key={product.id} className="bg-zinc-900/30 border border-green-800/20 rounded-2xl overflow-hidden hover:border-green-600/30 transition-all duration-500 hover:-translate-y-1 group flex flex-col">
                  <div className="relative w-full h-64 sm:h-80 overflow-hidden">
                    <Image src={product.image || (product.images && product.images[0]) || ""} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-green-400">{product.name}</h4>
                    <div className="mb-3">
                      <p className={`text-zinc-400 text-xs sm:text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {isExpanded ? product.longDescription : product.description}
                      </p>
                      {(product.longDescription || product.description.length > 100) && (
                        <button onClick={() => toggleDescription(product.id)} className="text-green-400 text-xs mt-1 hover:underline">{isExpanded ? 'Show less' : 'Read more'}</button>
                      )}
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 mb-4">
                      {displayedFeatures.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                          <span className="text-white text-xs">{feature}</span>
                        </div>
                      ))}
                      {hasMoreFeatures && <div className="text-xs text-green-400">+{product.features.length - 3} more</div>}
                    </div>
                    <div className="mt-auto border-t border-green-800/30 pt-3 sm:pt-4">
                      <p className="text-green-400 font-bold text-base sm:text-lg mb-2 sm:mb-3">{product.price}</p>
                      <button onClick={() => openProductModal(product)} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 sm:py-2.5 rounded-lg transition-all duration-300 text-sm sm:text-base">Inquire Now</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

{/* Modal - fully responsive, compact on mobile */}
{showProductModal && selectedProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeProductModal} />
    <div className="relative bg-[#0f130e] border border-green-800/40 rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-4xl md:max-w-6xl mx-auto overflow-hidden max-h-[90vh] overflow-y-auto">
      <button
        onClick={closeProductModal}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1 hover:bg-zinc-800/60 rounded-full transition-colors"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 hover:text-white" />
      </button>

      <div className="flex flex-col md:grid md:grid-cols-[1fr,1.5fr] gap-0">
        {/* Left: Image carousel */}
        <div className="relative bg-zinc-800/50">
          {(() => {
            const images = selectedProduct.images || (selectedProduct.image ? [selectedProduct.image] : [])
            if (!images.length) return null
            return (
              <>
                <div className="relative w-full h-48 sm:h-64 md:h-full" style={{ minHeight: '180px' }}>
                  <Image
                    src={images[currentImageIndex]}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 px-2 py-1 rounded-full">
                      {images.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            idx === currentImageIndex ? 'bg-green-500 w-2.5' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )
          })()}
        </div>

        {/* Right: Content – compact spacing */}
        <div className="p-3 sm:p-5 md:p-6 flex flex-col space-y-2 sm:space-y-4">
          <div>
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-white mb-1">{selectedProduct.name}</h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{selectedProduct.longDescription || selectedProduct.description}</p>
          </div>

          {/* Price and tiers */}
          <div>
            <p className="text-green-400 font-bold text-sm sm:text-lg md:text-2xl">{selectedProduct.price}</p>
            {selectedProduct.priceTiers && (
              <div className="mt-1 sm:mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 text-[10px] sm:text-xs text-gray-300 bg-zinc-800/40 p-1.5 sm:p-2 rounded-lg">
                {selectedProduct.priceTiers.map((tier: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full" />
                    {tier}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-[9px] sm:text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Key Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] sm:text-xs text-gray-300">
              {selectedProduct.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-1">
                  <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[9px] sm:text-xs leading-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facebook Button */}
          <div className="pt-1 sm:pt-2">
            <a
              href="https://web.facebook.com/profile.php?id=61573163535908"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-300 text-[10px] sm:text-sm"
            >
              <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
              Message us on Facebook to Order
            </a>
          </div>
        </div>
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