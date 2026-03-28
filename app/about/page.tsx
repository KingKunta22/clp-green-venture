'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Award, Trophy, Star, Shield, ChevronDown, ChevronUp } from 'lucide-react'

export default function About() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0)
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

  // Awards data with image paths
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

  const displayedAwards = showAllAwards ? awards : awards.slice(0, 3)

  const nextAward = () => {
    setCurrentAwardIndex((prev) => (prev + 1) % displayedAwards.length)
  }

  const prevAward = () => {
    setCurrentAwardIndex((prev) => (prev - 1 + displayedAwards.length) % displayedAwards.length)
  }

  return (
    <section className="-mt-4 relative z-10 bg-[#060b05] rounded-t-[3rem] px-6 py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. ABOUT CLP GREEN VENTURE */}
        <div 
          ref={(el) => { sectionRefs.current[0] = el }}
          data-section-index="0"
          className="grid md:grid-cols-2 gap-12 items-start mb-24"
        >
          <div className={`transition-all duration-1000 ease-out transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-green-500 font-mono tracking-widest uppercase text-sm block mb-2">Our Story</span>
            <h2 className="text-5xl font-extrabold mt-4 leading-tight">
              From Direct Selling <br/>to <span className="text-green-600">Sustainable Farming</span>
            </h2>
            
            {/* Company History Explanation */}
            <div className="mt-8 space-y-6">
              <div className="bg-gradient-to-r from-green-900/20 to-transparent p-6 rounded-xl border-l-4 border-green-500">
                <p className="text-white text-lg leading-relaxed">
                  <span className="font-bold text-green-400">CLP started as CLP Direct Selling</span> — a company focused on bringing quality products to Filipino families. Today, we've evolved into <span className="font-bold text-green-400">CLP Green Venture Inc.</span>, now focusing on agarwood cultivation while continuing our direct selling roots.
                </p>
              </div>
              
              <p className="text-zinc-400 text-lg leading-relaxed">
                Under the guidance of <span className="text-white font-semibold">Charlie Patigue</span>, we've grown from a direct selling foundation into a trusted authority in both the agarwood industry and consumer goods distribution.
              </p>
            </div>

            {/* Current Product Lines */}
            <div className="mt-8">
              <h3 className="text-green-400 font-bold text-sm uppercase tracking-wider mb-4">What We Sell Today</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'M-SECRET', desc: 'Korean Skincare' },
                  { name: 'TALA', desc: 'Cleaning Solutions' },
                  { name: 'Rated Coffee', desc: 'Premium Coffee' },
                  { name: 'CLP Agarwood', desc: 'Agarwood Products' },
                  { name: 'Pet Food', desc: 'Dog Food' }
                ].map((product) => (
                  <div key={product.name} className="bg-zinc-800/50 border border-green-800/30 rounded-full px-4 py-2 text-sm">
                    <span className="text-white font-bold">{product.name}</span>
                    <span className="text-zinc-500 ml-2">• {product.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* RIGHT SIDE */}
          <div className={`bg-zinc-900/50 border border-green-900/30 p-8 rounded-3xl mt-4 transition-all duration-1000 ease-out delay-200 transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-green-500 font-bold uppercase tracking-tighter text-xs mb-4">The man behind the business</h3>
            
            <div className="relative w-full h-[400px] mx-auto overflow-hidden rounded-md">
              <Image
                src={'/images/sircharlie2.jpg'}
                alt={'Charlie Patigue'}
                fill
                className='object-cover object-top rounded-md transition-transform duration-700 hover:scale-105'
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
            
            <div className="mt-8 p-4 bg-green-900/20 rounded-xl transition-all duration-500 hover:bg-green-900/30">
              <p className="text-white font-bold text-lg text-center mb-2">Charlie L. Patigue</p>
              <p className="text-green-400 text-sm text-center mb-3">CEO, CLP GREEN VENTURE INC.</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                From direct selling to sustainable farming — Charlie built CLP into a trusted partner for growers, entrepreneurs, and families across the Philippines.
              </p>
            </div>
          </div>

            {/* Note to avoid confusion */}
            <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg col-span-2">
              <p className="text-xs text-green-300 flex items-start gap-2">
                <span className="font-bold text-green-400">Note:</span>
                <span>You might see both "CLP Direct Selling" and "CLP Green Venture" on our awards. Same company! We're still selling all our products, just expanding into agarwood farming.</span>
              </p>
            </div>
        </div>

        {/* 2. PARTNERSHIP BENEFITS - SIMPLIFIED VERSION */}
        <div 
          ref={(el) => { sectionRefs.current[1] = el }}
          data-section-index="1"
          className={`mb-24 transition-all duration-1000 ease-out transform ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="col-span-full mb-12 text-center">
            <h3 className="text-4xl font-bold mb-4">Why Partner With Us?</h3>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Simple, clear benefits for our partners and investors</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-500 font-bold text-xl">1</span>
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Free Training</h4>
              <p className="text-zinc-400">
                Learn from <span className="text-green-400">Juvelyn Quirog</span> and our team. We teach you everything about agarwood — from planting to selling. Online or face-to-face, your choice.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-500 font-bold text-xl">2</span>
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Nationwide Support</h4>
              <p className="text-zinc-400">
                We have branches in <span className="text-green-400">Cebu, Dumaguete, Negros, and Davao</span>. Wherever you are in the Visayas or Mindanao, we're here to help.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-500 font-bold text-xl">3</span>
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Direct Partnership</h4>
              <p className="text-zinc-400">
                Work directly with us — no middlemen. Visit our plantations anytime. We keep you updated on your investment.
              </p>
            </div>
          </div>

          {/* Quick Stats Update */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="text-center p-4 bg-green-900/10 rounded-xl">
              <div className="text-3xl font-bold text-green-500">500+</div>
              <div className="text-zinc-400 text-sm">Hectares Planted</div>
            </div>
            <div className="text-center p-4 bg-green-900/10 rounded-xl">
              <div className="text-3xl font-bold text-green-500">2,000+</div>
              <div className="text-zinc-400 text-sm">Active Partners</div>
            </div>
            <div className="text-center p-4 bg-green-900/10 rounded-xl">
              <div className="text-3xl font-bold text-green-500">5</div>
              <div className="text-zinc-400 text-sm">Product Lines</div>
            </div>
            <div className="text-center p-4 bg-green-900/10 rounded-xl">
              <div className="text-3xl font-bold text-green-500">50+</div>
              <div className="text-zinc-400 text-sm">Training Sessions</div>
            </div>
          </div>
        </div>

        {/* 3. AWARDS & RECOGNITION */}
        <div 
          ref={(el) => { sectionRefs.current[2] = el }}
          data-section-index="2"
          className={`mb-24 transition-all duration-1000 ease-out transform ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-3">Our Achievements</h3>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Recognition for our work in direct selling, skincare, and now agarwood</p>
          </div>

          {/* First Three Awards - Large Display with Images */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {awards.slice(0, 3).map((award) => {
              const isExpanded = expandedAwardDesc.has(award.id)
              return (
                <div
                  key={award.id}
                  className="bg-gradient-to-br from-green-900/20 to-zinc-900/30 border border-green-800/30 rounded-2xl overflow-hidden hover:border-green-600/30 transition-all duration-300 flex flex-col"
                >
                  {/* Image - takes most of the card */}
                  <div className="relative w-full h-48 md:h-56">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="text-xl font-bold text-white mb-1">{award.title}</h4>
                    <div className="flex items-center gap-2 text-sm mb-3 w-full">
                      <span className="text-green-400 font-medium truncate">{award.issuer}</span>
                      <span className="text-zinc-500 flex-shrink-0">•</span>
                      <span className="text-zinc-400 flex-shrink-0">{award.year}</span>
                    </div>

                    {/* Description with toggle */}
                    <div className="mb-3">
                      <p className={`text-zinc-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {award.fullDescription}
                      </p>
                      {award.fullDescription.length > 150 && (
                        <button
                          onClick={() => {
                            const newSet = new Set(expandedAwardDesc)
                            if (isExpanded) {
                              newSet.delete(award.id)
                            } else {
                              newSet.add(award.id)
                            }
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

          {/* View All Awards Button */}
          {awards.length > 3 && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAllAwards(!showAllAwards)}
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                {showAllAwards ? (
                  <>Show Less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>View All Awards ({awards.length - 3} more) <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}

          {/* All Awards Grid (when expanded) */}
          {showAllAwards && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-fadeIn">
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
          className={`bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[3rem] p-12 text-center transition-all duration-1000 ease-out transform ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl font-bold mb-6">Ready to Start?</h3>
          <p className="max-w-2xl mx-auto text-zinc-400 mb-8 text-lg">
            Whether you're interested in agarwood farming, our skincare products, or becoming a partner — we're here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => {
                document.getElementById('seminars')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Join a Seminar
            </button>
            <a
              href="https://web.facebook.com/profile.php?id=61573163535908"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Message us on Facebook
            </a>
          </div>
          <p className="text-zinc-500 text-sm mt-12">
            📍 City Suites Unit 09, F. Ramos St., Cebu City
          </p>
        </div>

        {/* FAQ Note */}
        <div className="mt-12 text-center text-sm text-zinc-600">
          <p>CLP Direct Selling or CLP Green Venture? Same company! We're just growing into agarwood while keeping our original products.</p>
        </div>
      </div>

      {/* Add CSS animation */}
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