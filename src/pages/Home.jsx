import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { accommodations } from "../data/accommodations";
import AccommodationCard from "../components/AccommodationCard";

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/accommodations");
  };

  const featured = accommodations.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80"
            alt="Luxury accommodation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.45em] uppercase text-gold-300 font-light mb-6">
            Kenya's Premier Luxury Collection
          </p>
          <p className="text-cream/70 font-light text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            Handpicked sanctuaries across Kenya's most breathtaking landscapes — from the Mara plains to the Swahili coast.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto shadow-2xl">
            <input
              type="text"
              placeholder="search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 px-6 py-4 bg-cream/95 text-charcoal placeholder-muted text-sm font-light outline-none focus:bg-white"
            />
            <button
              type="submit"
              className="bg-gold-500 hover:bg-gold-600 text-cream px-8 py-4 text-xs tracking-[0.25em] uppercase font-light transition-colors duration-300 whitespace-nowrap"
            >
              Explore
            </button>
          </form>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-cream/40 text-[10px] tracking-[0.3em] uppercase font-light">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/40 to-transparent"></div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal text-cream py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "6+", label: "Curated Properties" },
            { val: "4.93", label: "Average Rating" },
            { val: "1,072", label: "Happy Guests" },
            { val: "5", label: "Kenyan Regions" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl font-light text-gold-400 mb-1">{stat.val}</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-cream/40 font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold-600 font-light mb-3">Carefully Selected</p>
            <h2 className="font-serif text-5xl font-light text-charcoal">Featured Stays</h2>
          </div>
          <button
            onClick={() => navigate("/accommodations")}
            className="text-xs tracking-[0.25em] uppercase font-light text-muted hover:text-charcoal border-b border-muted/30 hover:border-charcoal pb-0.5 transition-all duration-300 self-start md:self-auto"
          >
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((acc) => (
            <AccommodationCard key={acc.id} accommodation={acc} />
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="bg-cream border-y border-gold-200/50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold-600 font-light mb-3">Why Azuri</p>
            <h2 className="font-serif text-5xl font-light text-charcoal">Welcome to our refreshing African hospitality</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "✦",
                title: "Handpicked Only",
                desc: "Every property passes our rigorous 40-point excellence audit. Less than 5% of properties we evaluate make it into our collection.",
              },
              {
                icon: "◈",
                title: "White-Glove Service",
                desc: "A dedicated stay curator is assigned to every booking. From airport pickup to farewell sundowners — every detail is orchestrated.",
              },
              {
                icon: "⬡",
                title: "Best Rate Guarantee",
                desc: "Book directly with us and we guarantee the lowest available rate, or we'll match and beat it by 10%.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-3xl text-gold-400 mb-5">{item.icon}</div>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-4">{item.title}</h3>
                <p className="text-sm text-muted font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
            alt="CTA background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/65"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold-300 font-light mb-5">Limited Availability</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-cream mb-6">
            Reserve Your<br /><em className="italic text-gold-300">Sanctuary</em>
          </h2>
          <p className="text-cream/60 font-light mb-10 text-lg">
            Exceptional properties fill months in advance. Secure your preferred dates today.
          </p>
          <button
            onClick={() => navigate("/accommodations")}
            className="bg-gold-500 hover:bg-gold-400 text-charcoal text-xs tracking-[0.3em] uppercase px-12 py-5 font-light transition-colors duration-300"
          >
            Browse Collection
          </button>
        </div>
      </section>
    </div>
  );
}