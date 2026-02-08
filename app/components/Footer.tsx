'use client'

import { Mail, Facebook, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0e09] text-white py-12 border-t border-green-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CONTACT INFORMATION */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          
          {/* EMAIL */}
          <div className="text-center">
            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-800/30">
              <Mail className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Email Us</h3>
            <a 
              href="mailto:clpagarwoods@gmail.com"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              clpagarwoods@gmail.com
            </a>
          </div>
          
          {/* FACEBOOK */}
          <div className="text-center">
            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-800/30">
              <Facebook className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <a 
              href="https://web.facebook.com/profile.php?id=61586268879623"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              CLP Green Ventures
            </a>
          </div>
          
          {/* PHONE (N/A) */}
          <div className="text-center">
            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-800/30">
              <Phone className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Phone</h3>
            <p className="text-zinc-400">N/A</p>
          </div>
          
        </div>

        {/* OFFICE LOCATION */}
        <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-2xl p-6 mb-8 text-center">
          <h3 className="text-xl font-bold mb-4">Office Location</h3>
          <p className="text-zinc-300">
            Ground Floor, Unit 09, City Suites<br />
            F. Ramos St., Cebu City, 6000
          </p>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-green-800/30 pt-8 text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} CLP Green Venture Inc. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs mt-2">
            Sustainable Agarwood Cultivation & Investment
          </p>
        </div>

      </div>
    </footer>
  )
}