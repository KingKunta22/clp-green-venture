import Image from 'next/image'

export default function About() {
  return (
    <section className="-mt-12 relative z-10 bg-zinc-900 rounded-t-[3rem] px-6 py-16 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* 1. THE HOOK (Your existing part) */}
        <span className="text-green-500 font-bold tracking-widest uppercase text-sm">Our Story</span>
        <h2 className="text-4xl font-bold text-white mt-2">Cultivating the Future</h2>
        <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
          We started with a simple vision: to make agriculture more sustainable and 
          accessible. Today, we bridge the gap between traditional farming and 
          modern technology to feed the world responsibly.
        </p>

        {/* 2. THE "TWO-COLUMN" MISSION (Visual Split) */}
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div>
            <h3 className="text-xl font-semibold text-white">Our Vision</h3>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              To be the global leader in sustainable agri-solutions, ensuring 
              food security for generations to come through innovation.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Our Core Values</h3>
            <ul className="text-zinc-400 mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
                Integrity in every harvest
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
                Eco-conscious operations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
                Empowering local farmers
              </li>
            </ul>
          </div>
        </div>

        {/* 3. THE "TRUST" SECTION (Quick Stats) */}
        <div className="mt-20 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-white">15+</p>
            <p className="text-zinc-500 text-sm uppercase mt-1">Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">200k</p>
            <p className="text-zinc-500 text-sm uppercase mt-1">Acres Managed</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-3xl font-bold text-white">98%</p>
            <p className="text-zinc-500 text-sm uppercase mt-1">Client Satisfaction</p>
          </div>
        </div>

        {/* 4. OPTIONAL: THE TEAM/FOUNDER QUOTE */}
        <div className="mt-20 p-8 bg-zinc-800/50 rounded-2xl border border-white/5 italic text-zinc-300 text-center">
          "Agriculture is the most healthful, most useful, and most noble employment of man."
          <span className="block not-italic text-sm font-bold text-green-500 mt-4 uppercase tracking-widest">— The Founder</span>
        </div>
      </div>
    </section>
  )
}
