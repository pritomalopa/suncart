"use client";
import Link from "next/link";
import { FiStar, FiArrowRight, FiShoppingBag } from "react-icons/fi";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          className={`text-xs ${s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
          style={s <= Math.round(rating) ? { fill: "#F59E0B" } : {}}
        />
      ))}
      <span className="text-gray-400 text-xs ml-1">({rating})</span>
    </div>
  );
}

function getBadgeClass(badge) {
  if (!badge) return "";
  const b = badge.toLowerCase();
  if (b.includes("hot") || b.includes("deal") || b.includes("sale")) return "badge-hot";
  if (b.includes("new")) return "badge-new";
  return "badge-top";
}

export default function ProductCard({ product }) {
  return (
    <div className="product-card rounded-2xl overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1929]/80 to-transparent" />
        {product.badge && (
          <span className={`absolute top-3 left-3 ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs text-gray-300">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-amber-400/70 text-xs font-medium uppercase tracking-wider mb-1">{product.brand}</p>
        <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#F59E0B" }}
            >
              ${product.price.toFixed(2)}
            </span>
            <p className="text-gray-500 text-xs mt-0.5">{product.stock} in stock</p>
          </div>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="mt-4 btn-sun flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold group/btn"
        >
          <FiShoppingBag className="text-sm" />
          View Details
          <FiArrowRight className="text-sm transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
