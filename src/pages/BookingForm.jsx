import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { accommodations } from "../data/accommodations";
import { createBooking } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const acc = accommodations.find((a) => a.id === Number(id));

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

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

  const nights = (() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const diff = new Date(form.checkOut) - new Date(form.checkIn);
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
  })();

  const subtotal = nights * acc.price;
  const fee = Math.round(subtotal * 0.12);
  const total = subtotal + fee;

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.checkIn) e.checkIn = "Required";
    if (!form.checkOut) e.checkOut = "Required";
    if (form.checkIn && form.checkOut && new Date(form.checkOut) <= new Date(form.checkIn))
      e.checkOut = "Must be after check-in";
    if (form.guests < 1 || form.guests > acc.maxGuests)
      e.guests = `1–${acc.maxGuests} guests allowed`;
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Redirect to login if not authenticated
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setServerError("");

    const ref = "AZR-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const bookingData = {
      service: acc.name,
      date: form.checkIn,
      time: "14:00", // default check-in time
      notes: `
        Guest: ${form.firstName} ${form.lastName} |
        Email: ${form.email} |
        Phone: ${form.phone} |
        Guests: ${form.guests} |
        Check-out: ${form.checkOut} |
        Nights: ${nights} |
        Total: KSh ${total.toLocaleString()} |
        Ref: ${ref} |
        Special Requests: ${form.specialRequests || "None"}
      `,
      email: form.email,
    };

    const res = await createBooking(bookingData, token);

    if (res.error) {
      setServerError(res.error);
      setLoading(false);
      return;
    }

    setBookingRef(ref);
    setSubmitted(true);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-gold-500 text-3xl">✦</span>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold-600 font-light mb-4">Reservation Confirmed</p>
          <h1 className="font-serif text-5xl font-light text-charcoal mb-4">Thank You, {form.firstName}</h1>
          <p className="text-muted font-light text-lg mb-2">Your stay at <em className="italic font-serif">{acc.name}</em> is confirmed.</p>
          <p className="text-sm text-muted font-light mb-10">
            A confirmation has been sent to <span className="text-charcoal">{form.email}</span>
          </p>

          <div className="bg-charcoal text-cream p-8 text-left mb-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold-300 font-light mb-1">Reference</p>
                <p className="font-serif text-2xl text-gold-400">{bookingRef}</p>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase bg-gold-500/20 text-gold-300 px-3 py-1.5 font-light">
                Confirmed
              </span>
            </div>
            <div className="border-t border-cream/10 pt-6 grid grid-cols-2 gap-4 text-sm font-light">
              <div>
                <p className="text-cream/40 text-xs mb-1">Property</p>
                <p className="text-cream">{acc.name}</p>
              </div>
              <div>
                <p className="text-cream/40 text-xs mb-1">Location</p>
                <p className="text-cream">{acc.location}</p>
              </div>
              <div>
                <p className="text-cream/40 text-xs mb-1">Check-in</p>
                <p className="text-cream">{new Date(form.checkIn).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <div>
                <p className="text-cream/40 text-xs mb-1">Check-out</p>
                <p className="text-cream">{new Date(form.checkOut).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <div>
                <p className="text-cream/40 text-xs mb-1">Guests</p>
                <p className="text-cream">{form.guests}</p>
              </div>
              <div>
                <p className="text-cream/40 text-xs mb-1">Total</p>
                <p className="text-cream font-serif text-lg">Ksh {total.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-xs tracking-[0.25em] uppercase border border-charcoal text-charcoal px-8 py-3.5 font-light hover:bg-charcoal hover:text-cream transition-colors duration-300"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate("/accommodations")}
              className="text-xs tracking-[0.25em] uppercase bg-gold-500 text-charcoal px-8 py-3.5 font-light hover:bg-gold-400 transition-colors duration-300"
            >
              Browse More Stays
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-charcoal text-cream py-16 px-6 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold-300 font-light mb-4">Reservation</p>
        <h1 className="font-serif text-5xl font-light mb-2">Complete Your Booking</h1>
        <p className="text-cream/50 font-light">{acc.name} · {acc.location}</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-10">

            {/* Not logged in warning */}
            {!token && (
              <div className="bg-gold-50 border border-gold-200 p-4 text-sm text-charcoal font-light">
                Please{" "}
                <Link to="/login" className="underline text-gold-600">login</Link>
                {" "}or{" "}
                <Link to="/register" className="underline text-gold-600">register</Link>
                {" "}to complete your booking.
              </div>
            )}

            {/* Server error */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 p-4 text-sm text-red-600 font-light">
                {serverError}
              </div>
            )}

            {/* Step 1 */}
            <section>
              <div className="flex items-center gap-4 mb-7">
                <span className="font-serif text-4xl text-gold-300 font-light">1</span>
                <h2 className="font-serif text-2xl font-light text-charcoal">Guest Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { name: "firstName", label: "First Name", type: "text", placeholder: "Jane" },
                  { name: "lastName", label: "Last Name", type: "text", placeholder: "Wanjiku" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "jane@email.com" },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+254 700 000 000" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-muted font-light mb-2">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                      className={`w-full border-b bg-transparent pb-2 text-charcoal placeholder-muted/40 font-light text-sm outline-none focus:border-charcoal transition-colors duration-200 ${
                        errors[field.name] ? "border-red-400" : "border-gold-200"
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1 font-light">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Step 2 */}
            <section>
              <div className="flex items-center gap-4 mb-7">
                <span className="font-serif text-4xl text-gold-300 font-light">2</span>
                <h2 className="font-serif text-2xl font-light text-charcoal">Stay Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-muted font-light mb-2">Check-in</label>
                  <input
                    name="checkIn"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.checkIn}
                    onChange={handleChange}
                    className={`w-full border-b bg-transparent pb-2 text-charcoal font-light text-sm outline-none focus:border-charcoal transition-colors duration-200 ${
                      errors.checkIn ? "border-red-400" : "border-gold-200"
                    }`}
                  />
                  {errors.checkIn && <p className="text-red-500 text-xs mt-1 font-light">{errors.checkIn}</p>}
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-muted font-light mb-2">Check-out</label>
                  <input
                    name="checkOut"
                    type="date"
                    min={form.checkIn || new Date().toISOString().split("T")[0]}
                    value={form.checkOut}
                    onChange={handleChange}
                    className={`w-full border-b bg-transparent pb-2 text-charcoal font-light text-sm outline-none focus:border-charcoal transition-colors duration-200 ${
                      errors.checkOut ? "border-red-400" : "border-gold-200"
                    }`}
                  />
                  {errors.checkOut && <p className="text-red-500 text-xs mt-1 font-light">{errors.checkOut}</p>}
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-muted font-light mb-2">
                    Guests (max {acc.maxGuests})
                  </label>
                  <input
                    name="guests"
                    type="number"
                    min={1}
                    max={acc.maxGuests}
                    value={form.guests}
                    onChange={handleChange}
                    className={`w-full border-b bg-transparent pb-2 text-charcoal font-light text-sm outline-none focus:border-charcoal transition-colors duration-200 ${
                      errors.guests ? "border-red-400" : "border-gold-200"
                    }`}
                  />
                  {errors.guests && <p className="text-red-500 text-xs mt-1 font-light">{errors.guests}</p>}
                </div>
              </div>
            </section>

            {/* Step 3 */}
            <section>
              <div className="flex items-center gap-4 mb-7">
                <span className="font-serif text-4xl text-gold-300 font-light">3</span>
                <h2 className="font-serif text-2xl font-light text-charcoal">Special Requests</h2>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-muted font-light mb-2">
                  Requests & Preferences <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  name="specialRequests"
                  rows={4}
                  placeholder="Dietary requirements, celebration arrangements, early check-in, accessibility needs..."
                  value={form.specialRequests}
                  onChange={handleChange}
                  className="w-full border border-gold-200 bg-transparent p-4 text-charcoal placeholder-muted/40 font-light text-sm outline-none focus:border-charcoal transition-colors duration-200 resize-none"
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal text-cream text-xs tracking-[0.3em] uppercase py-5 font-light hover:bg-gold-600 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm Reservation"}
            </button>
            <p className="text-center text-xs text-muted font-light">
              By confirming, you agree to our terms and cancellation policy.
            </p>
          </form>

          {/* Sidebar */}
          <div>
            <div className="sticky top-28">
              <img src={acc.image} alt={acc.name} className="w-full aspect-[4/3] object-cover mb-6" />
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold-600 font-light mb-1">{acc.type}</p>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">{acc.name}</h3>
              <p className="text-sm text-muted font-light mb-6">📍 {acc.location}</p>

              <div className="border-t border-gold-200/50 pt-6 space-y-3 text-sm font-light">
                <div className="flex justify-between">
                  <span className="text-muted">KSh {acc.price.toLocaleString()} × {nights || "—"} nights</span>
                  <span className="text-charcoal">{nights > 0 ? `KSh ${subtotal.toLocaleString()}` : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Service fee (12%)</span>
                  <span className="text-charcoal">{nights > 0 ? `KSh ${fee.toLocaleString()}` : "—"}</span>
                </div>
                <div className="flex justify-between border-t border-gold-200/50 pt-4">
                  <span className="text-charcoal">Total</span>
                  <span className="font-serif text-xl text-charcoal">{nights > 0 ? `KSh ${total.toLocaleString()}` : "—"}</span>
                </div>
              </div>

              <div className="mt-6 bg-gold-50 p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold-600 font-light mb-1">Free Cancellation</p>
                <p className="text-xs text-muted font-light">Cancel before check-in for a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}