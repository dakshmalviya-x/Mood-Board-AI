import { useEffect, useState } from "react";
import axios from "axios";

export default function InsightsPage() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsight();
  }, []);

  const fetchInsight = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://mood-board-ai.onrender.com", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInsight(res.data.insight);
    } catch (err) {
      console.log(err);
      setInsight("Your reflections are still taking shape. Come back after a few entries to see a fuller picture.");
    } finally {
      setLoading(false);
    }
  };

  const blocks = insight.split("\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),_transparent_30%),linear-gradient(135deg,_#050816,_#0f172a)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Reflection</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-white">Your weekly mood portrait</h1>
          <p className="mt-3 max-w-2xl text-slate-300">A gentle summary of your recent patterns, built from your own journal entries.</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl">
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 w-2/3 rounded-full bg-white/10" />
              <div className="h-4 w-full rounded-full bg-white/10" />
              <div className="h-4 w-5/6 rounded-full bg-white/10" />
            </div>
          ) : (
            <div className="space-y-4">
              {blocks.map((block, index) => (
                <div key={index} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-slate-200">
                  {block}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}