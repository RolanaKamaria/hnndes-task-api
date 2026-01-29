import { Routes, Route, Navigate } from "react-router-dom";
import Issues from "./pages/Issues.jsx";
import IssueDetail from "./pages/IssueDetail.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Navigate to="/issues" replace />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issue/:number" element={<IssueDetail />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h2 className="text-2xl font-bold text-blue-600">
                404 – Page not found
              </h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
