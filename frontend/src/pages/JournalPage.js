import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const moodImages = {
  happy: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  calm: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  motivated: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  sad: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  hopeful: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  stressed: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
};

export default function JournalPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (text.trim().length < 10) return setError("Write a bit more before saving your reflection.");
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/mood/analyze", { text }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Your reflection is saved.");
      setResult(res.data.mood);
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const image = moodImages[result.emotion?.toLowerCase()] || moodImages.hopeful;

    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),_transparent_30%),linear-gradient(135deg,_#050816,_#0f172a)] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <img src={image} className="mb-8 h-64 w-full rounded-[2rem] object-cover shadow-2xl" alt="mood portrait" />
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-cyan-200">Your reflection</p>
            <h1 className="mb-3 font-display text-5xl font-semibold capitalize" style={{ color: result.colors[0] }}>
              {result.emotion}
            </h1>
            <p className="text-lg leading-8 text-slate-300">“{result.summary}”</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card mb-6">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400">Palette</p>
            <div className="flex flex-col gap-3 md:flex-row">
              {result.colors.map((color, i) => (
                <div key={i} className="flex-1 rounded-[1.2rem] border border-white/10 bg-slate-950/60 p-3">
                  <div className="mb-2 h-20 rounded-[1rem]" style={{ backgroundColor: color }} />
                  <span className="text-sm text-slate-300">{color}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="card mb-6">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-slate-400">Mood score</p>
            <div className="flex items-center gap-4">
              <div className="h-3 flex-1 rounded-full bg-slate-800">
                <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${result.score * 10}%`, backgroundColor: result.colors[0] }} />
              </div>
              <span className="text-2xl font-semibold" style={{ color: result.colors[0] }}>{result.score}/10</span>
            </div>
          </div>

          <div className="card mb-8">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400">Keywords</p>
            <div className="flex flex-wrap gap-2">
              {result.keywords.map((word, i) => (
                <span key={i} className="rounded-full px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: `${result.colors[i % result.colors.length]}22`, border: `1px solid ${result.colors[i % result.colors.length]}` }}>
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => { setResult(null); setText(""); }} className="btn-ghost flex-1 py-3">Write another reflection</button>
            <button onClick={() => navigate("/dashboard")} className="btn-primary flex-1 py-3">Return to dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),_transparent_30%),linear-gradient(135deg,_#050816,_#0f172a)] px-4 py-8 text-white sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mx-auto max-w-3xl">
        <button onClick={() => navigate("/dashboard")} className="mb-4 text-sm text-slate-300 transition hover:text-white">← Back</button>
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Journal</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-white">How did today feel?</h1>
          <p className="mt-3 text-lg text-slate-300">Write honestly, and your reflections will be translated into a calm, personal mood snapshot.</p>
        </div>

        {error && <div className="mb-4 rounded-[1.25rem] border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

        <div className="card">
          <textarea className="min-h-[280px] w-full resize-none bg-transparent text-lg leading-8 text-white placeholder:text-slate-500 focus:outline-none" rows={10} placeholder="Today felt..." value={text} onChange={(e) => setText(e.target.value)} />
          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-400">{text.length} characters</span>
            <button onClick={handleAnalyze} disabled={loading || text.length < 10} className="btn-primary px-5 py-3">
              {loading ? <ClipLoader size={20} color="#fff" /> : "Save reflection"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}