'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export default function About() {
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

    // Observe all sections
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

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
            <h2 className="text-5xl font-extrabold mt-8 mb-16 leading-tight">
              About Us
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              CLP Green Venture is a leading force in sustainable agarwood cultivation and responsible plant management in the Philippines. Under the guidance of <span className="text-white font-semibold">Charlie Patigue</span>, we've grown from a direct selling foundation into a trusted authority in the agarwood industry.
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
            <div className="relative w-full h-[400px] mx-auto overflow-hidden rounded-lg">
              <Image
                src={'/images/sircharlie.jpg'}
                alt={'Charlie Patigue'}
                fill
                className='object-cover object-top rounded-md transition-transform duration-700 hover:scale-105'
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
            
            <div className="mt-8 p-4 bg-green-900/20 rounded-xl transition-all duration-500 hover:bg-green-900/30">
              <p className="text-white font-bold text-lg text-center mb-2">Charlie L. Patigue</p>
              <p className="text-green-400 text-sm text-center mb-3">Chief Executive Officer, CLP Green Venture Inc.</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Charlie L. Patigue is the visionary founder and CEO of CLP Green Venture Inc. With a strong passion for environmental stewardship and community development, he has built CLP into a trusted partner for growers, entrepreneurs, and plant enthusiasts across the region.
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

        {/* 4. CALL TO ACTION */}
        <div 
          ref={el => sectionRefs.current[3] = el}
          data-section-index="3"
          className={`bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[3rem] p-12 text-center transition-all duration-1000 ease-out transform ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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