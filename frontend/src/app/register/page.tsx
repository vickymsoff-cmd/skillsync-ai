"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import apiService from "@/services/api";
import { useAuthStore } from "@/store";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  const [step, setStep] = useState<"role" | "details">("role");
  const [selectedRole, setSelectedRole] = useState("");

  // Handle search params on client side only
  useEffect(() => {
    const roleFromParams = searchParams?.get("role");
    if (roleFromParams) {
      setSelectedRole(roleFromParams);
      setStep("details");
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep("details");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const tokens = await apiService.register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
      });

      // Store tokens
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);

      const user = await apiService.getCurrentUser();

      // Update auth state
      login(user, tokens);

      // Redirect to onboarding or dashboard
      router.push("/onboarding");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: "student",
      icon: "🎓",
      title: "Student",
      description: "Discover skills, find learning paths and land opportunities",
    },
    {
      id: "academician",
      icon: "👨‍🏫",
      title: "Academician",
      description: "Guide students and collaborate with industry",
    },
    {
      id: "industry",
      icon: "🏢",
      title: "Industry Professional",
      description: "Find talent, post opportunities and collaborate",
    },
    {
      id: "institution_admin",
      icon: "🏛️",
      title: "Institution Admin",
      description: "Manage students and analyze skill metrics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-8">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🎓</span>
            </div>
          </div>

          {/* Step 1: Role Selection */}
          {step === "role" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                Join SkillSync AI
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                Select your role to get started
              </p>

              <div className="grid grid-cols-2 gap-4">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className="p-4 rounded-lg border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 transition-all text-left group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-4xl mb-2">{role.icon}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {role.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {role.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Registration Details */}
          {step === "details" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                Create Your Account
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                As a {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </p>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-red-600 dark:text-red-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                  />
                  <span className="ml-2">
                    I agree to the{" "}
                    <Link href="#" className="text-indigo-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-indigo-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              {/* Back Button */}
              <button
                onClick={() => setStep("role")}
                className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm py-2 mt-4"
              >
                ← Back to role selection
              </button>
            </motion.div>
          )}

          {/* Sign In Link */}
          {step === "role" && (
            <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </React.Suspense>
  );
}
