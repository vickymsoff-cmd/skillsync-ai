"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg"></div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                SkillSync AI
              </span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 mb-6"
            variants={fadeInUp}
          >
            Bridge the Gap Between Skills and Industry
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            SkillSync AI intelligently connects students, academicians,
            institutions and industries through skill intelligence, personalized
            learning and opportunity matching.
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center mb-16"
            variants={fadeInUp}
          >
            <Link
              href="/register?role=student"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Explore Platform
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Floating graphic placeholder */}
          <motion.div
            className="bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-2xl h-96 mb-20 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎓 → 🤖 → 💼</div>
              <p className="text-gray-600 dark:text-gray-300">
                Student Skills → AI Engine → Industry Opportunities
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stakeholders Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          For Everyone in the Ecosystem
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            {
              icon: "🎓",
              title: "Students",
              description:
                "Discover your potential, assess skills, find personalized learning paths and land opportunities",
            },
            {
              icon: "👨‍🏫",
              title: "Academicians",
              description:
                "Collaborate with industry, guide students and stay updated with skill demands",
            },
            {
              icon: "🏢",
              title: "Industries",
              description:
                "Access pre-vetted talent, post opportunities and collaborate on live projects",
            },
            {
              icon: "🏛️",
              title: "Institutions",
              description:
                "Gain insights on student skills, placement rates and industry alignment",
            },
          ].map((stakeholder, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-all cursor-pointer"
              whileHover={{ y: -4 }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="text-4xl mb-3">{stakeholder.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                {stakeholder.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stakeholder.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-slate-900/50 dark:to-slate-800/50 rounded-3xl mt-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          AI-Powered Features
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            {
              icon: <Zap size={28} className="text-indigo-600" />,
              title: "Skill Intelligence",
              description:
                "AI-powered assessment and profiling of technical and soft skills",
            },
            {
              icon: <TrendingUp size={28} className="text-violet-600" />,
              title: "Skill Gap Analysis",
              description:
                "Identify gaps between current and required skills for target roles",
            },
            {
              icon: <Users size={28} className="text-indigo-600" />,
              title: "Smart Matching",
              description:
                "Match students with opportunities based on verified skills and interests",
            },
            {
              icon: <Briefcase size={28} className="text-violet-600" />,
              title: "Opportunity Discovery",
              description:
                "Access internships, jobs, projects and mentorship programs",
            },
            {
              icon: <CheckCircle size={28} className="text-indigo-600" />,
              title: "Verified Skill Passport",
              description:
                "Build a verified digital portfolio with blockchain-backed credentials",
            },
            {
              icon: <TrendingUp size={28} className="text-violet-600" />,
              title: "Career Readiness",
              description:
                "Track your journey from learning to placement with AI insights",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-800"
              whileHover={{ y: -6 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Join the Future of Academia-Industry Collaboration
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start your journey today and unlock unlimited career opportunities
          </p>
          <Link
            href="/register"
            className="inline-block bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-10 py-4 rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
          >
            Get Started Now
            <ArrowRight size={20} className="inline ml-2" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          <p>© 2026 SkillSync AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
