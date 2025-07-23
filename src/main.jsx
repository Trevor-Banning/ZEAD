import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./pages/navbar/navbar";
import Home from "./pages/home/home";
import Blog from "./pages/blog/Blog";
import GalleryPage from "./pages/gallery/GalleryPage";
import Calendar from "./pages/calendar/Calendar";
import ProjectsPage from "./pages/projects/projectsPage";
import Login from "./pages/login/login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => (
  <Router>
    <div className="page-container">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <PrivateRoute>
              <GalleryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <ProjectsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
