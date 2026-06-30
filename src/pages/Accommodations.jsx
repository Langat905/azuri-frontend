import { useState } from "react";
import { accommodations } from "../data/accommodations";
import AccommodationCard from "../components/AccommodationCard";

const TYPES = ["All", "Penthouse Suite", "Private Villa", "Beachfront Residence", "Eco-Luxury Cottage", "Alpine Chalet", "Historic Townhouse"];

export default function Accommodations() {
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(1000);

  const filtered = accommodations
    .filter((a) => selectedType === "All" || a.type === selectedType)
    .filter((a) => a.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-charcoal text-cream py-20 px-6 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold-300 font-light mb-4">Our Collection</p>
        <h1 className="font-serif text-6xl font-light mb-4">All Accommodations</h1>
        <p className="text-cream/50 font-light text-lg max-w-lg mx-auto">
          {accommodations.length} handpicked properties across Kenya's finest destinations
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex flex-col lg:flex-row gap-8 mb-14 pb-10 border-b border-gold-200/40">
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-light mb-4">Property Type</p>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200 font-light ${
                    selectedType === type
                      ? "bg-charcoal text-cream border-charcoal"
                      : "bg-transparent text-muted border-gold-200 hover:border-charcoal hover:text-charcoal"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 lg:items-end">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-light mb-4">
                Max Price: <span className="text-charcoal">ksh {maxPrice}/night</span>
              </p>
              <input
                type="range"
                min={200}
                max={1000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-48 accent-gold-500"
              />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted font-light mb-4">Sort By</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs tracking-[0.1em] uppercase bg-cream border border-gold-200 text-charcoal px-4 py-2.5 outline-none focus:border-charcoal font-light"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted font-light mb-10">
          Showing <span className="text-charcoal font-normal">{filtered.length}</span> properties
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filtered.map((acc) => (
              <AccommodationCard key={acc.id} accommodation={acc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-3xl font-light text-muted mb-4">No properties found</p>
            <p className="text-sm text-muted font-light">Try adjusting your filters</p>
            <button
              onClick={() => { setSelectedType("All"); setMaxPrice(1000); }}
              className="mt-6 text-xs tracking-[0.2em] uppercase border-b border-charcoal text-charcoal pb-0.5 font-light"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}