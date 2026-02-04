import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r grid grid-cols-10 justify-start items-center from-green-50 to-emerald-100 min-h-[calc(100vh-4rem)] overflow-hidden">

      {/* First Section */}
      <div className="mx-auto text-center col-span-6  relative w-full h-full flex flex-col items-center justify-center">
        
        {/* SLANTED RED BORDER */}
        <div className="absolute right-[-120] top-0 h-full w-[1px] bg-green-500 origin-bottom -skew-x-[-15deg] z-20" />

        {/* IMAGE */}
        <div className="absolute bottom-[-4%] left-[-16%] z-1 ">
          <Image
            src="/images/sircharlietransparent.png"
            alt="CLP Logo"
            width={450}
            height={450}
            className="object-cover"
          />
        </div>

        {/* MAIN TITLE */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to
        </h1>
        <h2 className="text-5xl font-bold text-gray-900 mb-12 uppercase tracking-wider">
          <span className="text-[#efb10c]">C</span>LP Green Venture
        </h2>
        
        {/* CALL TO ACTION BUTTON */}
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition">
          Explore Products
        </button>
        
      </div>

      {/* Second Section */}
      <div className="mx-auto px-4 text-center col-span-4">
        
        {/* MAIN TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          THIS WILL BE THE GALLERY SECTION
        </h1>
        
        {/* CALL TO ACTION BUTTON */}
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition">
          View More
        </button>
        
      </div>

    </section>
  )
}