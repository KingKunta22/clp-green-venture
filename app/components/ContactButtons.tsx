import { MessageCircle, Phone, Mail, Facebook } from 'lucide-react'

export default function ContactButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Facebook Messenger */}
      <a 
        href="https://m.me/CLPagarwood"
        target="_blank"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        <MessageCircle size={18} />
        Message Us
      </a>
      
      {/* Call Us */}
      <a 
        href="tel:+639123456789"
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        <Phone size={18} />
        Call Now
      </a>
      
      {/* Email */}
      <a 
        href="mailto:info@clpagarwood.com"
        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
      >
        <Mail size={18} />
        Email
      </a>
    </div>
  )
}