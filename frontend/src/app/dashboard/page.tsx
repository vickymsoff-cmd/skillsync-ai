"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  BookOpen,
  Briefcase,
  Award,
  Bell,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ProgressRing } from "@/components/ProgressRing";
import { SkillCard } from "@/components/SkillCard";
import apiService from "@/services/api";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const data = await apiService.getStudentDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-full"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.full_name || "Student"}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress, discover opportunities, and continue your learning
            journey.
          </p>
        </motion.div>

        {/* Industry Readiness Score */}
        <motion.div
          className="mb-8 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Your Industry Readiness Score
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your current readiness level based on skills, assessments, and
                experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-600">✓</span> Strong Technical Skills
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-yellow-600">⚠</span> Improve Communication
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-red-600">✕</span> Cloud Experience Needed
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <ProgressRing
                percentage={78}
                label="Industry Readiness"
                color="#4F46E5"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
        >
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <StatCard
              label="Total Skills"
              value={12}
              icon={<Award size={28} />}
              trend={{ direction: "up", value: 3 }}
            />
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <StatCard
              label="Verified Skills"
              value={8}
              icon={<BarChart3 size={28} />}
              trend={{ direction: "up", value: 5 }}
            />
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <StatCard
              label="Applications"
              value={5}
              icon={<Briefcase size={28} />}
              trend={{ direction: "up", value: 2 }}
            />
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <StatCard
              label="Learning Path"
              value="60%"
              icon={<BookOpen size={28} />}
              trend={{ direction: "up", value: 10 }}
            />
          </motion.div>
        </motion.div>

        {/* Skills Overview */}
        <motion.div
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Your Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkillCard
              skillName="Python"
              level={85}
              category="Programming"
              verificationLevel="gold"
            />
            <SkillCard
              skillName="Machine Learning"
              level={72}
              category="AI/ML"
              verificationLevel="silver"
            />
            <SkillCard
              skillName="SQL"
              level={65}
              category="Database"
              verificationLevel="bronze"
            />
            <SkillCard
              skillName="Communication"
              level={75}
              category="Soft Skills"
              verificationLevel="silver"
            />
            <SkillCard
              skillName="Problem Solving"
              level={82}
              category="Soft Skills"
              verificationLevel="gold"
            />
            <SkillCard
              skillName="Teamwork"
              level={80}
              category="Soft Skills"
              verificationLevel="gold"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <BookOpen className="text-blue-600 mb-3" size={28} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Take Assessment
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Evaluate and verify your skills
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
              Start →
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <TrendingUp className="text-purple-600 mb-3" size={28} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Learn New Skills
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Follow personalized learning path
            </p>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
              Explore →
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <Briefcase className="text-green-600 mb-3" size={28} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Find Opportunities
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Discover internships and jobs
            </p>
            <button className="text-green-600 hover:text-green-700 text-sm font-semibold">
              Browse →
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
