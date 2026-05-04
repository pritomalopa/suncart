"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiSun } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    ...(session ? [{ href: "/my-profile", label: "My Profile" }] : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "navbar-glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 group-hover:opacity-40 transition-opacity" />
              <FiSun className="text-amber-400 text-xl relative z-10" />
            </div>
            <span
              className="font-display font-bold text-xl tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="gradient-text">Sun</span>
              <span className="text-white">Cart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 relative group ${
                  pathname === link.href
                    ? "text-amber-400"
                    : "text-gray-300 hover:text-amber-400"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-amber-400/20 animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/my-profile"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full border-2 border-amber-400/50 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                      {session.user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm text-gray-300 font-medium">
                    {session.user.name?.split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-400/10"
                >
                  <FiLogOut className="text-base" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm text-gray-300 hover:text-amber-400 transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-sun text-sm px-5 py-2 rounded-full font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-amber-400 transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden navbar-glass border-t border-amber-400/10 animate__animated animate__fadeIn animate__faster"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm font-medium py-2 px-3 rounded-lg transition-all ${
                  pathname === link.href
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-gray-300 hover:text-amber-400 hover:bg-amber-400/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-amber-400/10">
              {session ? (
                <div className="space-y-2">
                  <Link
                    href="/my-profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-7 h-7 rounded-full border border-amber-400/50 object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {session.user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="text-gray-200 text-sm">{session.user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-red-400 hover:text-red-300 py-2 px-3 rounded-lg hover:bg-red-400/10 transition-colors flex items-center gap-2"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center text-sm text-gray-300 border border-amber-400/30 py-2 rounded-full hover:border-amber-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center btn-sun text-sm py-2 rounded-full"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
