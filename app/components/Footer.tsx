'use client'

import { Mail, Facebook, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0e09] text-white py-8 sm:py-12 border-t border-green-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CONTACT INFORMATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* EMAIL */}
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-green-800/30">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Email Us</h3>
            <a 
              href="mailto:clpagarwoods@gmail.com"
              className="text-green-400 hover:text-green-300 transition-colors text-sm sm:text-base break-all"
            >
              clpagarwoods@gmail.com
            </a>
          </div>
          
          {/* FACEBOOK */}
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-green-800/30">
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Follow Us</h3>
            <a 
              href="https://web.facebook.com/profile.php?id=61586268879623"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors text-sm sm:text-base"
            >
              Agarwood by CLP
            </a>
          </div>
          
          {/* PHONE */}
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-green-800/30">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Phone</h3>
            <p className="text-green-400 hover:text-green-300 transition-colors text-sm sm:text-base">0916 512 0219</p>
          </div>
          
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-green-800/30 pt-6 sm:pt-8 text-center">
          <p className="text-zinc-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} CLP Green Venture Inc. All rights reserved.
          </p>
          <p className="text-zinc-600 text-[10px] sm:text-xs mt-1 sm:mt-2">
            Sustainable Agarwood Cultivation & Investment
          </p>
        </div>

      </div>
    </footer>
  )
}