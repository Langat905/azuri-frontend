import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { accommodations } from "../data/accommodations";

export default function AccommodationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const acc = accommodations.find((a) => a.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);

  if (!acc) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center">
        <p className="font-serif text-4xl font-light text-muted mb-6">Property not found</p>
        <Link to="/accommodations" className="text-xs tracking-[0.25em] uppercase border-b border-charcoal pb-0.5 font-light">
          Back to all properties
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted font-light tracking-wider">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/accommodations" className="hover:text-charcoal transition-colors">Accommodations</Link>
          <span>/</span>
          <span className="text-charcoal">{acc.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 aspect-[16/10] overflow-hidden">
            <img src={acc.images[activeImg]} alt={acc.name} className="w-full h-full object-cover transition-all duration-500" />
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            {acc.images.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)}
                className={`overflow-hidden cursor-pointer aspect-[4/3] border-2 transition-all duration-200 ksh{activeImg === i ? "border-gold-400" : "border-transparent"}`}>
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-14 pb-24">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 font-light mb-2">{acc.type}</p>
              <h1 className="font-serif text-5xl font-light text-charcoal mb-2">{acc.name}</h1>
              <p className="text-muted font-light text-sm">📍 {acc.location}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-serif text-4xl text-charcoal">ksh {acc.price.toLocaleString()}</p>
              <p className="text-xs text-muted tracking-wider font-light">per night</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-gold-500 text-sm">★</span>
                <span className="text-sm font-light">{acc.rating}</span>
                <span className="text-xs text-muted">({acc.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 border-y border-gold-200/50 py-7 mb-10">
            {[
              { icon: "🛏", label: "Bedrooms", val: acc.bedrooms },
              { icon: "🚿", label: "Bathrooms", val: acc.bathrooms },
              { icon: "👤", label: "Guests", val: acc.maxGuests },
              { icon: "📐", label: "Sq ft", val: acc.sqft.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="font-serif text-lg font-light text-charcoal">{s.val}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-light">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-2xl font-light mb-5 text-charcoal">About this property</h2>
            <p className="text-muted font-light leading-relaxed text-[15px]">{acc.description}</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-light mb-6 text-charcoal">Amenities and Experiences</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {acc.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm font-light text-charcoal bg-gold-50 px-4 py-3">
                  <span className="text-gold-500 text-xs">✦</span>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-28 bg-charcoal text-cream p-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-300 font-light mb-2">Reserve</p>
            <h3 className="font-serif text-3xl font-light mb-1">{acc.name}</h3>
            <p className="text-cream/50 font-light text-sm mb-8">{acc.type} · {acc.location}</p>
            <div className="border-t border-cream/10 pt-6 mb-8">
              <div className="flex justify-between text-sm font-light mb-2">
                <span className="text-cream/60">Price per night</span>
                <span className="text-cream">ksh{acc.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-light mb-2">
                <span className="text-cream/60">Service fee</span>
                <span className="text-cream">ksh{Math.round(acc.price * 0.12).toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => navigate("/book/" + acc.id)}
              className="w-full bg-gold-500 hover:bg-gold-400 text-charcoal text-xs tracking-[0.3em] uppercase py-4 font-light transition-colors duration-300 mb-4">
              Book This Property
            </button>
            <p className="text-center text-[10px] text-cream/30 tracking-wider font-light">No charge until confirmation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
