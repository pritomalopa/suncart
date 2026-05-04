import Link from "next/link";
import { FiSun, FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: "linear-gradient(180deg, #060d1a 0%, #030710 100%)", borderTop: "1px solid rgba(245,158,11,0.1)" }}
    >
      {/* Top glow line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #F59E0B, #F97316, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiSun className="text-amber-400 text-2xl" />
              <span className="font-display text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="gradient-text">Sun</span>
                <span className="text-white">Cart</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Your one-stop destination for premium summer essentials. From beach accessories to skincare, we've got your summer covered.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FiInstagram, href: "#" },
                { Icon: FiFacebook, href: "#" },
                { Icon: FiTwitter, href: "#" },
                { Icon: FiYoutube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-400 border border-gray-700 hover:border-amber-400/50 transition-all duration-300 hover:bg-amber-400/10"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "All Products", href: "/products" },
                { label: "My Profile", href: "/my-profile" },
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5">
              {["Sunglasses", "Beach Accessories", "Summer Clothing", "Skincare", "Hats & Caps", "Swim Gear"].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/products"
                    className="text-gray-400 text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FiMapPin className="text-amber-400 mt-0.5 shrink-0" />
                <span>42 Sunshine Ave, Miami Beach, FL 33139, USA</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FiPhone className="text-amber-400 shrink-0" />
                <a href="tel:+18005556789" className="hover:text-amber-400 transition-colors">+1 (800) 555-6789</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FiMail className="text-amber-400 shrink-0" />
                <a href="mailto:hello@suncart.store" className="hover:text-amber-400 transition-colors">hello@suncart.store</a>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-lg" style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <p className="text-gray-400 text-xs">
                🌞 <span className="text-amber-400 font-medium">Summer Hours:</span> Mon–Sat 9AM–8PM EST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} SunCart. All rights reserved. Made with ☀️
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-gray-500 text-xs hover:text-amber-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
