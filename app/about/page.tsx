'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Award, Trophy, Star, Shield } from 'lucide-react'

export default function About() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0)
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

    // Observe all sections
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Sample awards data - replace with actual awards
  const awards = [
    {
      id: 1,
      title: "Sustainable Agriculture Excellence Award",
      issuer: "Department of Agriculture Philippines",
      year: "2023",
      description: "Recognized for outstanding contribution to sustainable agarwood cultivation and environmental conservation.",
      icon: <Trophy className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Innovation in Agroforestry",
      issuer: "ASEAN Agriculture Council",
      year: "2022",
      description: "Awarded for innovative approaches in agarwood cultivation and sustainable farming practices.",
      icon: <Award className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Best Plantation Management",
      issuer: "Philippine Agricultural Society",
      year: "2023",
      description: "Recognized for excellence in plantation management and sustainable land use practices.",
      icon: <Star className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Quality Certification",
      issuer: "Bureau of Plant Industry",
      year: "2024",
      description: "Certified for maintaining highest quality standards in agarwood production and processing.",
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: 5,
      title: "Community Development Partner",
      issuer: "Local Government Unit of Cebu",
      year: "2023",
      description: "Acknowledged for significant contributions to community development and farmer empowerment.",
      icon: <Award className="w-8 h-8" />
    }
  ]

  const nextAward = () => {
    setCurrentAwardIndex((prev) => (prev + 1) % awards.length)
  }

  const prevAward = () => {
    setCurrentAwardIndex((prev) => (prev - 1 + awards.length) % awards.length)
  }

  return (
    <section className="-mt-4 relative z-10 bg-[#060b05] rounded-t-[3rem] px-6 py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. ABOUT CLP GREEN VENTURE */}
        <div 
          ref={el => sectionRefs.current[0] = el}
          data-section-index="0"
          className="grid md:grid-cols-2 gap-12 items-start mb-24"
        >
          <div className={`transition-all duration-1000 ease-out transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-green-500 font-mono tracking-widest uppercase text-sm block mb-2">Sustainable Agriculture</span>
            <h2 className="text-5xl font-extrabold mt-4 leading-tight">
              About Us
            </h2>
            <p className="text-zinc-400 mt-12 text-lg leading-relaxed">
              CLP GREEN VENTURE INC. is a leading force in sustainable agarwood cultivation and responsible plant management in the Philippines. Under the guidance of <span className="text-white font-semibold">Charlie Patigue</span>, we've grown from a direct selling foundation into a trusted authority in the agarwood industry.
            </p>
            
            {/* MORE ABOUT CLP */}
            <div className="mt-8 space-y-4">
              <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
                We specialize in the scientific cultivation, inoculation, and sustainable harvesting of Agarwood trees. Our approach combines modern agricultural techniques with traditional knowledge to produce the highest quality agarwood products in the country.
              </p>
              
              <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
                Our operations extend across multiple provinces in Visayas and Mindanao, with dedicated research facilities focused on improving agarwood yield and resin quality. We work closely with local farmers, transforming idle lands into productive agarwood plantations while creating sustainable livelihoods and preserving our natural heritage.
              </p>
            </div>
          </div>
          
          {/* RIGHT SIDE */}
          <div className={`bg-zinc-900/50 border border-green-900/30 p-8 rounded-3xl mt-4 transition-all duration-1000 ease-out delay-200 transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-green-500 font-bold uppercase tracking-tighter text-xs mb-4">The man behind the growing business</h3>
            
            {/* ABOUT SIR CHARLIE - RESIZED IMAGE */}
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
              <p className="text-green-400 text-sm text-center mb-3">Chief Executive Officer, CLP GREEN VENTURE INC.</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Charlie L. Patigue is the visionary founder and CEO of CLP GREEN VENTURE INC. With a strong passion for environmental stewardship and community development, he has built CLP into a trusted partner for growers, entrepreneurs, and plant enthusiasts across the region.
              </p>
            </div>
          </div>
        </div>

        {/* 2. PARTNERSHIP BENEFITS */}
        <div 
          ref={el => sectionRefs.current[1] = el}
          data-section-index="1"
          className={`mb-24 transition-all duration-1000 ease-out transform ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="col-span-full mb-8">
            <h3 className="text-3xl font-bold mb-3">Why Partner with CLP?</h3>
            <p className="text-zinc-500 text-lg">A sustainable investment with tangible growth.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-500 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-green-900/10">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 hover:bg-green-600/30">
                <span className="text-green-500 font-bold text-xl">1</span>
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Expert Training</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Led by <span className="text-green-500 font-medium">Juvelyn Quirog</span>, our training covers inoculation techniques, market valuation, and sustainable agarwood management. We offer both online and in-person sessions to suit different learning preferences.
              </p>
            </div>

            <div className="p-8 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-500 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-green-900/10">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 hover:bg-green-600/30">
                <span className="text-green-500 font-bold text-xl">2</span>
              </div>
              <h4 className="text-white font-bold text-xl mb-3">National Network</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                With branches in <span className="text-green-500 font-medium">Dumaguete, Negros, Cebu, and Davao</span>, we provide comprehensive support from seedling procurement to market connections. Our established network ensures your investment is well-supported.
              </p>
            </div>

            <div className="p-8 bg-zinc-900/80 border border-green-800/30 rounded-2xl hover:border-green-600/50 transition-all duration-500 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-green-900/10">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 hover:bg-green-600/30">
                <span className="text-green-500 font-bold text-xl">3</span>
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Direct Operations</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We manage our own agarwood plantations across the Philippines. Investors work directly with the company that handles cultivation, ensuring transparency through regular updates and plantation visit opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* 3. CLP ACHIEVEMENTS */}
        <div 
          ref={el => sectionRefs.current[2] = el}
          data-section-index="2"
          className={`mb-24 transition-all duration-1000 ease-out transform ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl font-bold mb-10 text-center">Our Track Record</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-green-900/20 rounded-xl transition-all duration-500 hover:bg-green-900/30 hover:scale-105 hover:shadow-lg hover:shadow-green-900/20">
              <div className="text-4xl font-bold text-green-500 mb-2 transition-all duration-300 hover:scale-110">500+</div>
              <div className="text-zinc-300">Hectares Planted</div>
            </div>
            <div className="text-center p-6 bg-green-900/20 rounded-xl transition-all duration-500 hover:bg-green-900/30 hover:scale-105 hover:shadow-lg hover:shadow-green-900/20">
              <div className="text-4xl font-bold text-green-500 mb-2 transition-all duration-300 hover:scale-110">2,000+</div>
              <div className="text-zinc-300">Partners & Investors</div>
            </div>
            <div className="text-center p-6 bg-green-900/20 rounded-xl transition-all duration-500 hover:bg-green-900/30 hover:scale-105 hover:shadow-lg hover:shadow-green-900/20">
              <div className="text-4xl font-bold text-green-500 mb-2 transition-all duration-300 hover:scale-110">5</div>
              <div className="text-zinc-300">Operational Branches</div>
            </div>
            <div className="text-center p-6 bg-green-900/20 rounded-xl transition-all duration-500 hover:bg-green-900/30 hover:scale-105 hover:shadow-lg hover:shadow-green-900/20">
              <div className="text-4xl font-bold text-green-500 mb-2 transition-all duration-300 hover:scale-110">50+</div>
              <div className="text-zinc-300">Training Sessions</div>
            </div>
          </div>
        </div>

        {/* 4. AWARDS & CERTIFICATIONS */}
        <div 
          ref={el => sectionRefs.current[3] = el}
          data-section-index="3"
          className={`mb-24 transition-all duration-1000 ease-out transform ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Awards & Certifications</h3>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Recognized for excellence in sustainable agriculture and business innovation</p>
          </div>

          {/* AWARDS CAROUSEL */}
          <div className="relative">
            {/* MAIN AWARD DISPLAY */}
            <div className="bg-gradient-to-br from-green-900/20 to-zinc-900/30 border border-green-800/30 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* AWARD ICON */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-600/20 to-emerald-500/20 rounded-2xl flex items-center justify-center">
                    <div className="text-green-500">
                      {awards[currentAwardIndex].icon}
                    </div>
                  </div>
                </div>

                {/* AWARD DETAILS */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{awards[currentAwardIndex].title}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-400 font-medium">{awards[currentAwardIndex].issuer}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-400">{awards[currentAwardIndex].year}</span>
                      </div>
                    </div>
                    <div className="bg-green-900/30 px-4 py-2 rounded-full">
                      <span className="text-green-400 font-medium">Award #{currentAwardIndex + 1}</span>
                    </div>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">{awards[currentAwardIndex].description}</p>
                </div>
              </div>
            </div>

            {/* CAROUSEL CONTROLS */}
            <div className="flex items-center justify-center mt-8 gap-6">
              <button
                onClick={prevAward}
                className="p-3 rounded-full bg-green-900/30 border border-green-800/30 hover:bg-green-800/40 transition-all duration-300 hover:scale-110"
                aria-label="Previous award"
              >
                <ChevronLeft className="w-5 h-5 text-green-400" />
              </button>
              
              {/* INDICATORS */}
              <div className="flex gap-2">
                {awards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAwardIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentAwardIndex 
                        ? 'bg-green-500 w-8' 
                        : 'bg-zinc-700 hover:bg-zinc-600'
                    }`}
                    aria-label={`Go to award ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextAward}
                className="p-3 rounded-full bg-green-900/30 border border-green-800/30 hover:bg-green-800/40 transition-all duration-300 hover:scale-110"
                aria-label="Next award"
              >
                <ChevronRight className="w-5 h-5 text-green-400" />
              </button>
            </div>

            {/* ALL AWARDS GRID (for larger screens) */}
            <div className="hidden md:grid grid-cols-3 gap-6 mt-12">
              {awards.slice(0, 3).map((award, index) => (
                <div 
                  key={award.id}
                  className={`p-6 bg-zinc-900/30 border rounded-2xl transition-all duration-300 hover:border-green-600/30 hover:translate-y-[-4px] cursor-pointer ${
                    index === currentAwardIndex ? 'border-green-500/30 bg-green-900/20' : 'border-zinc-800/30'
                  }`}
                  onClick={() => setCurrentAwardIndex(index)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-green-500">{award.icon}</div>
                    <div>
                      <h5 className="font-bold text-white text-sm">{award.title.split(' ').slice(0, 3).join(' ')}...</h5>
                      <p className="text-xs text-zinc-500">{award.year}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm line-clamp-2">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION */}
        <div 
          ref={el => sectionRefs.current[4] = el}
          data-section-index="4"
          className={`bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[3rem] p-12 text-center transition-all duration-1000 ease-out transform ${
            visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl font-bold mb-6">Start Your Agarwood Journey</h3>
          <p className="max-w-2xl mx-auto text-zinc-400 mb-8 text-lg">
            Whether you're an experienced investor or new to agarwood cultivation, our team is ready to guide you. Join our growing community of partners who are building sustainable futures through responsible agarwood farming.
          </p>
          <button 
            onClick={() => {
              document.getElementById('seminars')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/20 hover:shadow-green-900/40 active:scale-95"
          >
            Join a Seminar
          </button>
          <p className="text-zinc-500 text-sm mt-12 -mb-6">
            Visit our office: City Suites Unit 09, F. Ramos St., Cebu City
          </p>
        </div>

      </div>
    </section>
  )
}