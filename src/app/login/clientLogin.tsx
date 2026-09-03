"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaCog } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/seo';
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/seo-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        document.cookie = `seo-auth-token=${data.token}; path=/; max-age=86400; secure; samesite=strict`;
        router.push(redirectUrl);
        router.refresh();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('https://res.cloudinary.com/djipgt6vc/image/upload/v1774335586/login-bg_myf3hh.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
      
      {/* TOP-LEFT LOGO */}
      <Link href="/" className="absolute top-4 left-4 sm:top-6 sm:left-8 z-10">
        <img 
          src="/assets/estateai.png" 
          alt="EstateAI" 
          className="w-32 sm:w-40 md:w-48 lg:w-52 h-auto"
        />
      </Link>

      {/* MAIN CONTENT */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen py-20 sm:py-24 lg:py-0">
        <Toaster />
        
        <div className="w-full max-w-5xl flex flex-col  lg:flex-row  items-center justify-center lg:justify-between gap-8 lg:gap-12">
          
          {/* LEFT CARD - Login Form */}
          <div
            className="w-full max-w-sm sm:max-w-md lg:max-w-md sm:ml-16 lg:ml-28 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl relative z-10"
            style={{
              background: "linear-gradient(160deg, #0b2a4a 0%, #0d3561 60%, #0a2440 100%)",
              boxShadow: "0 25px 60px rgba(13, 46, 94, 0.4), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <h2 className="text-xs sm:text-sm font-semibold text-gray-300 mb-1 tracking-widest uppercase">
              WELCOME,
            </h2>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug mb-5 sm:mb-7 text-white">
              Access Your <br /> Secure Control Panel
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Email */}
              <div
                className="flex items-center gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(100,160,255,0.2)",
                }}
              >
                <FaUserAlt className="text-gray-400 text-sm flex-shrink-0" />
                <input
                  type="email"
                  placeholder="Email or Workspace ID"
                  className="bg-transparent outline-none w-full text-white placeholder-gray-400 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div
                className="flex items-center gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(100,160,255,0.2)",
                }}
              >
                <FaLock className="text-gray-400 text-sm flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-transparent outline-none w-full text-white placeholder-gray-400 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white transition flex-shrink-0"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right text-xs sm:text-sm text-gray-400 cursor-pointer hover:text-white transition">
                Forgot Password?
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 rounded-full text-white text-sm sm:text-base font-black tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                style={{
                  background: "linear-gradient(90deg, #1e88e5, #29b6f6)",
                  boxShadow: "0 0 24px rgba(30, 136, 229, 0.6), 0 4px 15px rgba(41, 182, 246, 0.4)",
                }}
              >
                {loading ? "Signing in..." : "SIGN IN NOW"}
              </button>
            </form>

            {/* Social Login */}
            <div className="text-center mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm">
              Or sign in with:
            </div>

            <div className="flex justify-center gap-4 sm:gap-6 mt-3 sm:mt-4">
              {/* Google */}
              <button
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center hover:scale-110 transition"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <FaGoogle className="text-lg sm:text-xl" style={{ color: "#4285F4" }} />
              </button>
              {/* GitHub */}
              <button
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center hover:scale-110 transition"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <FaGithub className="text-lg sm:text-xl text-white" />
              </button>
              {/* Settings */}
              <button
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center hover:scale-110 transition"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <FaCog className="text-lg sm:text-xl" style={{ color: "#90caf9" }} />
              </button>
            </div>

            <div className="text-center mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-white font-bold hover:underline">
                Sign Up
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - Robot & Text (Hidden on mobile and tablet) */}
          <div className="hidden lg:flex flex-col items-center text-center max-w-md">
            {/* Robot in circle */}
            <div className="w-56 h-56 xl:w-72 xl:h-72 rounded-full flex items-center justify-center mb-6 xl:mb-8">
              <img
                src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335570/login-robo_y9a5vm.png"
                alt="Cyber AI Robot"
                className="w-48 h-48 xl:w-60 xl:h-60 object-contain"
              />
            </div>

            <p className="text-[#1a3a5c] text-base xl:text-lg leading-relaxed font-medium max-w-sm px-4">
              Your advanced cyber-security assistant is ready. Sign in to review
              your current network security posture and threat detection metrics.
            </p>

            <a
              href="#"
              className="mt-4 xl:mt-5 text-[#1565c0] font-semibold underline underline-offset-4 hover:text-[#0d47a1] transition text-sm xl:text-base"
            >
              Need Help?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;