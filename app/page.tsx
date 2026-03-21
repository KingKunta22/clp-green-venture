import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./about/page"
import Products from "./products/page"
import { getSeminars } from "./seminars/actions"
import SeminarsClient from "./seminars/SeminarsClient"
import Gallery from "./gallery/page"
import Orgstructure from "./orgstructure/page"
import Footer from "./components/Footer"

export default async function Home() {
  const seminars = await getSeminars()

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
        <SeminarsClient initialSeminars={seminars} />
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