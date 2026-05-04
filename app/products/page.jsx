"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { FiSearch, FiFilter } from "react-icons/fi";

const CATEGORIES = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  let filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ background: "#060d1a", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="relative pt-28 pb-16 text-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0a1628 0%, #060d1a 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #F59E0B 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Collection
          </p>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            All <span className="gradient-text">Products</span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Discover our full range of summer essentials, carefully curated for your best season yet.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div
          className="rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center"
          style={{ background: "#0e1929", border: "1px solid rgba(245,158,11,0.1)" }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search products or brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-9"
            />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: category === cat ? "linear-gradient(135deg, #F59E0B, #F97316)" : "rgba(255,255,255,0.05)",
                  color: category === cat ? "white" : "#9CA3AF",
                  border: category === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-dark md:w-44"
            style={{ cursor: "pointer" }}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Count */}
        <p className="text-gray-500 text-sm mb-6">
          Showing <span className="text-amber-400 font-medium">{filtered.length}</span> products
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="animate__animated animate__fadeInUp"
                style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "both" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌊</div>
            <h3 className="text-white text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              className="mt-4 btn-sun px-6 py-2 rounded-full text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
