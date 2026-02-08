import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./about/page"
import Products from "./products/page"
import Seminars from "./seminars/page"
import Gallery from "./gallery/page"

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
      
      <section id="products">
        <Products />
      </section>

      <section id="seminars">
        <Seminars />
      </section>

      <section id="gallery">
        <Gallery />
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