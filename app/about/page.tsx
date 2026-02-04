import Image from 'next/image'

export default function About() {
  return (
    <section className="-mt-12 relative z-10 bg-[#060b05] rounded-t-[3rem] px-6 py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. THE VISIONARY LEADERSHIP */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
          <div>
            <span className="text-green-500 font-mono tracking-widest uppercase text-sm">Founded in Cebu</span>
            <h2 className="text-5xl font-extrabold mt-4 leading-tight">
              The CLP <span className="text-green-600">Green</span> Revolution
            </h2>
            <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
              Under the leadership of CEO <span className="text-white font-semibold">Charlie Patigue</span>, 
              CLP Green Ventures has evolved from a foundation in direct selling into the 
              Philippines' premier Agarwood authority. Based in the heart of <span className="text-white">Cebu</span>, 
              we aren't just planting trees; we are securing the future of Filipino agriculture.
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-green-900/30 p-8 rounded-3xl mt-4">
            <h3 className="text-green-500 font-bold uppercase tracking-tighter text-xs mb-4">Leadership & Education</h3>
            <p className="text-zinc-300 leading-relaxed italic">
              "We don't just sell an opportunity; we provide the mastery required to sustain it."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center font-bold text-white">JQ</div>
              <div>
                <p className="text-white font-bold leading-none">Juvelyn Quirog</p>
                <p className="text-zinc-500 text-xs mt-1 uppercase">General Manager & Lead Speaker</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FOR AGENTS & INVESTORS (The "Convincing" Block) */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="col-span-full mb-4">
            <h3 className="text-2xl font-bold">Why Partner with CLP?</h3>
            <p className="text-zinc-500">The most sustainable high-yield asset in the Philippines today.</p>
          </div>
          
          <div className="p-8 bg-zinc-900/80 border-l-4 border-green-600 rounded-r-2xl">
            <h4 className="text-white font-bold text-xl mb-3">Expert Seminars</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Led by <span className="text-green-500">Juvelyn Quirog</span>, our comprehensive training ensures every 
              agent and investor understands the science of inoculation and market valuation.
            </p>
          </div>

          <div className="p-8 bg-zinc-900/80 border-l-4 border-green-600 rounded-r-2xl">
            <h4 className="text-white font-bold text-xl mb-3">Proven Network</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              With established branches in <span className="text-white font-medium">Dumaguete, Negros</span>, 
              and across the archipelago, our logistics and support system are unmatched.
            </p>
          </div>

          <div className="p-8 bg-zinc-900/80 border-l-4 border-green-600 rounded-r-2xl">
            <h4 className="text-white font-bold text-xl mb-3">Direct Plantation</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We own and manage the land. Investors aren't buying promises; they are 
              partnering with a company that has skin in the game.
            </p>
          </div>
        </div>

        {/* 3. THE CALL TO ACTION (The "Closer") */}
        <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/20 rounded-[3rem] p-12 text-center">
          <h3 className="text-3xl font-bold mb-6 text-pretty">Ready to cultivate your own legacy?</h3>
          <p className="max-w-2xl mx-auto text-zinc-400 mb-8">
            Whether you are a seasoned investor or a new agent, our Cebu headquarters 
            is ready to guide you. Join the thousands of Filipinos profiting from 
            the world's most valuable "Green Gold."
          </p>
          <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-green-900/20">
            Book a Seminar with Juvelyn
          </button>
        </div>

      </div>
    </section>
  )
}
