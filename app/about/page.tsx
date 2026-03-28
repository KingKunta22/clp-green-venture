'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { Award, Trophy, Star, Shield, ChevronDown, ChevronUp } from 'lucide-react'

export default function About() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [showAllAwards, setShowAllAwards] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [expandedAwardDesc, setExpandedAwardDesc] = useState<Set<number>>(new Set())

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

  const awards = [
    {
      id: 1,
      title: "Cleaning Solutions Provider of the Year",
      issuer: "Business Achievement & Recognition Awards Council",
      year: "2023",
      fullDescription: "Business Achievement & Recognition Awards 2023 is presented to CLP DIRECT SELLING (TALA) as Cleaning Solutions Provider of the Year METRO CEBU given this 23rd day of September 2023 at the Hallmark Ballroom A, Harolds Hotel by the Business Achievement and Recognition Awards Council for Excellence.",
      shortDescription: "Recognized as the top cleaning solutions provider in Metro Cebu for 2023.",
      icon: <Award className="w-8 h-8" />,
      image: "/images/awards/award1.png"
    },
    {
      id: 2,
      title: "Most Trusted Cleaning Solutions Provider",
      issuer: "Global Marketing Excellence Awards",
      year: "2025",
      fullDescription: "Grand Slam Awards 2025, CLP-DIRECT SELLING (TALA) Most Trusted Cleaning Solutions Provider Metro CEBU, Given this 14th day of February 2026 at Mezzo Hotel-Cebu, Cebu City by the Global Marketing Excellence Awards.",
      shortDescription: "Grand Slam winner for Most Trusted Cleaning Solutions Provider in Metro Cebu.",
      icon: <Trophy className="w-8 h-8" />,
      image: "/images/awards/award2.jpg"
    },
    {
      id: 3,
      title: "Most Trusted Korean Skincare Provider",
      issuer: "Global Management Excellence Awards",
      year: "2024",
      fullDescription: "Global Management Excellence Awards ANNUAL 2024, CLP-DIRECT SELLING MOST TRUSTED KOREAN SKINCARE PRODUCTS PROVIDER (M SECRET) METRO CEBU, Given this 26th day of October 2025 at Metro Hotel Cebu by the Global Management Excellence Awards.",
      shortDescription: "Awarded for excellence in providing authentic Korean skincare products.",
      icon: <Star className="w-8 h-8" />,
      image: "/images/awards/award3.png"
    },
    {
      id: 4,
      title: "Most Outstanding Young Entrepreneur",
      issuer: "Individual Awards 2025",
      year: "2025",
      fullDescription: "Individual Awards 2025, Most Outstanding Young Entrepreneur of the Year awarded to Charlie Patigue for exceptional leadership and business innovation.",
      shortDescription: "Charlie Patigue recognized as Most Outstanding Young Entrepreneur.",
      icon: <Shield className="w-8 h-8" />,
      image: "/images/awards/award4.png"
    },
    {
      id: 5,
      title: "Most Trusted Korean Skincare Provider",
      issuer: "Global Management Excellence Awards",
      year: "2025",
      fullDescription: "Global Management Excellence Awards 2025, Most Trusted Korean Skin Care Products Provider Awarded to CLP Direct Selling (MSECRET PRODUCT) for excellence in skincare distribution.",
      shortDescription: "Second consecutive win for MSECRET as Most Trusted Korean Skincare Provider.",
      icon: <Award className="w-8 h-8" />,
      image: "/images/awards/award5.png"
    }
  ]

  return (
    <section className="-mt-4 relative z-10 bg-[#060b05] rounded-t-[2rem] sm:rounded-t-[3rem] px-4 sm:px-6 py-12 sm:py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. ABOUT SECTION – Stacked on mobile, grid on desktop */}
        <div 
          ref={(el) => { sectionRefs.current[0] = el }}
          data-section-index="0"
          className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-24"
        >
          {/* Left content – our story */}
          <div className={`transition-all duration-1000 ease-out transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-green-500 font-mono tracking-widest uppercase text-xs sm:text-sm block mb-2">Our Story</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
              From Direct Selling <br className="hidden sm:block"/>to <span className="text-green-600">Sustainable Farming</span>
            </h2>
            
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-r from-green-900/20 to-transparent p-4 sm:p-6 rounded-xl border-l-4 border-green-500">
                <p className="text-white text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-green-400">CLP started as CLP Direct Selling</span> — a company focused on bringing quality products to Filipino families. Today, we've evolved into <span className="font-bold text-green-400">CLP Green Venture Inc.</span>, now focusing on agarwood cultivation while continuing our direct selling roots.
                </p>
              </div>
              
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed">
                Under the guidance of <span className="text-white font-semibold">Charlie Patigue</span>, we've grown from a direct selling foundation into a trusted authority in both the agarwood industry and consumer goods distribution.
              </p>
            </div>

            <div className="mt-6 sm:mt-8">
              <h3 className="text-green-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">What We Sell Today</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: 'M-SECRET', desc: 'Korean Skincare' },
                  { name: 'TALA', desc: 'Cleaning Solutions' },
                  { name: 'Rated Coffee', desc: 'Premium Coffee' },
                  { name: 'CLP Agarwood', desc: 'Agarwood Products' },
                  { name: 'Pet Food', desc: 'Dog Food' }
                ].map((product) => (
                  <div key={product.name} className="bg-zinc-800/50 border border-green-800/30 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    <span className="text-white font-bold">{product.name}</span>
                    <span className="text-zinc-500 ml-1 sm:ml-2">• {product.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right content – Charlie's photo */}
          <div className={`bg-zinc-900/50 border border-green-900/30 p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-1000 ease-out delay-200 transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-green-500 font-bold uppercase tracking-tighter text-xs mb-4">The man behind the business</h3>
            
            <div className="relative w-full h-[300px] sm:h-[400px] mx-auto overflow-hidden rounded-md">
              <Image
                src={'/images/sircharlie2.jpg'}
                alt={'Charlie Patigue'}
                fill
                className='object-cover object-top rounded-md transition-transform duration-700 hover:scale-105'
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
            
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-900/20 rounded-xl transition-all duration-500 hover:bg-green-900/30">
              <p className="text-white font-bold text-base sm:text-lg text-center mb-1 sm:mb-2">Charlie L. Patigue</p>
              <p className="text-green-400 text-xs sm:text-sm text-center mb-2 sm:mb-3">CEO, CLP GREEN VENTURE INC.</p>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                From direct selling to sustainable farming — Charlie built CLP into a trusted partner for growers, entrepreneurs, and families across the Philippines.
              </p>
            </div>
          </div>

          {/* Note – spans both columns on desktop, full width on mobile */}
          <div className="p-3 sm:p-4 bg-green-900/20 border border-green-800/30 rounded-lg col-span-full">
            <p className="text-[10px] sm:text-xs text-green-300 flex items-start gap-2">
              <span className="font-bold text-green-400">Note:</span>
              <span>You might see both "CLP Direct Selling" and "CLP Green Venture" on our awards. Same company! We're still selling all our products, just expanding into agarwood farming.</span>
            </p>
          </div>
        </div>

{/* 2. PARTNERSHIP BENEFITS – now always 3 columns, compact on mobile */}
<div 
  ref={(el) => { sectionRefs.current[1] = el }}
  data-section-index="1"
  className={`mb-16 md:mb-24 transition-all duration-1000 ease-out transform ${
    visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
  <div className="text-center mb-8 sm:mb-12">
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Why Partner With Us?</h3>
    <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto px-4">Simple, clear benefits for our partners and investors</p>
  </div>
  
  <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
    <div className="p-2 sm:p-4 md:p-6 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-300 hover:-translate-y-1">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
        <span className="text-green-500 font-bold text-sm sm:text-base md:text-xl">1</span>
      </div>
      <h4 className="text-white font-bold text-xs sm:text-sm md:text-xl mb-1 sm:mb-2 md:mb-3">Free Training</h4>
      <p className="text-zinc-400 text-[10px] sm:text-xs md:text-base leading-tight sm:leading-relaxed">
        Learn from <span className="text-green-400">Juvelyn Quirog</span> and our team. We teach you everything about agarwood — from planting to selling. Online or face-to-face.
      </p>
    </div>

    <div className="p-2 sm:p-4 md:p-6 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-300 hover:-translate-y-1">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
        <span className="text-green-500 font-bold text-sm sm:text-base md:text-xl">2</span>
      </div>
      <h4 className="text-white font-bold text-xs sm:text-sm md:text-xl mb-1 sm:mb-2 md:mb-3">Nationwide Support</h4>
      <p className="text-zinc-400 text-[10px] sm:text-xs md:text-base leading-tight sm:leading-relaxed">
        Branches in <span className="text-green-400">Cebu, Dumaguete, Negros, and Davao</span>. We're here to help across Visayas and Mindanao.
      </p>
    </div>

    <div className="p-2 sm:p-4 md:p-6 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-300 hover:-translate-y-1">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
        <span className="text-green-500 font-bold text-sm sm:text-base md:text-xl">3</span>
      </div>
      <h4 className="text-white font-bold text-xs sm:text-sm md:text-xl mb-1 sm:mb-2 md:mb-3">Direct Partnership</h4>
      <p className="text-zinc-400 text-[10px] sm:text-xs md:text-base leading-tight sm:leading-relaxed">
        Work directly with us — no middlemen. Visit our plantations anytime. We keep you updated on your investment.
      </p>
    </div>
  </div>

  {/* Quick Stats – keep as before */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12">
    {/* stats content unchanged */}
  </div>
</div>

        {/* 3. AWARDS – cards stack on mobile */}
        <div 
          ref={(el) => { sectionRefs.current[2] = el }}
          data-section-index="2"
          className={`mb-16 md:mb-24 transition-all duration-1000 ease-out transform ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">Our Achievements</h3>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto px-4">Recognition for our work in direct selling, skincare, and now agarwood</p>
          </div>

          {/* First 3 awards – grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 sm:mb-12">
            {awards.slice(0, 3).map((award) => {
              const isExpanded = expandedAwardDesc.has(award.id)
              return (
                <div
                  key={award.id}
                  className="bg-gradient-to-br from-green-900/20 to-zinc-900/30 border border-green-800/30 rounded-2xl overflow-hidden hover:border-green-600/30 transition-all duration-300 flex flex-col"
                >
                  <div className="relative w-full h-48 sm:h-56">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1">{award.title}</h4>
                    <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm mb-3">
                      <span className="text-green-400 truncate">{award.issuer}</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-400">{award.year}</span>
                    </div>
                    <div className="mb-3">
                      <p className={`text-zinc-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {award.fullDescription}
                      </p>
                      {award.fullDescription.length > 150 && (
                        <button
                          onClick={() => {
                            const newSet = new Set(expandedAwardDesc)
                            if (isExpanded) newSet.delete(award.id)
                            else newSet.add(award.id)
                            setExpandedAwardDesc(newSet)
                          }}
                          className="text-green-400 text-xs mt-1 hover:underline"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {awards.length > 3 && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAllAwards(!showAllAwards)}
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm sm:text-base"
              >
                {showAllAwards ? (
                  <>Show Less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>View All Awards ({awards.length - 3} more) <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}

          {showAllAwards && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="p-5 bg-zinc-900/30 border border-green-800/30 rounded-xl hover:border-green-600/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={award.image}
                        alt={award.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm leading-tight">{award.title}</h5>
                      <p className="text-xs text-zinc-500">{award.year}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">{award.shortDescription}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. CALL TO ACTION */}
        <div 
          ref={(el) => { sectionRefs.current[3] = el }}
          data-section-index="3"
          className={`bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 text-center transition-all duration-1000 ease-out transform ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Start?</h3>
          <p className="max-w-2xl mx-auto text-zinc-400 mb-6 sm:mb-8 text-base sm:text-lg">
            Whether you're interested in agarwood farming, our skincare products, or becoming a partner — we're here to help.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <button 
              onClick={() => {
                document.getElementById('seminars')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Join a Seminar
            </button>
            <a
              href="https://web.facebook.com/profile.php?id=61573163535908"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Message us on Facebook
            </a>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm mt-8 sm:mt-12">
            📍 City Suites Unit 09, F. Ramos St., Cebu City
          </p>
        </div>

        <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-zinc-600">
          <p>CLP Direct Selling or CLP Green Venture? Same company! We're just growing into agarwood while keeping our original products.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  )
}