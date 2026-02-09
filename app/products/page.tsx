'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Leaf, DollarSign, Calendar, TrendingUp, Shield, Package, Users, CheckCircle, Zap, Clock } from 'lucide-react'

export default function Products() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

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

  const otherProducts = [
    {
      id: 1,
      name: "Premium Agarwood Seedlings",
      description: "Certified disease-free seedlings with 98% survival rate",
      price: "₱350-₱500 per seedling",
      features: ["6-12 months old", "Guaranteed purity", "Planting guide included"]
    },
    {
      id: 2,
      name: "Inoculation Starter Kit",
      description: "Complete kit for home cultivators (10-50 trees)",
      price: "₱8,000-₱35,000",
      features: ["Fungal culture", "Tools", "Step-by-step video guide"]
    },
    {
      id: 3,
      name: "Agarwood Oil (Pure)",
      description: "100% pure agarwood oil for aromatherapy",
      price: "₱15,000 per 5ml",
      features: ["Therapeutic grade", "ISO certified", "Money-back guarantee"]
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
          className={`mb-24 transition-all duration-1000 ease-out transform ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Other Available Products</h3>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Everything you need for successful agarwood cultivation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {otherProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-zinc-900/30 border border-green-800/20 rounded-2xl p-6 hover:border-green-600/30 transition-all duration-500 hover:translate-y-[-5px] group hover:shadow-xl"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 hover:bg-green-900/40 hover:scale-110">
                    <Package className="w-6 h-6 text-green-500 transition-transform duration-300 hover:scale-110" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-green-400">{product.name}</h4>
                  <p className="text-zinc-400 text-sm transition-opacity duration-300 group-hover:text-zinc-300">{product.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-900/30 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-900/40">
                        <div className="w-2 h-2 bg-green-500 rounded-full transition-transform duration-300 hover:scale-125" />
                      </div>
                      <span className="text-white text-sm transition-colors duration-300 group-hover:text-green-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-green-800/30 pt-4 transition-all duration-300 group-hover:border-green-600/30">
                  <p className="text-green-400 font-bold text-lg mb-4 transition-transform duration-300 group-hover:scale-105">{product.price}</p>
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-900/20 hover:shadow-green-900/40">
                    Inquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div 
          ref={(el) => { sectionRefs.current[3] = el }}
          data-section-index="3"
          className={`bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[3rem] p-8 md:p-12 text-center transition-all duration-1000 ease-out transform ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl font-bold mb-6">Ready to Invest in Agarwood?</h3>
          <p className="max-w-2xl mx-auto text-zinc-400 mb-8 text-lg leading-relaxed">
            Start with as little as 10 trees. Get complete guidance from seedling to harvest. 
            Join our community of successful agarwood farmers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/20 hover:shadow-green-900/40 active:scale-95"
            >
              Get Free Consultation
            </a>
            <a
              href="https://zoom.us/j/your-zoom-id-here"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 border border-green-800/30 hover:border-green-600/50 active:scale-95"
            >
              Join Product Demo via Zoom
            </a>
          </div>
          <p className="text-zinc-500 text-sm mt-8">
            Free 30-minute consultation available • Zoom demos every Thursday 2PM
          </p>
        </div>

      </div>
    </section>
  )
}