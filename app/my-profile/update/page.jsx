"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiUser, FiImage, FiArrowLeft, FiSun, FiSave, FiLock } from "react-icons/fi";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile/update");
    }
    if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#060d1a" }}>
        <FiSun className="text-amber-400 text-5xl animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#060d1a" }}>
        <FiLock className="text-amber-400 text-5xl mb-3" />
        <p className="text-gray-300">Redirecting to login...</p>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const result = await updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (result.error) {
        toast.error(result.error.message || "Update failed. Please try again.");
      } else {
        toast.success("Profile updated successfully! ✨");
        router.push("/my-profile");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-10"
      style={{ background: "#060d1a" }}
    >
      {/* Background */}
      <div
        className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0EA5E9, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8 pointer-events-none"
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
        {/* Back */}
        <Link
          href="/my-profile"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors text-sm mb-6 group"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="text-center mb-7">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: "rgba(245,158,11,0.12)" }}
          >
            <FiUser className="text-amber-400 text-2xl" />
          </div>
          <h1
            className="text-3xl font-black text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Update Profile
          </h1>
          <p className="text-gray-400 text-sm mt-1">Change your name or profile photo</p>
        </div>

        {/* Current Avatar Preview */}
        <div className="flex justify-center mb-6">
          {image ? (
            <img
              src={image}
              alt="Profile preview"
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-400/30"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-black"
              style={{ background: "linear-gradient(135deg, #F59E0B, #F97316)" }}
            >
              {session.user.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-dark pl-10"
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
              Profile Photo URL <span className="text-gray-600">(optional)</span>
            </label>
            <div className="relative">
              <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input-dark pl-10"
              />
            </div>
            <p className="text-gray-600 text-xs mt-1.5">
              Paste a direct image URL to update your avatar
            </p>
          </div>

          {/* Info box */}
          <div
            className="rounded-xl p-4 text-sm"
            style={{
              background: "rgba(14,165,233,0.06)",
              border: "1px solid rgba(14,165,233,0.15)",
              color: "#7dd3fc",
            }}
          >
            <strong>Note:</strong> Only Name and Photo URL can be updated here. Email changes require additional verification.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-sun w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiSave size={16} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
