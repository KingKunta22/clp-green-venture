export default function Hero() {
  return (
    <section className="bg-gradient-to-r flex justify-center items-center from-green-50 to-emerald-100 py-16 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* MAIN TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to CLP Green Venture
        </h1>
        
        {/* SUBTITLE */}
        <p className="text-l text-gray-600 mb-8">
          Sustainable Agarwood Cultivation | Expert Plant Care | Long-Term Prosperity
        </p>
        
        {/* CALL TO ACTION BUTTON */}
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition">
          Explore Products
        </button>
        
      </div>
    </section>
  )
}