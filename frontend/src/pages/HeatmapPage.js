import { useEffect, useState } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function HeatmapPage() {

  const [values, setValues] = useState([]);

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

      const data = res.data.map(entry => ({
        date: entry.createdAt.slice(0, 10),
        count: entry.mood.score
      }));

      setValues(data);

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <div className="min-h-screen bg-dark px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-white text-4xl font-bold mb-10">
          📅 Mood Calendar
        </h1>

        <div className="card p-8">

          <CalendarHeatmap
            startDate={new Date("2026-01-01")}
            endDate={new Date()}
            values={values}
            classForValue={(value) => {

              if (!value)
                return "color-empty";

              if (value.count <= 3)
                return "color-github-1";

              if (value.count <= 6)
                return "color-github-2";

              return "color-github-4";

            }}
          />

        </div>

      </div>

    </div>
  );
}