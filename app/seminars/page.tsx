'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Calendar, Clock, MapPin, User, CheckCircle, Mail, Phone, CreditCard, QrCode, Wallet, Facebook, ChevronDown, ChevronUp } from 'lucide-react'

export default function Seminars() {
  const [showForm, setShowForm] = useState(false)
  const [showPastSeminars, setShowPastSeminars] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedSeminar, setSelectedSeminar] = useState<any>(null)
  const [expandedDesc, setExpandedDesc] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    phone: '',
    participants: 1,
    paymentMethod: 'gcash'
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [registrationStep, setRegistrationStep] = useState(1)
  const [registrationCode, setRegistrationCode] = useState('')
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Intersection Observer
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
    sectionRefs.current.forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  const seminars = [
    {
      id: 1,
      title: "Basic Agarwood Cultivation",
      description: "Learn the fundamentals of agarwood planting, care, and basic inoculation techniques. Perfect for beginners who want to start their agarwood journey. This session covers everything from seedling selection to first harvest.",
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
      description: "Expand your knowledge in agarwood cultivation with renowned agriculturist and forester Dr. Jimmy Salar. Learn scientific insights and modern techniques in sustainable agarwood farming. Perfect for farmers, investors, and enthusiasts. Dr. Salar will share his decades of experience in forest management and agarwood research.",
      schedule: "March 28, 2026 (Saturday) • 10:00 AM to 12:00 PM",
      duration: "2 hours",
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
      description: "Learn how to build a sustainable agarwood business, from plantation to market. Ideal for entrepreneurs and investors looking to enter the agarwood industry. Topics include market trends, ROI analysis, and partnership opportunities.",
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

  const pastSeminars = [
    {
      id: 4,
      title: "Special Holiday Seminar 2024",
      description: "Special edition seminar covering holiday planting techniques and year-end investment strategies.",
      schedule: "December 10-11, 2024 • 9:00 AM - 4:00 PM",
      duration: "2 days",
      instructor: "Charlie L. Patigue & Team",
      level: "All Levels",
      color: "from-green-600 to-emerald-700",
      status: "past",
      fee: "Free",
      location: "CLP Office, City Suites, Ramos St., Cebu City"   // ✅ add this line
    },
    {
      id: 5,
      title: "Beginner's Intensive Workshop",
      description: "Intensive 3-day workshop for beginners covering all aspects of agarwood cultivation.",
      schedule: "November 5-7, 2024 • 8:00 AM - 5:00 PM",
      duration: "3 days",
      instructor: "Juvelyn Quirog",
      level: "Beginner",
      color: "from-green-700 to-emerald-800",
      status: "past",
      fee: "Free",
      location: "CLP Office, City Suites, Ramos St., Cebu City"   // ✅ add this line
    }
  ]

  const allSeminars = showPastSeminars ? [...seminars, ...pastSeminars] : seminars

  const isPastSeminar = (seminar: any) => seminar.status === 'past'

  const handleRegisterClick = (seminar: any) => {
    setSelectedSeminar(seminar)
    setShowForm(true)
    setRegistrationStep(1)
    setFormErrors({})
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '',
      address: '',
      phone: '',
      participants: 1,
      paymentMethod: 'gcash'
    })
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.address.trim()) errors.address = 'Address is required'
    const phoneRegex = /^(09|\+639)\d{9}$/
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid PH mobile number'
    if (formData.participants < 1) errors.participants = 'At least 1 participant'
    return errors
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setRegistrationStep(2)
  }

  const handlePaymentSubmit = (method: string) => {
    setFormData({...formData, paymentMethod: method})
    if (method === 'walkin') {
      const code = generateRegistrationCode()
      setRegistrationCode(code)
      saveRegistration('walkin', code)
      setRegistrationStep(3)
    } else {
      setShowPaymentModal(true)
    }
  }

  const generateRegistrationCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = 'CLP-'
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
    code += '-'
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
    return code
  }

  const saveRegistration = (paymentType: string, code: string) => {
    console.log('Registration saved:', {
      ...formData,
      seminar: selectedSeminar?.title,
      fee: selectedSeminar?.fee,
      paymentType,
      registrationCode: code,
      date: new Date().toISOString()
    })
  }

  const confirmPayment = () => {
    const code = generateRegistrationCode()
    setRegistrationCode(code)
    setShowPaymentModal(false)
    saveRegistration('online', code)
    setRegistrationStep(3)
  }

  // Calculate total fee
  const getTotalFee = () => {
    if (!selectedSeminar || selectedSeminar.fee === 'Free') return 0
    const fee = parseInt(selectedSeminar.fee.replace('₱', ''))
    return fee * formData.participants
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
                  <a
                    href="https://www.facebook.com/profile.php?id=61573163535908"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium flex items-center gap-2 hover:text-blue-400 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-blue-500" />
                    @Agarwood by CLP
                  </a>
                </div>
              </div>
              <div>
                <p className="text-green-400 text-sm mb-3">Payment Options</p>
                <div className="space-y-2">
                  <p className="text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    GCash: 0956 573 7821
                  </p>
                  <p className="text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    PayMaya: Available
                  </p>
                  <p className="text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Walk-in: Cash/GCash/Maya
                  </p>
                </div>
                <p className="text-xs text-zinc-500 mt-3">Payments verified manually.</p>
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
            {allSeminars.map((seminar) => {
              const isPast = isPastSeminar(seminar)
              return (
                <div 
                  key={seminar.id}
                  className={`bg-zinc-900/30 border border-green-800/20 rounded-2xl overflow-hidden hover:border-green-600/30 transition-all duration-500 hover:-translate-y-1 flex flex-col ${
                    isPast ? 'opacity-60' : ''
                  }`}
                >
                  {/* SEMINAR HEADER with fixed height */}
                  <div className={`bg-gradient-to-r ${seminar.color} p-5 min-h-[6rem] flex flex-col justify-center`}>
                    <h3 className="text-xl font-bold line-clamp-2">{seminar.title}</h3>
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
                  
                  {/* DETAILS */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-4">
                      <p className={`text-zinc-400 text-sm leading-relaxed ${expandedDesc === seminar.id ? '' : 'line-clamp-3'}`}>
                        {seminar.description}
                      </p>
                      {seminar.description.length > 150 && (
                        <button
                          onClick={() => setExpandedDesc(expandedDesc === seminar.id ? null : seminar.id)}
                          className="text-green-400 text-xs mt-1 hover:underline"
                        >
                          {expandedDesc === seminar.id ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                    
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
                    
                    {!isPast ? (
                      <button
                        onClick={() => handleRegisterClick(seminar)}
                        className="w-full mt-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        Register Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full mt-auto bg-zinc-700 text-zinc-400 font-bold py-3 px-6 rounded-lg cursor-not-allowed"
                      >
                        Registration Closed
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* VIEW PAST SEMINARS BUTTON */}
        {pastSeminars.length > 0 && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowPastSeminars(!showPastSeminars)}
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              {showPastSeminars ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>View Past Seminars ({pastSeminars.length}) <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}

        {/* TRUST BANNER */}
        <div className="bg-green-900/10 border border-green-800/30 rounded-xl p-4 mb-8 text-center">
          <p className="text-sm text-zinc-300">
            <span className="text-green-400 font-bold">✓ Verified Business</span> – CLP Green Venture Inc. is a registered company. 
            Check our Facebook page for the same contact details. 
            <a href="https://www.facebook.com/profile.php?id=61573163535908" target="_blank" rel="noopener" className="text-green-400 underline ml-1">Visit FB Page</a>
          </p>
        </div>

        {/* REGISTRATION MODAL */}
        {showForm && selectedSeminar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            
            <div className="relative bg-[#0f130e] border border-green-800/30 rounded-2xl shadow-2xl w-full max-w-lg">
              
              {/* STEP 1: Registration Form */}
              {registrationStep === 1 && (
                <>
                  <div className="p-5 border-b border-green-800/30">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-white">Register for</h3>
                        <p className="text-green-400 text-sm">{selectedSeminar.title}</p>
                      </div>
                      <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-zinc-800 rounded-full">
                        <X className="w-5 h-5 text-zinc-400" />
                      </button>
                    </div>
                  </div>
                  
                  <form onSubmit={handleFormSubmit} className="p-5">
                    <div className="space-y-4">
                      {/* Row 1: First Name & Last Name */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">First Name *</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className={`w-full px-3 py-2 bg-zinc-900/50 border rounded-lg text-white text-sm ${
                              formErrors.firstName ? 'border-red-500' : 'border-green-800/30'
                            }`}
                          />
                          {formErrors.firstName && <p className="text-red-400 text-xs mt-1">{formErrors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">Last Name *</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className={`w-full px-3 py-2 bg-zinc-900/50 border rounded-lg text-white text-sm ${
                              formErrors.lastName ? 'border-red-500' : 'border-green-800/30'
                            }`}
                          />
                          {formErrors.lastName && <p className="text-red-400 text-xs mt-1">{formErrors.lastName}</p>}
                        </div>
                      </div>

                      {/* Row 2: Address & Phone */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">Address (City/Province) *</label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            className={`w-full px-3 py-2 bg-zinc-900/50 border rounded-lg text-white text-sm ${
                              formErrors.address ? 'border-red-500' : 'border-green-800/30'
                            }`}
                          />
                          {formErrors.address && <p className="text-red-400 text-xs mt-1">{formErrors.address}</p>}
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="09XXXXXXXXX"
                            className={`w-full px-3 py-2 bg-zinc-900/50 border rounded-lg text-white text-sm ${
                              formErrors.phone ? 'border-red-500' : 'border-green-800/30'
                            }`}
                          />
                          {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
                        </div>
                      </div>

                      {/* Row 3: Participants & Total Fee */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">Number of Participants *</label>
                          <input
                            type="number"
                            min="1"
                            value={formData.participants}
                            onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value) || 1})}
                            className={`w-full px-3 py-2 bg-zinc-900/50 border rounded-lg text-white text-sm ${
                              formErrors.participants ? 'border-red-500' : 'border-green-800/30'
                            }`}
                          />
                          {formErrors.participants && <p className="text-red-400 text-xs mt-1">{formErrors.participants}</p>}
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">Total Fee</label>
                          <div className="px-3 py-2 bg-zinc-800 border border-green-800/30 rounded-lg text-white text-sm font-bold">
                            {selectedSeminar.fee === 'Free' ? 'Free' : `₱${getTotalFee()}`}
                          </div>
                        </div>
                      </div>

                      {selectedSeminar.fee !== 'Free' && (
                        <p className="text-xs text-zinc-400">Fee per participant: {selectedSeminar.fee}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg mt-4"
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
                    <p className="text-zinc-400 text-xs">
                      Fee: {selectedSeminar.fee} {selectedSeminar.fee !== 'Free' && `(Total: ₱${getTotalFee()})`}
                    </p>
                  </div>
                  
                  <div className="p-5 space-y-3">
                    {selectedSeminar.fee !== 'Free' && (
                      <>
                        <button
                          onClick={() => handlePaymentSubmit('gcash')}
                          className="w-full p-4 bg-blue-600/20 border border-blue-800/30 rounded-xl hover:bg-blue-600/30 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">GCash</span>
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
                              <span className="text-white font-bold text-xs">Maya</span>
                            </div>
                            <div className="text-left">
                              <p className="font-bold">Pay via PayMaya</p>
                              <p className="text-xs text-zinc-400">Available now</p>
                            </div>
                          </div>
                        </button>
                      </>
                    )}
                    
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
                    
                    <p className="text-xs text-zinc-500 text-center mt-4">
                      For online payments, registration is confirmed after we verify your payment. 
                      You will receive your unique code via Messenger/email.
                    </p>
                  </div>
                </>
              )}

              {/* STEP 3: Success */}
              {registrationStep === 3 && (
                <div className="p-6 text-center animate-fade-in">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Registration Submitted!</h3>
                  
                  <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-5 mb-4">
                    <p className="text-sm text-green-400 mb-2">Your Registration Code</p>
                    <p className="text-3xl font-mono font-bold text-white tracking-wider bg-black/30 p-3 rounded-lg">
                      {registrationCode}
                    </p>
                    <div className="mt-3 text-left text-sm text-zinc-300 space-y-1">
                      <p><span className="text-zinc-500">Name:</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="text-zinc-500">Seminar:</span> {selectedSeminar.title}</p>
                      <p><span className="text-zinc-500">Date:</span> {selectedSeminar.schedule}</p>
                      <p><span className="text-zinc-500">Payment:</span> {formData.paymentMethod === 'walkin' ? 'Walk-in' : 'Online (pending verification)'}</p>
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 text-sm mb-4">
                    {formData.paymentMethod === 'walkin' 
                      ? 'Please visit our office on the seminar date. Take a note of this code and a valid ID.'
                      : 'Please complete your GCash/Maya payment and send the receipt to our Facebook page. We will verify and confirm your registration.'}
                  </p>
                  
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => window.print()} className="px-4 py-2 bg-zinc-800 rounded-lg text-sm">Save/Print</button>
                    <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-green-600 rounded-lg text-sm">Done</button>
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
                <div className="w-48 h-48 mx-auto bg-gray-200 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-700" />
                </div>
              </div>
              
              <p className="text-center mb-2 font-bold text-lg">0956 573 7821</p>
              <p className="text-center text-sm text-zinc-400 mb-4">J******E P.</p>
              
              <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-400 font-bold">Amount to pay: ₱{getTotalFee()}</p>
              </div>
              
              <p className="text-xs text-zinc-500 mb-4">
                1. Open GCash<br/>
                2. Scan QR or enter number<br/>
                3. Send exact amount<br/>
                4. Take screenshot of receipt<br/>
                5. Send receipt to our Facebook page<br/>
                We'll verify and send your registration code.
              </p>
              
              <button onClick={confirmPayment} className="w-full bg-green-600 py-3 rounded-lg font-bold">
                I've Sent Payment
              </button>
            </div>
          </div>
        )}

      </div>

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