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

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTeam = (team: string) => {
    setExpandedTeam(expandedTeam === team ? null : team)
  }

  // Organizational structure data – updated to three departments
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
        name: 'Juvelyn Quirog',
        position: 'Branch Manager / Speaker',
        department: 'Operations',
        email: 'juvelynquirog@clpgreenventure.com',
        phone: '(032) 123-4568',
        responsibilities: ['Plantation Management', 'Training Coordination', 'Client Relations'],
        years: '12+ years',
        image: '/images/org/coo.jpg'
      },
      {
        id: 3,
        name: 'Jesaline Patigue',
        position: 'Chief Operating Officer',
        department: 'Operations',
        email: 'jesalinepatigue@clpgreenventure.com',
        phone: '(032) 123-4569',
        responsibilities: ['Financial Planning', 'Budget Management', 'Investment Analysis'],
        years: '5+ years',
        image: '/images/org/cfo.jpg'
      }
    ],
    graphicDesigners: [
      {
        id: 4,
        name: 'Frenchei Banzon',
        position: 'Social Media Designer (Intern)',
        department: 'Visual & Graphic Design',
        email: 'N/A',
        phone: 'N/A',
        responsibilities: ['Social media graphics', 'Content creation', 'Brand consistency'],
        years: '1 year (Intern)',
        image: '/images/org/sales-director.jpg'
      },
      {
        id: 5,
        name: 'Gil Born',
        position: 'Graphic Designer (Intern)',
        department: 'Visual & Graphic Design',
        email: 'N/A',
        phone: 'N/A',
        responsibilities: ['Marketing materials', 'Digital assets', 'Event collaterals'],
        years: '1 year (Intern)',
        image: '/images/org/marketing-manager.jpg'
      },
      {
        id: 6,
        name: 'Donnabelle Balatucan',
        position: 'Graphic Designer (Intern)',
        department: 'Visual & Graphic Design',
        email: 'N/A',
        phone: 'N/A',
        responsibilities: ['Client presentations', 'Visual identity', 'Print designs'],
        years: '1 year (Intern)',
        image: '/images/org/client-relations.jpg'
      }
    ],
    innovation: [
      {
        id: 7,
        name: 'Dr. Jimmy Salar',
        position: 'Scientist / Agriculturist',
        department: 'Research & Innovation',
        email: 'jimmy.salar@clpgreenventure.com',
        phone: '(032) 123-4580',
        responsibilities: ['Agarwood research', 'Chemical analysis', 'Forest management'],
        years: '20+ years',
        image: '/images/org/research-director.jpg'
      },
      {
        id: 8,
        name: 'Jeric Baynosa',
        position: 'System Analyst',
        department: 'IT & Development',
        email: 'jeric.baynosa@clpgreenventure.com',
        phone: '(032) 123-4576',
        responsibilities: ['System architecture', 'Software development', 'Technical research'],
        years: '2+ years',
        image: '/images/org/research-director.jpg'
      },
      {
        id: 9,
        name: 'Jayme Pacquiao',
        position: 'UI/UX Designer',
        department: 'IT & Development',
        email: 'jayme.pacquiao@clpgreenventure.com',
        phone: '(032) 123-4577',
        responsibilities: ['User interface design', 'User experience research', 'Prototyping'],
        years: '2+ years',
        image: '/images/org/agronomist.jpg'
      },
      {
        id: 10,
        name: 'Leonard Chloie Sagarino',
        position: 'Backend Developer',
        department: 'IT & Development',
        email: 'leonard.sagarino@clpgreenventure.com',
        phone: '(032) 123-4578',
        responsibilities: ['Fullstack development', 'Website maintenance', 'Performance optimization'],
        years: '2+ years',
        image: '/images/org/product-dev.jpg'
      },
      {
        id: 11,
        name: 'John Mark Abastillas',
        position: 'Frontend Developer',
        department: 'IT & Development',
        email: 'johnmarkabastillasn@gmail.com',
        phone: '(032) 123-4578',
        responsibilities: ['Frontend development', 'Website maintenance', 'Performance optimization'],
        years: '2+ years',
        image: '/images/org/product-dev.jpg'
      },
      {
        id: 12,
        name: 'John Mark Gill Paghubasan',
        position: 'Fullstack Developer',
        department: 'IT & Development',
        email: 'jmgillpaghubasan@gmail.com',
        phone: '(032) 123-4578',
        responsibilities: ['Backend development', 'Website maintenance', 'Performance optimization'],
        years: '2+ years',
        image: '/images/org/product-dev.jpg'
      }
    ]
  }

  const departments = [
    { id: 'leadership', name: 'Executive Leadership', count: 3, icon: <Award className="w-5 h-5" /> },
    { id: 'graphicDesigners', name: 'Visual & Graphic Design', count: 3, icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'innovation', name: 'Innovation & Technology', count: 6, icon: <Building className="w-5 h-5" /> }
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
              { value: '10+', label: 'Team Members' },
              { value: '3', label: 'Departments' },
              { value: '8+', label: 'Avg. Experience' },
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

        {/* ORGANIZATIONAL CHART VISUAL (unchanged) */}
        {/* ... keep the same ... */}

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
                              {member.responsibilities.map((resp, i) => (
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

        {/* VISION & MISSION (replaces Guiding Principles) */}
        <div 
          ref={(el) => { sectionRefs.current[3] = el }}
          data-section-index="3"
          className={`bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[3rem] p-8 md:p-12 mb-16 transition-all duration-1000 ease-out transform ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl font-bold text-center mb-10">Vision & Mission</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div 
              className="text-center p-6 transition-all duration-500 hover:scale-105"
              style={{ 
                opacity: visibleSections.has(3) ? 1 : 0,
                transform: visibleSections.has(3) ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-green-500" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-green-400">Our Vision</h4>
              <p className="text-zinc-300 leading-relaxed text-lg">
                “To become the leading catalyst of sustainable agriculture in the Philippines, empowering every planter—small or large—to achieve long-term prosperity while protecting the environment for future generations.”
              </p>
            </div>

            {/* Mission */}
            <div 
              className="text-center p-6 transition-all duration-500 hover:scale-105"
              style={{ 
                transitionDelay: '200ms',
                opacity: visibleSections.has(3) ? 1 : 0,
                transform: visibleSections.has(3) ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-green-500" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-green-400">Our Mission</h4>
              <p className="text-zinc-300 leading-relaxed text-lg">
                “CLP GREEN VENTURE INC. is committed to promoting eco-friendly and innovative farming solutions, creating fair and scalable income opportunities for planters, and fostering a community built on sustainability, responsible growth, and shared success.”
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT TEAM CTA (unchanged) */}
        {/* ... keep the same ... */}

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