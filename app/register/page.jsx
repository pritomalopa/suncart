"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff, FiSun, FiUserPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp.email({
        name,
        email,
        password,
        image: photoUrl || undefined,
        callbackURL: "/login",
      });

      if (result.error) {
        toast.error(result.error.message || "Registration failed. Please try again.");
      } else {
        toast.success("Account created! Please log in. 🌞");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch (err) {
      toast.error("Google sign-in failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-10"
      style={{ background: "#060d1a" }}
    >
      {/* Background */}
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FB7185, transparent)" }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #F59E0B, transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #F59E0B 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      <div
        className="relative w-full max-w-md mx-4 rounded-3xl p-8 animate__animated animate__fadeInUp"
        style={{
          background: "linear-gradient(145deg, #0e1929, #111e30)",
          border: "1px solid rgba(245,158,11,0.15)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: "rgba(245,158,11,0.12)" }}>
            <FiSun className="text-amber-400 text-2xl" />
          </div>
          <h1
            className="text-3xl font-black text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Create Account
          </h1>
          <p className="text-gray-400 text-sm mt-1">Join SunCart and start your summer!</p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl mb-5 transition-all font-medium text-sm"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#E5E7EB",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
        >
          {googleLoading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <FcGoogle size={20} />
          )}
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span className="text-gray-600 text-xs uppercase tracking-widest">or</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
              <input
                type="text"
                placeholder="John Sunshine"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-dark pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark pl-10"
                required
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
              Photo URL <span className="text-gray-600">(optional)</span>
            </label>
            <div className="relative">
              <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input-dark pl-10"
              />
            </div>
            {photoUrl && (
              <div className="mt-2 flex items-center gap-2">
                <img src={photoUrl} alt="preview" className="w-8 h-8 rounded-full object-cover border border-amber-400/30" onError={(e) => (e.target.style.display = "none")} />
                <span className="text-gray-500 text-xs">Preview</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-dark pl-10 pr-10"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400 transition-colors"
              >
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {password && (
              <div className="mt-1.5 flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all"
                    style={{
                      background: password.length > i * 3
                        ? password.length < 6 ? "#FB7185"
                          : password.length < 10 ? "#F59E0B"
                          : "#10B981"
                        : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-sun w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiUserPlus />
                Create Account
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
