import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function AnalyticsPage() {

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://mood-board-ai.onrender.com",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEntries(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // Mood trend
  const lineData = entries
    .slice()
    .reverse()
    .map((entry, index) => ({
      day: index + 1,
      score: entry.mood.score
    }));

  // Emotion counts
  const emotionMap = {};

  entries.forEach((entry) => {

    const emotion = entry.mood.emotion;

    emotionMap[emotion] =
      (emotionMap[emotion] || 0) + 1;

  });

  const pieData = Object.keys(emotionMap).map((emotion) => ({
    name: emotion,
    value: emotionMap[emotion]
  }));

  const COLORS = [
    "#A855F7",
    "#EC4899",
    "#3B82F6",
    "#10B981",
    "#F59E0B"
  ];

  const averageMood =
    entries.length > 0
      ? (
          entries.reduce(
            (sum, e) => sum + e.mood.score,
            0
          ) / entries.length
        ).toFixed(1)
      : 0;

  const mostCommonEmotion =
    pieData.length > 0
      ? pieData.reduce((a, b) =>
          a.value > b.value ? a : b
        ).name
      : "None";

  return (
    <div className="min-h-screen bg-dark px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-10">
          📊 Analytics Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="card text-center">
            <h2 className="text-muted mb-2">
              Average Mood
            </h2>

            <p className="text-4xl font-bold text-white">
              {averageMood}/10
            </p>
          </div>

          <div className="card text-center">
            <h2 className="text-muted mb-2">
              Most Common Emotion
            </h2>

            <p className="text-3xl font-bold text-white capitalize">
              {mostCommonEmotion}
            </p>
          </div>

          <div className="card text-center">
            <h2 className="text-muted mb-2">
              Total Entries
            </h2>

            <p className="text-4xl font-bold text-white">
              {entries.length}
            </p>
          </div>

        </div>

        {/* Mood Trend */}
        <div className="card mb-10">

          <h2 className="text-white text-2xl mb-6">
            Mood Score Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#A855F7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}
        <div className="card">

          <h2 className="text-white text-2xl mb-6">
            Emotion Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}