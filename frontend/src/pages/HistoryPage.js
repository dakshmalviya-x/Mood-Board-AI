import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://mood-board-ai.onrender.com/api/mood/entries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredEntries = entries.filter((entry) => entry.text?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),_transparent_30%),linear-gradient(135deg,_#050816,_#0f172a)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Memory</p>
          <h1 className="font-display text-4xl font-semibold text-white">Your reflective archive</h1>
          <p className="max-w-2xl text-slate-300">Browse your past entries, revisit how you felt, and notice the shifts over time.</p>
        </div>

        <div className="mb-8 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4 backdrop-blur-xl">
          <input
            type="text"
            placeholder="Search your reflections..."
            className="w-full rounded-[1rem] border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-5">
          {filteredEntries.map((entry) => (
            <motion.article key={entry._id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/65 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{new Date(entry.createdAt).toLocaleDateString()}</p>
                  <h2 className="mt-1 text-2xl font-semibold capitalize" style={{ color: entry.mood.colors[0] }}>
                    {entry.mood.emotion}
                  </h2>
                </div>
                <div className="flex gap-2">
                  {entry.mood.colors.map((color, i) => <div key={i} className="h-8 w-8 rounded-full" style={{ backgroundColor: color }} />)}
                </div>
              </div>

              <p className="mb-4 leading-8 text-slate-200">{entry.text}</p>
              <p className="mb-4 rounded-[1rem] border border-white/10 bg-white/5 p-3 text-sm italic text-slate-300">{entry.mood.summary}</p>

              <div className="flex flex-wrap gap-2">
                {entry.mood.keywords?.map((word, i) => (
                  <span key={i} className="rounded-full px-3 py-1 text-sm text-white" style={{ backgroundColor: `${entry.mood.colors[i % entry.mood.colors.length]}22`, border: `1px solid ${entry.mood.colors[i % entry.mood.colors.length]}` }}>
                    #{word}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}