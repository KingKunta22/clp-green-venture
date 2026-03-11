'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Calendar, Clock, MapPin, User, CheckCircle, Mail, Phone, CreditCard, QrCode, Wallet, Award, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'

export default function Seminars() {
  const [showForm, setShowForm] = useState(false)
  const [showPastSeminars, setShowPastSeminars] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedSeminar, setSelectedSeminar] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    seminarType: 'basic',
    participants: 1,
    preferredDate: '',
    paymentMethod: 'gcash' // 'gcash', 'maya', 'walkin'
  })
  const [registrationStep, setRegistrationStep] = useState(1) // 1: form, 2: payment, 3: success
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  // Updated seminars with your new forum
  const seminars = [
    {
      id: 1,
      title: "Basic Agarwood Cultivation",
      description: "Learn the fundamentals of agarwood planting, care, and basic inoculation techniques. Perfect for beginners.",
      schedule: "Every Monday, Wednesday, Friday • 3:00 PM onwards",
      duration: "3 hours",
      instructor: "Juvelyn Quirog - Manager",
      level: "Beginner",
      color: "from-green-600 to-emerald-700",
      status: "ongoing",
      fee: "Free",
      location: "CLP Office, City Suites, Ramos St., Cebu City"
    },
    {
      id: 2,
      title: "Scientific Forum on Growing Agarwood",
      description: "Expand your knowledge in agarwood cultivation with renowned agriculturist and forester Dr. Jimmy Salar. Learn scientific insights and modern techniques in sustainable agarwood farming. Perfect for farmers, investors, and enthusiasts.",
      schedule: "March 28, 2026 (Saturday) • 10:00 AM",
      duration: "Full day",
      instructor: "Dr. Jimmy Salar - Agriculturist & Forester",
      level: "All Levels",
      color: "from-green-700 to-emerald-800",
      status: "upcoming",
      fee: "₱250",
      location: "Ground Floor, Unit 9 CLP Office, City Suites, Ramos St., Cebu City",
      gcash: "0956 573 7821",
      gcashName: "J******E P."
    },
    {
      id: 3,
      title: "Business & Investment in Agarwood",
      description: "Learn how to build a sustainable agarwood business, from plantation to market. Ideal for entrepreneurs and investors.",
      schedule: "Every Tuesday, Thursday, Saturday • 6:00 PM onwards",
      duration: "3 hours",
      instructor: "Juvelyn Quirog & Charlie L. Patigue",
      level: "All Levels",
      color: "from-green-800 to-emerald-900",
      status: "ongoing",
      fee: "Free",
      location: "CLP Office, City Suites, Ramos St., Cebu City"
    }
  ]

  const handleRegisterClick = (seminar: any) => {
    setSelectedSeminar(seminar)
    setShowForm(true)
    setRegistrationStep(1)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRegistrationStep(2) // Move to payment step
  }

  const handlePaymentSubmit = (method: string) => {
    setFormData({...formData, paymentMethod: method})
    
    if (method === 'walkin') {
      // Walk-in registration - no payment needed now
      setRegistrationStep(3) // Show success
      // Save registration to your system
      saveRegistration('walkin')
    } else {
      // GCash/Maya - show payment instructions
      setShowPaymentModal(true)
    }
  }

  const saveRegistration = (paymentType: string) => {
    // Here you would save to your database
    console.log('Registration saved:', {
      ...formData,
      seminar: selectedSeminar,
      paymentType,
      registrationDate: new Date(),
      registrationId: 'REG-' + Date.now()
    })
    
    // Generate a unique registration code
    const regCode = 'CLP-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    localStorage.setItem('registrationCode', regCode)
  }

  const confirmPayment = () => {
    setShowPaymentModal(false)
    setRegistrationStep(3) // Show success
    saveRegistration('online')
  }

  return (
    <section id="seminars" className="relative z-10 bg-[#060b05] px-6 py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div 
          ref={(el) => { sectionRefs.current[0] = el }}
          data-section-index="0"
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-green-500 font-mono tracking-widest uppercase text-sm block mb-4">Expert Training</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            CLP <span className="text-green-600">Agarwood</span> Seminars
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Join our regular seminars or special forums with expert speakers
          </p>
          
          {/* CONTACT INFO */}
          <div className="bg-zinc-900/50 border border-green-800/30 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-green-400 text-sm mb-3">Contact Us</p>
                <div className="space-y-3">
                  <p className="text-white font-medium flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    0916 512 0219
                  </p>
                  <p className="text-white font-medium flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    clpgreenventures@gmail.com
                  </p>
                </div>
              </div>
              <div>
                <p className="text-green-400 text-sm mb-3">Payment Options</p>
                <div className="space-y-2">
                  <p className="text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    GCash: 0956 573 7821
                  </p>
                  <p className="text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    PayMaya: Available
                  </p>
                  <p className="text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Walk-in: Cash/GCash/Maya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEMINARS GRID */}
        <div 
          ref={(el) => { sectionRefs.current[1] = el }}
          data-section-index="1"
          className="mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {seminars.map((seminar, index) => (
              <div 
                key={seminar.id}
                className="bg-zinc-900/30 border border-green-800/20 rounded-2xl overflow-hidden hover:border-green-600/30 transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                {/* SEMINAR HEADER */}
                <div className={`bg-gradient-to-r ${seminar.color} p-5`}>
                  <h3 className="text-xl font-bold">{seminar.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                      {seminar.level}
                    </span>
                    {seminar.fee !== "Free" && (
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                        {seminar.fee}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* SEMINAR DETAILS */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {seminar.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white text-sm">{seminar.schedule}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-white text-sm">Duration: {seminar.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-white text-sm">{seminar.instructor}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-white text-sm line-clamp-1">{seminar.location}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRegisterClick(seminar)}
                    className="w-full mt-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT INFO BANNER */}
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-blue-300">
                <span className="font-bold">Payment Methods:</span> GCash, PayMaya, or Walk-in Cash
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                💳 Bank Cards: Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* REGISTRATION MODAL */}
        {showForm && selectedSeminar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            
            <div className="relative bg-[#0f130e] border border-green-800/30 rounded-2xl shadow-2xl w-full max-w-md">
              
              {/* STEP 1: Registration Form */}
              {registrationStep === 1 && (
                <>
                  <div className="p-5 border-b border-green-800/30">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-white">Register</h3>
                        <p className="text-zinc-400 text-xs">{selectedSeminar.title}</p>
                      </div>
                      <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-zinc-800 rounded-full">
                        <X className="w-5 h-5 text-zinc-400" />
                      </button>
                    </div>
                  </div>
                  
                  <form onSubmit={handleFormSubmit} className="p-5">
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        required
                        className="w-full px-3 py-2.5 bg-zinc-900/50 border border-green-800/30 rounded-lg text-white text-sm"
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        required
                        className="w-full px-3 py-2.5 bg-zinc-900/50 border border-green-800/30 rounded-lg text-white text-sm"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        className="w-full px-3 py-2.5 bg-zinc-900/50 border border-green-800/30 rounded-lg text-white text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Number of Participants"
                        min="1"
                        defaultValue="1"
                        className="w-full px-3 py-2.5 bg-zinc-900/50 border border-green-800/30 rounded-lg text-white text-sm"
                      />
                      
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 2: Payment Selection */}
              {registrationStep === 2 && (
                <>
                  <div className="p-5 border-b border-green-800/30">
                    <h3 className="text-xl font-bold text-white">Select Payment</h3>
                    <p className="text-zinc-400 text-xs">Fee: {selectedSeminar.fee}</p>
                  </div>
                  
                  <div className="p-5 space-y-3">
                    <button
                      onClick={() => handlePaymentSubmit('gcash')}
                      className="w-full p-4 bg-blue-600/20 border border-blue-800/30 rounded-xl hover:bg-blue-600/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">GCash</span>
                        </div>
                        <div className="text-left">
                          <p className="font-bold">Pay via GCash</p>
                          <p className="text-xs text-zinc-400">0956 573 7821 (J******E P.)</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handlePaymentSubmit('maya')}
                      className="w-full p-4 bg-blue-600/20 border border-blue-800/30 rounded-xl hover:bg-blue-600/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">Maya</span>
                        </div>
                        <div className="text-left">
                          <p className="font-bold">Pay via PayMaya</p>
                          <p className="text-xs text-zinc-400">Available now</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handlePaymentSubmit('walkin')}
                      className="w-full p-4 bg-green-600/20 border border-green-800/30 rounded-xl hover:bg-green-600/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <Wallet className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold">Walk-in Payment</p>
                          <p className="text-xs text-zinc-400">Pay at our office (Cash/GCash/Maya)</p>
                        </div>
                      </div>
                    </button>
                    
                    <p className="text-xs text-center text-zinc-500 mt-4">
                      💳 Bank cards not yet available
                    </p>
                  </div>
                </>
              )}

              {/* STEP 3: Success with Animation */}
              {registrationStep === 3 && (
                <div className="p-8 text-center animate-fade-in">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center animate-ping absolute"></div>
                      <CheckCircle className="w-12 h-12 text-green-500 relative z-10" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Registration Successful! 🎉</h3>
                  
                  <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-4 mb-4">
                    <p className="text-sm text-green-400 mb-2">Your Registration Code:</p>
                    <p className="text-2xl font-mono font-bold text-white tracking-wider">
                      {localStorage.getItem('registrationCode')}
                    </p>
                  </div>
                  
                  <p className="text-zinc-400 text-sm mb-4">
                    {formData.paymentMethod === 'walkin' 
                      ? 'Please visit our office on the seminar date. Bring this code.'
                      : 'Please send payment to GCash 0956 573 7821 and send receipt to our Facebook page.'}
                  </p>
                  
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-zinc-800 rounded-lg text-sm"
                    >
                      Save Code
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 bg-green-600 rounded-lg text-sm"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GCASH PAYMENT MODAL */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)} />
            
            <div className="relative bg-[#0f130e] border border-green-800/30 rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <h3 className="text-xl font-bold mb-4">Pay via GCash</h3>
              
              <div className="bg-white p-4 rounded-xl mb-4">
                {/* QR Code placeholder - you'd generate actual QR */}
                <div className="w-48 h-48 mx-auto bg-gray-200 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-700" />
                </div>
              </div>
              
              <p className="text-center mb-2 font-bold">0956 573 7821</p>
              <p className="text-center text-sm text-zinc-400 mb-4">J******E P.</p>
              
              <p className="text-xs text-zinc-500 mb-4">
                1. Open GCash • 2. Scan QR or enter number • 3. Send {selectedSeminar?.fee}<br/>
                4. Take screenshot of receipt • 5. Send to our Facebook page
              </p>
              
              <button
                onClick={confirmPayment}
                className="w-full bg-green-600 py-3 rounded-lg font-bold"
              >
                I've Sent Payment
              </button>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  )
}