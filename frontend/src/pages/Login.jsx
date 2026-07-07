import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "../services/supabase";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">

      {/* Background Glow */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/20">

        {/* Logo */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-blue-500/40">
            CV
          </div>
        </div>

        <h1 className="text-center text-4xl font-bold text-blue-500">
          CrimeVerse
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Digital Crime Investigation Platform
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@crimeverse.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-12 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-cyan-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {message && (
            <p className="text-center text-sm text-cyan-400">
              {message}
            </p>
          )}

        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-cyan-400 transition hover:text-cyan-300 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;