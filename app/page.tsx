import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./about/page"
import Products from "./products/page"
import Seminars from "./seminars/page"
import Gallery from "./gallery/page"
import Orgstructure from "./orgstructure/page"
import Footer from "./components/Footer"

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

      <section id="orgstructure">
        <Orgstructure />
      </section>
      
      <section id="footer">
        <Footer />
      </section>
    </div>
  )
}