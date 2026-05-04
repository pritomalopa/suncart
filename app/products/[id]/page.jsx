"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import products from "@/data/products.json";
import Link from "next/link";
import {
  FiArrowLeft, FiStar, FiShoppingCart, FiShoppingBag,
  FiPackage, FiAward, FiTag, FiLock, FiSun
} from "react-icons/fi";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          className={`text-lg ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-700"}`}
          style={s <= Math.round(rating) ? { fill: "#F59E0B", stroke: "#F59E0B" } : {}}
        />
      ))}
      <span className="text-amber-400 font-semibold ml-2 text-lg">{rating}</span>
      <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=/products/${id}`);
    }
  }, [session, isPending, id, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#060d1a" }}>
        <div className="text-center">
          <FiSun className="text-amber-400 text-5xl mx-auto animate-spin mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#060d1a" }}>
        <div className="text-center">
          <FiLock className="text-amber-400 text-5xl mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#060d1a" }}>
        <div className="text-6xl">🌊</div>
        <h2 className="text-white text-2xl font-bold">Product not found</h2>
        <Link href="/products" className="btn-sun px-6 py-2 rounded-full">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#060d1a", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-8 group text-sm"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative animate__animated animate__fadeInLeft">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4/3", background: "#0e1929" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/50 to-transparent" />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-5 left-5">
                  <span className="badge-hot text-sm px-3 py-1">{product.badge}</span>
                </div>
              )}
            </div>

            {/* Floating card */}
            <div
              className="absolute -bottom-4 -right-4 rounded-2xl p-4 hidden md:block"
              style={{ background: "#0e1929", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              <p className="text-gray-400 text-xs mb-1">Category</p>
              <p className="text-amber-400 font-semibold text-sm">{product.category}</p>
            </div>
          </div>

          {/* Details */}
          <div className="animate__animated animate__fadeInRight" style={{ animationDelay: "0.1s" }}>
            <div className="mb-2">
              <span
                className="text-amber-400 text-sm font-semibold uppercase tracking-wider"
              >
                {product.brand}
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h1>

            <StarRating rating={product.rating} />

            <div
              className="my-6 p-5 rounded-2xl"
              style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}
            >
              <p className="text-gray-400 leading-relaxed text-base">{product.description}</p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: FiTag, label: "Price", value: `$${product.price.toFixed(2)}`, color: "#F59E0B" },
                { icon: FiPackage, label: "In Stock", value: `${product.stock} units`, color: "#10B981" },
                { icon: FiAward, label: "Brand", value: product.brand, color: "#0EA5E9" },
                { icon: FiShoppingBag, label: "Category", value: product.category, color: "#FB7185" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="rounded-xl p-4"
                  style={{ background: "#0e1929", border: `1px solid ${color}15` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} style={{ color }} />
                    <span className="text-gray-500 text-xs uppercase tracking-wide">{label}</span>
                  </div>
                  <span className="text-white font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span
                className="text-5xl font-black"
                style={{ fontFamily: "'Playfair Display', serif", color: "#F59E0B" }}
              >
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-500 line-through text-xl">
                ${(product.price * 1.4).toFixed(2)}
              </span>
              <span
                className="text-sm font-semibold px-2 py-1 rounded-full"
                style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}
              >
                Save 29%
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-sun flex-1 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2">
                <FiShoppingCart />
                Add to Cart
              </button>
              <button
                className="flex-1 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  color: "#F59E0B",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(245,158,11,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <FiStar />
                Wishlist
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex gap-4 mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {["🚚 Free Shipping", "🔄 30-day Returns", "🛡️ Secure Checkout"].map((badge) => (
                <span key={badge} className="text-gray-500 text-xs">{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
