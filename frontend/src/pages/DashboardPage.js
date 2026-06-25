import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const quickActions = [
  { to: "/journal", label: "Write a note", accent: "btn-primary" },
  { to: "/history", label: "View history", accent: "btn-ghost" },
  { to: "/analytics", label: "See insights", accent: "btn-primary" },
  { to: "/heatmap", label: "Mood calendar", accent: "btn-ghost" },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });

  useEffect(() => {
    fetchStreak();
  }, []);

  const fetchStreak = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/streak", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStreak(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),_transparent_30%),linear-gradient(135deg,_#050816,_#0f172a)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/10 px-5 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Daily reflection</p>
            <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Welcome back, {user?.name?.split(" ")[0] || "friend"}
            </h1>
            <p className="mt-2 text-sm text-slate-300">A calm space for your thoughts, patterns, and moods.</p>
          </div>
          <button onClick={logout} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:text-white">
            Sign out
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-violet-200">Your moodboard</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">A gentle place to reflect</h2>
              </div>
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                {streak.currentStreak} day streak
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-8 text-slate-300">
                Start with a short note, and the app will translate it into a personal mood snapshot with colors, keywords, and a meaningful summary.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.to} className={action.accent === "btn-primary" ? "btn-primary px-4 py-2" : "btn-ghost px-4 py-2"}>
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/20 via-cyan-400/10 to-fuchsia-500/20 p-5 backdrop-blur-xl">
              <div className="text-4xl">🔥</div>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-300">Current streak</p>
              <p className="mt-2 text-4xl font-semibold text-white">{streak.currentStreak}</p>
              <p className="text-sm text-slate-300">days of thoughtful reflection</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <div className="text-4xl">🏆</div>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-300">Longest streak</p>
              <p className="mt-2 text-4xl font-semibold text-white">{streak.longestStreak}</p>
              <p className="text-sm text-slate-300">your best rhythm so far</p>
            </div>
          </motion.section>
        </div>

        <section className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl md:grid-cols-3">
          <button onClick={() => window.open(`http://localhost:5000/api/report?token=${localStorage.getItem("token")}`)} className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4 text-left transition hover:border-cyan-300/40">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Download</p>
            <p className="mt-2 text-lg font-semibold text-white">Create a report</p>
            <p className="mt-2 text-sm text-slate-300">Share your emotional timeline in a clean PDF.</p>
          </button>
          <Link to="/insights" className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4 text-left transition hover:border-cyan-300/40">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Reflection</p>
            <p className="mt-2 text-lg font-semibold text-white">Weekly insights</p>
            <p className="mt-2 text-sm text-slate-300">A softer, more thoughtful reading of your patterns.</p>
          </Link>
          <Link to="/history" className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4 text-left transition hover:border-cyan-300/40">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Archive</p>
            <p className="mt-2 text-lg font-semibold text-white">Mood history</p>
            <p className="mt-2 text-sm text-slate-300">Look back and notice what changed over time.</p>
          </Link>
        </section>
      </div>
    </div>
  );
}