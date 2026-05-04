"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FiUser, FiMail, FiEdit2, FiLogOut, FiSun,
  FiShield, FiCalendar, FiArrowRight, FiLock
} from "react-icons/fi";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#060d1a" }}>
        <FiSun className="text-amber-400 text-5xl animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#060d1a" }}>
        <FiLock className="text-amber-400 text-5xl" />
        <p className="text-gray-300">Redirecting to login...</p>
      </div>
    );
  }

  const user = session.user;
  const memberSince = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ background: "#060d1a", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="relative pt-28 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0a1628 0%, #060d1a 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #F59E0B 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-8 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
            My Account
          </p>
          <h1
            className="text-5xl font-black text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My <span className="gradient-text">Profile</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar Card */}
          <div
            className="rounded-3xl p-8 text-center flex flex-col items-center animate__animated animate__fadeInLeft"
            style={{
              background: "linear-gradient(145deg, #0e1929, #111e30)",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
          >
            <div className="relative mb-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-400/30"
                />
              ) : (
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-black"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #F97316)" }}
                >
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#10B981" }}
              >
                <FiShield size={12} className="text-white" />
              </div>
            </div>

            <h2 className="text-white font-bold text-xl mb-1">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-5">{user.email}</p>

            <div
              className="w-full px-4 py-2.5 rounded-xl text-xs text-center mb-5"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10B981" }}
            >
              ✓ Verified Member
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <Link
                href="/my-profile/update"
                className="btn-sun flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
              >
                <FiEdit2 size={14} />
                Update Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "rgba(251,113,133,0.08)",
                  border: "1px solid rgba(251,113,133,0.2)",
                  color: "#FB7185",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(251,113,133,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(251,113,133,0.08)")}
              >
                <FiLogOut size={14} />
                Logout
              </button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="md:col-span-2 space-y-4 animate__animated animate__fadeInRight">
            {/* Account Info */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(145deg, #0e1929, #111e30)",
                border: "1px solid rgba(245,158,11,0.12)",
              }}
            >
              <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                <FiUser className="text-amber-400" /> Account Information
              </h3>

              <div className="space-y-4">
                {[
                  { icon: FiUser, label: "Full Name", value: user.name || "—" },
                  { icon: FiMail, label: "Email Address", value: user.email || "—" },
                  { icon: FiCalendar, label: "Member Since", value: memberSince },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(245,158,11,0.1)" }}
                    >
                      <Icon size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(145deg, #0e1929, #111e30)",
                border: "1px solid rgba(245,158,11,0.12)",
              }}
            >
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Browse Products", href: "/products", emoji: "🛍️" },
                  { label: "Update Profile", href: "/my-profile/update", emoji: "✏️" },
                  { label: "Summer Deals", href: "/products", emoji: "🔥" },
                  { label: "Back to Home", href: "/", emoji: "🏠" },
                ].map(({ label, href, emoji }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all group"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(245,158,11,0.06)";
                      e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <span className="text-xl">{emoji}</span>
                    <span className="text-gray-300 text-sm font-medium group-hover:text-amber-400 transition-colors flex-1">
                      {label}
                    </span>
                    <FiArrowRight size={14} className="text-gray-600 group-hover:text-amber-400 transition-all group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
