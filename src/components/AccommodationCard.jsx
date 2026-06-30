import { Link } from "react-router-dom";

export default function AccommodationCard({ accommodation }) {
  const { id, name, type, location, price, rating, reviews, bedrooms, maxGuests, image, tag } = accommodation;

  return (
    <Link to={`/accommodations/${id}`} className="group block">
      <div className="overflow-hidden relative">
        {tag && (
          <div className="absolute top-4 left-4 z-10 bg-cream/95 text-charcoal text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-light">
            {tag}
          </div>
        )}
        <div className="overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>

      <div className="pt-5 pb-2">
        <div className="flex justify-between items-start gap-2 mb-1.5">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold-600 font-light mb-1">{type}</p>
            <h3 className="font-serif text-xl font-light text-charcoal group-hover:text-gold-700 transition-colors duration-300">
              {name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="font-serif text-xl text-charcoal">Ksh {price.toLocaleString()}</p>
            <p className="text-[10px] text-muted tracking-wider">/ night</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4 text-xs text-muted font-light">
            <span>📍 {location}</span>
            <span>🛏 {bedrooms} bd</span>
            <span>👤 {maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted">
            <span className="text-gold-500">★</span>
            <span className="font-light">{rating}</span>
            <span className="text-muted/50">({reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}