'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, Clock, MapPin, User, CheckCircle, Mail, Phone, Users, ChevronRight } from 'lucide-react'

export default function Seminars() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    seminarType: 'basic',
    participants: 1,
    preferredDate: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Hide/show navbar when form is open
  useEffect(() => {
    const navbar = document.querySelector('nav')
    if (navbar) {
      if (showForm) {
        navbar.style.display = 'none'
        document.body.style.overflow = 'hidden'
      } else {
        navbar.style.display = 'flex'
        document.body.style.overflow = 'auto'
      }
    }
    
    // Cleanup: Ensure navbar is visible when component unmounts
    return () => {
      const navbar = document.querySelector('nav')
      if (navbar) {
        navbar.style.display = 'flex'
      }
      document.body.style.overflow = 'auto'
    }
  }, [showForm])

  const seminars = [
    {
      id: 1,
      title: "Basic Agarwood Cultivation",
      description: "Learn the fundamentals of agarwood planting, care, and basic inoculation techniques. Perfect for beginners.",
      schedule: "Every Monday & Friday • 3:00 PM - 6:00 PM",
      duration: "3 hours",
      instructor: "Juvelyn Quirog - Manager",
      level: "Beginner",
      color: "from-green-600 to-emerald-700"
    },
    {
      id: 2,
      title: "Advanced Inoculation Techniques",
      description: "Master advanced methods for maximizing agarwood resin production and quality control.",
      schedule: "Every Tuesday & Saturday • 3:00 PM - 6:00 PM",
      duration: "3 hours",
      instructor: "Charlie L. Patigue - CEO",
      level: "Advanced",
      color: "from-green-700 to-emerald-800"
    },
    {
      id: 3,
      title: "Business & Investment in Agarwood",
      description: "Learn how to build a sustainable agarwood business, from plantation to market.",
      schedule: "Every Wednesday & Thursday • 3:00 PM - 6:00 PM",
      duration: "3 hours",
      instructor: "Juvelyn Quirog & Charlie L. Patigue",
      level: "All Levels",
      color: "from-green-800 to-emerald-900"
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setShowForm(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        seminarType: 'basic',
        participants: 1,
        preferredDate: '',
        message: ''
      })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value) || 1 : value
    }))
  }

  // Close form on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showForm) setShowForm(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [showForm])

  return (
    <section id="seminars" className="relative z-10 bg-[#060b05] px-6 py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-green-500 font-mono tracking-widest uppercase text-sm block mb-4">Expert Training</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            CLP <span className="text-green-600">Agarwood</span> Seminars
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your knowledge of agarwood cultivation with our expert-led seminars. 
            Join hundreds of successful planters who started their journey with CLP.
          </p>
          
          {/* CONTACT INFO */}
          <div className="bg-zinc-900/50 border border-green-800/30 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-green-400 text-sm mb-3">Contact Information</p>
                <div className="space-y-3">
                  <p className="text-white font-medium flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    09165120219
                  </p>
                  <p className="text-white font-medium flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    clpgreenventures@gmail.com
                  </p>
                </div>
              </div>
              <div>
                <p className="text-green-400 text-sm mb-3">Office Location</p>
                <p className="text-white font-medium flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Ground Floor, Unit 09, City Suites, F. Ramos St., Cebu City, 6000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEMINARS GRID */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {seminars.map((seminar) => (
            <div 
              key={seminar.id}
              className="bg-zinc-900/30 border border-green-800/20 rounded-2xl overflow-hidden hover:border-green-600/30 transition-all duration-300 hover:translate-y-[-5px] group"
            >
              {/* SEMINAR HEADER */}
              <div className={`bg-gradient-to-r ${seminar.color} p-6`}>
                <h3 className="text-2xl font-bold mb-2">{seminar.title}</h3>
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {seminar.level}
                </span>
              </div>
              
              {/* SEMINAR DETAILS */}
              <div className="p-6">
                <p className="text-zinc-400 mb-6 leading-relaxed">{seminar.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{seminar.schedule}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white">
                    <Clock className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium">Duration: {seminar.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white">
                    <User className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium">Instructor: {seminar.instructor}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setFormData(prev => ({...prev, seminarType: seminar.id.toString()}))
                    setShowForm(true)
                  }}
                  className="w-full mt-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group-hover:shadow-lg group-hover:shadow-green-900/20"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BECOME A PLANTER CTA */}
        <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[3rem] p-8 md:p-12 text-center mb-16">
          <h3 className="text-3xl font-bold mb-6">Start Your Agarwood Journey Today</h3>
          <p className="max-w-2xl mx-auto text-zinc-400 mb-8 text-lg leading-relaxed">
            Sign up for our seminars and start your journey in sustainable agarwood farming. 
            Limited slots available for each session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/20 hover:shadow-green-900/40"
            >
              Sign Up for Seminars
            </button>
            <a
              href="https://zoom.us/j/your-zoom-id-here"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 border border-green-800/30 hover:border-green-600/50"
            >
              Join Zoom Session
            </a>
          </div>
          <p className="text-zinc-500 text-sm mt-8">
            Can't attend in person? Join our virtual seminars via Zoom!
          </p>
        </div>

        {/* REGISTRATION FORM MODAL */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* BACKDROP */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            
            {/* MODAL */}
            <div className="relative bg-[#0f130e] border border-green-800/30 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* HEADER */}
              <div className="sticky top-0 bg-[#0f130e] border-b border-green-800/30 p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white">Register for Seminar</h3>
                  <p className="text-zinc-400 text-sm mt-1">Fill out the form below to reserve your slot</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>
              
              {/* SUCCESS MESSAGE */}
              {isSubmitted ? (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-700/30">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">Registration Successful!</h4>
                  <p className="text-zinc-400 mb-6">
                    Thank you for registering. Our team will contact you within 24 hours to confirm your slot.
                  </p>
                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-white placeholder:text-zinc-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-white placeholder:text-zinc-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-white placeholder:text-zinc-500"
                          placeholder="09165120219"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Number of Participants *
                        </label>
                        <input
                          type="number"
                          name="participants"
                          value={formData.participants}
                          onChange={handleInputChange}
                          min="1"
                          max="10"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Select Seminar *
                      </label>
                      <select
                        name="seminarType"
                        value={formData.seminarType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-white"
                      >
                        <option value="basic">Basic Agarwood Cultivation (Mon & Fri, 3-6PM)</option>
                        <option value="advanced">Advanced Inoculation Techniques (Tue & Sat, 3-6PM)</option>
                        <option value="business">Business & Investment in Agarwood (Wed & Thu, 3-6PM)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Additional Message (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-white resize-none placeholder:text-zinc-500"
                        placeholder="Any specific questions or requirements..."
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-900/20"
                      >
                        Submit Registration
                      </button>
                      <p className="text-sm text-zinc-500 text-center mt-4">
                        We'll contact you within 24 hours to confirm your registration
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}