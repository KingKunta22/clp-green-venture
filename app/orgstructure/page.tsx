'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Users, Building, ChevronDown, ChevronRight, Phone, Mail, MapPin, User, Award, Target, Users as UsersIcon } from 'lucide-react'

export default function OrgStructure() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [expandedTeam, setExpandedTeam] = useState<string | null>('leadership')
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Intersection Observer for scroll animations
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

  const toggleTeam = (team: string) => {
    setExpandedTeam(expandedTeam === team ? null : team)
  }

  // Organizational structure data
  const orgStructure = {
    leadership: [
      {
        id: 1,
        name: 'Charlie L. Patigue',
        position: 'Chief Executive Officer',
        department: 'Executive Office',
        email: 'charlie.patigue@clpgreenventure.com',
        phone: '(032) 123-4567',
        responsibilities: ['Overall Company Strategy', 'Investor Relations', 'Business Development'],
        years: '15+ years',
        image: '/images/sircharlie2.jpg'
      },
      {
        id: 2,
        name: 'Maria Santos',
        position: 'Chief Operations Officer',
        department: 'Operations',
        email: 'maria.santos@clpgreenventure.com',
        phone: '(032) 123-4568',
        responsibilities: ['Plantation Management', 'Production Operations', 'Quality Control'],
        years: '12+ years',
        image: '/images/org/coo.jpg'
      },
      {
        id: 3,
        name: 'Robert Lim',
        position: 'Chief Financial Officer',
        department: 'Finance',
        email: 'robert.lim@clpgreenventure.com',
        phone: '(032) 123-4569',
        responsibilities: ['Financial Planning', 'Budget Management', 'Investment Analysis'],
        years: '10+ years',
        image: '/images/org/cfo.jpg'
      }
    ],
    operations: [
      {
        id: 4,
        name: 'Juvelyn Quirog',
        position: 'Operations Manager',
        department: 'Plantation Operations',
        email: 'juvelyn.quirog@clpgreenventure.com',
        phone: '(032) 123-4570',
        responsibilities: ['Field Operations', 'Training Coordination', 'Client Relations'],
        years: '8+ years',
        image: '/images/org/ops-manager.jpg'
      },
      {
        id: 5,
        name: 'Michael Tan',
        position: 'Plantation Supervisor',
        department: 'Field Operations',
        email: 'michael.tan@clpgreenventure.com',
        phone: '(032) 123-4571',
        responsibilities: ['Daily Operations', 'Team Supervision', 'Quality Assurance'],
        years: '6+ years',
        image: '/images/org/plantation-supervisor.jpg'
      },
      {
        id: 6,
        name: 'Sarah Gomez',
        position: 'Quality Control Manager',
        department: 'Quality Assurance',
        email: 'sarah.gomez@clpgreenventure.com',
        phone: '(032) 123-4572',
        responsibilities: ['Product Testing', 'Standards Compliance', 'Documentation'],
        years: '7+ years',
        image: '/images/org/quality-manager.jpg'
      }
    ],
    salesMarketing: [
      {
        id: 7,
        name: 'James Wilson',
        position: 'Sales Director',
        department: 'Sales & Marketing',
        email: 'james.wilson@clpgreenventure.com',
        phone: '(032) 123-4573',
        responsibilities: ['Sales Strategy', 'Client Acquisition', 'Market Expansion'],
        years: '9+ years',
        image: '/images/org/sales-director.jpg'
      },
      {
        id: 8,
        name: 'Andrea Cruz',
        position: 'Marketing Manager',
        department: 'Marketing',
        email: 'andrea.cruz@clpgreenventure.com',
        phone: '(032) 123-4574',
        responsibilities: ['Brand Management', 'Digital Marketing', 'Event Coordination'],
        years: '5+ years',
        image: '/images/org/marketing-manager.jpg'
      },
      {
        id: 9,
        name: 'David Chen',
        position: 'Client Relations Manager',
        department: 'Customer Success',
        email: 'david.chen@clpgreenventure.com',
        phone: '(032) 123-4575',
        responsibilities: ['Client Support', 'Account Management', 'Feedback Collection'],
        years: '4+ years',
        image: '/images/org/client-relations.jpg'
      }
    ],
    researchDevelopment: [
      {
        id: 10,
        name: 'Dr. Elena Rodriguez',
        position: 'Research Director',
        department: 'R&D',
        email: 'elena.rodriguez@clpgreenventure.com',
        phone: '(032) 123-4576',
        responsibilities: ['Research Projects', 'Innovation Development', 'Technical Studies'],
        years: '11+ years',
        image: '/images/org/research-director.jpg'
      },
      {
        id: 11,
        name: 'Peter Lee',
        position: 'Agronomist',
        department: 'Agricultural Research',
        email: 'peter.lee@clpgreenventure.com',
        phone: '(032) 123-4577',
        responsibilities: ['Crop Research', 'Soil Analysis', 'Sustainable Practices'],
        years: '8+ years',
        image: '/images/org/agronomist.jpg'
      },
      {
        id: 12,
        name: 'Lisa Martinez',
        position: 'Product Development Specialist',
        department: 'Product Innovation',
        email: 'lisa.martinez@clpgreenventure.com',
        phone: '(032) 123-4578',
        responsibilities: ['New Product Design', 'Testing Protocols', 'Market Research'],
        years: '5+ years',
        image: '/images/org/product-dev.jpg'
      }
    ]
  }

  const departments = [
    { id: 'leadership', name: 'Executive Leadership', count: 3, icon: <Award className="w-5 h-5" /> },
    { id: 'operations', name: 'Operations & Production', count: 3, icon: <Target className="w-5 h-5" /> },
    { id: 'salesMarketing', name: 'Sales & Marketing', count: 3, icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'researchDevelopment', name: 'Research & Development', count: 3, icon: <Building className="w-5 h-5" /> }
  ]

  return (
    <section className="-mt-4 relative z-10 bg-[#060b05] rounded-t-[3rem] px-6 py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div 
          ref={(el) => { sectionRefs.current[0] = el }}
          data-section-index="0"
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-green-500 font-mono tracking-widest uppercase text-sm block mb-4">Our Team</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Organizational <span className="text-green-600">Structure</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Meet the dedicated professionals driving CLP GREEN VENTURE INC. forward. Our team combines expertise in agriculture, business, and sustainable development to deliver excellence in agarwood cultivation.
          </p>
          
          {/* TEAM STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { value: '50+', label: 'Team Members' },
              { value: '5', label: 'Departments' },
              { value: '15+', label: 'Avg. Experience' },
              { value: '100%', label: 'Dedicated' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-green-900/20 rounded-xl transition-all duration-500 hover:scale-105 hover:bg-green-900/30"
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  opacity: visibleSections.has(0) ? 1 : 0,
                  transform: visibleSections.has(0) ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="text-3xl font-bold text-green-500 mb-1">{stat.value}</div>
                <div className="text-zinc-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ORGANIZATIONAL CHART VISUAL */}
        <div 
          ref={(el) => { sectionRefs.current[1] = el }}
          data-section-index="1"
          className={`mb-16 transition-all duration-1000 ease-out transform ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-10">Company Hierarchy</h2>
          
          {/* SIMPLE HIERARCHY VISUAL */}
          <div className="relative">
            {/* CEO LEVEL */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="bg-gradient-to-r from-green-700 to-green-800 p-6 rounded-2xl border border-green-600/30 max-w-md mx-auto text-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-900/20">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500/30">
                    <div className="w-full h-full bg-green-900/50 flex items-center justify-center">
                      <User className="w-10 h-10 text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Charlie L. Patigue</h3>
                  <p className="text-green-400 text-sm">Chief Executive Officer</p>
                  <p className="text-zinc-400 text-xs mt-2">Founder & Visionary Leader</p>
                </div>
                
                {/* CONNECTOR LINES */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-12 w-0.5 bg-gradient-to-b from-green-500 to-transparent"></div>
              </div>
            </div>

            {/* SECOND LEVEL (COO, CFO) */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {orgStructure.leadership.slice(1).map((exec, index) => (
                <div key={exec.id} className="relative">
                  <div className="bg-gradient-to-r from-green-800/50 to-green-900/30 p-5 rounded-xl border border-green-700/20 text-center transition-all duration-500 hover:scale-105 hover:border-green-600/40">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-green-500/20">
                      <div className="w-full h-full bg-green-900/30 flex items-center justify-center">
                        <Users className="w-8 h-8 text-green-400" />
                      </div>
                    </div>
                    <h4 className="font-bold">{exec.name}</h4>
                    <p className="text-green-400 text-xs">{exec.position}</p>
                    
                    {/* CONNECTOR TO THIRD LEVEL */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-8 w-0.5 bg-gradient-to-b from-green-500/50 to-transparent"></div>
                  </div>
                  
                  {/* CONNECTOR TO CEO */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-0.5 bg-gradient-to-t from-green-500 to-transparent"></div>
                </div>
              ))}
            </div>

            {/* THIRD LEVEL (DEPARTMENT HEADS) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {departments.map((dept, index) => (
                <div key={dept.id} className="text-center">
                  <div className="bg-gradient-to-r from-green-900/20 to-zinc-900/30 p-4 rounded-lg border border-green-800/20 transition-all duration-500 hover:border-green-600/30 hover:scale-105">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-900/30 flex items-center justify-center">
                      <div className="text-green-400">
                        {dept.icon}
                      </div>
                    </div>
                    <h5 className="font-bold text-sm mb-1">{dept.name}</h5>
                    <p className="text-zinc-400 text-xs">{dept.count} members</p>
                  </div>
                  
                  {/* CONNECTOR TO SECOND LEVEL */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-8 w-0.5 bg-gradient-to-t from-green-500/30 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DEPARTMENT TEAMS */}
        <div 
          ref={(el) => { sectionRefs.current[2] = el }}
          data-section-index="2"
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10">Meet Our Teams</h2>
          
          <div className="space-y-8">
            {departments.map((dept, deptIndex) => (
              <div 
                key={dept.id}
                className={`bg-gradient-to-r from-green-900/10 to-zinc-900/20 border border-green-800/20 rounded-2xl overflow-hidden transition-all duration-500 ${
                  visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${deptIndex * 200}ms` }}
              >
                {/* DEPARTMENT HEADER */}
                <button
                  onClick={() => toggleTeam(dept.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-green-900/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-900/30 flex items-center justify-center">
                      <div className="text-green-400">
                        {dept.icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{dept.name}</h3>
                      <p className="text-zinc-400 text-sm">{dept.count} team members</p>
                    </div>
                  </div>
                  <div className="text-green-400">
                    {expandedTeam === dept.id ? (
                      <ChevronDown className="w-6 h-6 transition-transform duration-300" />
                    ) : (
                      <ChevronRight className="w-6 h-6 transition-transform duration-300" />
                    )}
                  </div>
                </button>
                
                {/* TEAM MEMBERS */}
                {expandedTeam === dept.id && (
                  <div className="p-6 border-t border-green-800/20 animate-fade-in">
                    <div className="grid md:grid-cols-3 gap-6">
                      {orgStructure[dept.id as keyof typeof orgStructure].map((member, memberIndex) => (
                        <div 
                          key={member.id}
                          className="bg-zinc-900/30 border border-green-800/20 rounded-xl p-5 transition-all duration-500 hover:border-green-600/30 hover:scale-[1.02]"
                          style={{ 
                            animation: 'fadeInUp 0.5s ease-out forwards',
                            animationDelay: `${memberIndex * 100}ms`,
                            opacity: 0
                          }}
                        >
                          {/* MEMBER HEADER */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-green-900/30 flex-shrink-0">
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-8 h-8 text-green-400" />
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-bold text-lg">{member.name}</h4>
                              <p className="text-green-400 text-sm">{member.position}</p>
                              <p className="text-zinc-400 text-xs mt-1">{member.department}</p>
                            </div>
                          </div>
                          
                          {/* CONTACT INFO */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-green-500" />
                              <span className="text-zinc-300 truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-green-500" />
                              <span className="text-zinc-300">{member.phone}</span>
                            </div>
                          </div>
                          
                          {/* RESPONSIBILITIES */}
                          <div className="mb-4">
                            <p className="text-green-400 text-sm font-medium mb-2">Key Responsibilities:</p>
                            <ul className="space-y-1">
                              {member.responsibilities.slice(0, 2).map((resp, i) => (
                                <li key={i} className="text-zinc-400 text-xs flex items-start gap-1">
                                  <span className="text-green-500 mt-1">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* EXPERIENCE */}
                          <div className="flex justify-between items-center pt-4 border-t border-green-800/20">
                            <span className="text-green-400 text-sm font-medium">Experience:</span>
                            <span className="text-white font-bold">{member.years}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY VALUES */}
        <div 
          ref={(el) => { sectionRefs.current[3] = el }}
          data-section-index="3"
          className={`bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[3rem] p-8 md:p-12 mb-16 transition-all duration-1000 ease-out transform ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl font-bold text-center mb-10">Our Guiding Principles</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expertise & Excellence',
                description: 'Our team combines decades of experience in agarwood cultivation with continuous learning and improvement.',
                icon: <Award className="w-8 h-8" />
              },
              {
                title: 'Collaboration & Teamwork',
                description: 'We believe in the power of teamwork across departments to achieve our shared vision of sustainable agarwood farming.',
                icon: <Users className="w-8 h-8" />
              },
              {
                title: 'Innovation & Growth',
                description: 'Continuous research and development drive our commitment to improving cultivation techniques and product quality.',
                icon: <Target className="w-8 h-8" />
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="text-center p-6 transition-all duration-500 hover:scale-105"
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  opacity: visibleSections.has(3) ? 1 : 0,
                  transform: visibleSections.has(3) ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-green-500">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-zinc-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT TEAM CTA */}
        <div 
          ref={(el) => { sectionRefs.current[4] = el }}
          data-section-index="4"
          className={`text-center transition-all duration-1000 ease-out transform ${
            visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl font-bold mb-6">Connect With Our Team</h3>
          <p className="max-w-2xl mx-auto text-zinc-400 mb-8 text-lg leading-relaxed">
            Have questions about our agarwood operations or want to speak with a specific department? Our team is ready to assist you.
          </p>
          
          <div className="bg-gradient-to-r from-green-900/20 to-zinc-900/20 border border-green-800/30 rounded-2xl p-8 max-w-3xl mx-auto mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-green-400 font-medium mb-4">General Inquiries</p>
                <div className="space-y-3">
                  <p className="text-white flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    09165120219
                  </p>
                  <p className="text-white flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    contact@clpgreenventure.com
                  </p>
                </div>
              </div>
              <div>
                <p className="text-green-400 font-medium mb-4">Office Location</p>
                <p className="text-white flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Ground Floor, Unit 09, City Suites, F. Ramos St., Cebu City
                </p>
              </div>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/20 hover:shadow-green-900/40">
            Contact Our Team
          </button>
        </div>

      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  )
}