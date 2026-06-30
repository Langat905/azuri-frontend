import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/accommodations", label: "Accommodations" },
  ];

  const displayName = user?.name || user?.email || "Account";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const linkClass = (to) =>
    `text-sm tracking-widest uppercase font-light transition-colors duration-300 ${
      location.pathname === to
        ? "text-gold-600 border-b border-gold-400"
        : "text-muted hover:text-charcoal"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-gold-200/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-light tracking-widest text-charcoal">AZURI</span>
          <span className="text-[10px] tracking-[0.3em] text-gold-600 uppercase font-sans font-light">Luxury Stays</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                {displayName}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm tracking-widest uppercase font-light text-muted hover:text-charcoal transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={linkClass("/login")}>
              Login
            </Link>
          )}

          <Link
            to="/accommodations"
            className="ml-4 bg-charcoal text-cream text-xs tracking-widest uppercase px-7 py-3 font-light hover:bg-gold-600 transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-gold-200/40 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase font-light text-muted hover:text-charcoal"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase font-light text-muted hover:text-charcoal"
              >
                {displayName}
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-sm tracking-widest uppercase font-light text-muted hover:text-charcoal"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase font-light text-muted hover:text-charcoal"
            >
              Login
            </Link>
          )}

          <Link
            to="/accommodations"
            onClick={() => setMenuOpen(false)}
            className="bg-charcoal text-cream text-xs tracking-widest uppercase px-7 py-3 text-center font-light hover:bg-gold-600 transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}