import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import JournalPage from "./pages/JournalPage";
import HistoryPage from "./pages/HistoryPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import HeatmapPage from "./pages/HeatmapPage";
import InsightsPage from "./pages/InsightsPage";

import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />

        <Routes>

          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/journal"
            element={
              <PrivateRoute>
                <JournalPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/history"
            element={
              <PrivateRoute>
                <HistoryPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <AnalyticsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/heatmap"
            element={
              <PrivateRoute>
                <HeatmapPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/insights"
            element={
              <PrivateRoute>
                <InsightsPage />
              </PrivateRoute>
            }
          />

        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;