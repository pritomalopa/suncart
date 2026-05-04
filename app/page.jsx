"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import {
  FiSun, FiDroplet, FiHeart, FiShield, FiArrowRight, FiArrowLeft,
  FiChevronRight, FiZap, FiStar
} from "react-icons/fi";

// ── Hero Slides ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    tag: "🔥 Hot Deals",
    title: "Summer Sale",
    highlight: "50% OFF",
    sub: "Shop our biggest summer sale ever — limited time only!",
    cta: "Shop Now",
    href: "/products",
    bg: "from-amber-900/40 via-orange-900/20 to-[#060d1a]",
    accent: "#F59E0B",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    tag: "✨ New Arrivals",
    title: "Beach Ready",
    highlight: "Collection",
    sub: "Discover the freshest summer styles for your next getaway.",
    cta: "Explore",
    href: "/products",
    bg: "from-sky-900/40 via-cyan-900/20 to-[#060d1a]",
    accent: "#0EA5E9",
    img: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80",
  },
  {
    tag: "☀️ Sun Protection",
    title: "Skin-First",
    highlight: "Skincare",
    sub: "Dermatologist-approved SPF products to keep you glowing all summer.",
    cta: "Discover",
    href: "/products",
    bg: "from-pink-900/40 via-rose-900/20 to-[#060d1a]",
    accent: "#FB7185",
    img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
  },
];

// ── Summer Tips ───────────────────────────────────────────────────────────────
const TIPS = [
  {
    icon: FiShield,
    color: "#F59E0B",
    title: "Apply SPF Daily",
    body: "Use broad-spectrum SPF 30+ every morning, even on cloudy days. Reapply every 2 hours when outdoors.",
  },
  {
    icon: FiDroplet,
    color: "#0EA5E9",
    title: "Stay Hydrated",
    body: "Drink at least 8–10 glasses of water daily. Add electrolytes after intense outdoor activities.",
  },
  {
    icon: FiSun,
    color: "#F97316",
    title: "Seek Shade",
    body: "Avoid peak sun hours (10AM–4PM). Wear wide-brim hats and UV-protective clothing for extra cover.",
  },
  {
    icon: FiHeart,
    color: "#FB7185",
    title: "After-Sun Care",
    body: "Soothe skin with aloe vera or a cooling after-sun lotion. Moisturize twice daily for supple skin.",
  },
];

// ── Brands ────────────────────────────────────────────────────────────────────
const BRANDS = [
  { name: "SunShade", emoji: "🕶️", tagline: "Premium UV eyewear", color: "#F59E0B" },
  { name: "GlowGuard", emoji: "🧴", tagline: "Science-backed skincare", color: "#10B981" },
  { name: "WaveRider", emoji: "🏄", tagline: "Beach lifestyle gear", color: "#0EA5E9" },
  { name: "TropicStyle", emoji: "🌴", tagline: "Resort fashion & hats", color: "#FB7185" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const popularProducts = products.slice(0, 3);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[slide];

  return (
    <div style={{ background: "#060d1a" }}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 transition-all duration-1000">
          <img
            src={s.img}
            alt="hero"
            className="w-full h-full object-cover opacity-25 transition-all duration-1000"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.bg}`} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #060d1a 0%, transparent 60%)" }} />
        </div>

        {/* Floating sun orbs */}
        <div
          className="absolute top-24 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: s.accent, transition: "background 1s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full opacity-8 blur-2xl pointer-events-none"
          style={{ background: "#F97316" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-2xl">
            {/* Tag */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate__animated animate__fadeInDown"
              style={{
                background: `${s.accent}18`,
                border: `1px solid ${s.accent}40`,
                color: s.accent,
              }}
            >
              <FiZap className="text-base" />
              {s.tag}
            </div>

            {/* Title */}
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-black leading-none mb-4 animate__animated animate__fadeInUp"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-white block">{s.title}</span>
              <span style={{ color: s.accent, transition: "color 1s" }} className="block">
                {s.highlight}
              </span>
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg animate__animated animate__fadeIn">
              {s.sub}
            </p>

            <div className="flex flex-wrap gap-4 animate__animated animate__fadeInUp">
              <Link
                href={s.href}
                className="btn-sun px-8 py-4 rounded-full text-base font-bold flex items-center gap-2 shadow-lg"
                style={{ boxShadow: `0 8px 32px ${s.accent}40` }}
              >
                {s.cta} <FiArrowRight />
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 rounded-full text-base font-medium text-gray-300 border border-gray-600 hover:border-amber-400 hover:text-amber-400 transition-all"
              >
                Browse All
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { val: "500+", label: "Products" },
                { val: "50K+", label: "Happy Customers" },
                { val: "4.9★", label: "Avg Rating" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div
                    className="text-3xl font-black"
                    style={{ fontFamily: "'Playfair Display', serif", color: s.accent, transition: "color 1s" }}
                  >
                    {val}
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <button
            onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
            className="w-9 h-9 rounded-full border border-gray-600 hover:border-amber-400 flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all"
          >
            <FiArrowLeft size={16} />
          </button>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === slide ? "28px" : "8px",
                height: "8px",
                background: i === slide ? s.accent : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
          <button
            onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
            className="w-9 h-9 rounded-full border border-gray-600 hover:border-amber-400 flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all"
          >
            <FiArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ─────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="section-line" />
            <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              🔥 Popular Products
            </h2>
            <p className="text-gray-400 mt-2">Trending summer picks loved by thousands</p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors group text-sm"
          >
            View All Products
            <FiChevronRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((product, i) => (
            <div
              key={product.id}
              className="animate__animated animate__fadeInUp"
              style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ── SUMMER CARE TIPS ─────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #071020 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #F59E0B 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-line mx-auto" />
            <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              ☀️ Summer Care Tips
            </h2>
            <p className="text-gray-400 mt-2">Expert advice to keep you safe and glowing all season</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIPS.map((tip, i) => (
              <div
                key={tip.title}
                className="rounded-2xl p-6 relative overflow-hidden group cursor-default animate__animated animate__fadeInUp"
                style={{
                  background: "linear-gradient(145deg, #0e1929, #111e30)",
                  border: `1px solid ${tip.color}20`,
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: "both",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${tip.color}50`;
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 24px ${tip.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${tip.color}20`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${tip.color}15` }}
                >
                  <tip.icon size={22} style={{ color: tip.color }} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{tip.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP BRANDS ───────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-line mx-auto" />
          <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            🏆 Top Brands
          </h2>
          <p className="text-gray-400 mt-2">Trusted names in summer essentials</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {BRANDS.map((brand, i) => (
            <div
              key={brand.name}
              className="rounded-2xl p-6 text-center cursor-pointer animate__animated animate__fadeInUp group"
              style={{
                background: "linear-gradient(145deg, #0e1929, #131f33)",
                border: `1px solid ${brand.color}15`,
                animationDelay: `${i * 0.12}s`,
                animationFillMode: "both",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${brand.color}40`;
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${brand.color}15`;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="text-5xl mb-3 inline-block"
                style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
              >
                {brand.emoji}
              </div>
              <h3
                className="text-white font-bold text-lg mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {brand.name}
              </h3>
              <p className="text-xs" style={{ color: brand.color }}>
                {brand.tagline}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a2a0e, #0e2218, #0a1628)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
          }}
        >
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 blur-2xl" style={{ background: "#F59E0B" }} />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-10 blur-2xl" style={{ background: "#0EA5E9" }} />
          <div className="relative">
            <div className="text-5xl mb-4">🌴</div>
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready for <span className="gradient-text">Summer?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Browse hundreds of summer essentials handpicked for your perfect season.
            </p>
            <Link
              href="/products"
              className="btn-sun inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold shadow-lg"
            >
              Shop All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
