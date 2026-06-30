import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-4">
              <span className="font-serif text-3xl font-light tracking-widest text-cream">AZURI</span>
              <p className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-light mt-1">Luxury Stays</p>
            </div>
            <p className="text-sm font-light leading-relaxed text-cream/50 mt-4">
              Curating extraordinary accommodations across Kenya's most iconic landscapes since 2018.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-gold-400 mb-5 font-light">Explore</h4>
            <ul className="space-y-3">
              {["Accommodations", "Destinations", "Experiences", "Private Events"].map((item) => (
                <li key={item}>
                  <Link to="/accommodations" className="text-sm font-light text-cream/50 hover:text-cream transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-gold-400 mb-5 font-light">Contact</h4>
            <ul className="space-y-3 text-sm font-light text-cream/50">
              <li>+254 713 58 8878</li>
              <li>reservations@langatcollins.co.ke</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/30 tracking-wider">© 2026 Azuri Luxury Stays. All rights reserved.  @Langat Collins</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <span key={item} className="text-xs text-cream/30 hover:text-cream/60 cursor-pointer tracking-wider transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}