import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./about/page"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section id="home">
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>
      
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Product images will go here...
          </p>
        </div>
      </section>
      
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          {/* Contact buttons here */}
        </div>
      </section>
    </div>
  )
}