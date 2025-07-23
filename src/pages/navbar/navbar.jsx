import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    setShowMenu(false);
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/blog", label: "Blog" },
    { path: "/gallery", label: "Gallery" },
    { path: "/calendar", label: "Calendar" },
    { path: "/projects", label: "Projects" },
  ];

  return (
    <nav className="nav-container">
      <div className="nav-logo">/Zead</div>

      <div className="nav-links">
        {navItems.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${pathname === path ? "active" : ""}`}
          >
            {label}
          </Link>
        ))}

        {currentUser ? (
          <div className="user-menu">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="user-menu-toggle"
            >
              ☰
            </button>
            {showMenu && (
              <div className="user-dropdown">
                <p className="user-email">{currentUser.email}</p>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-link login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
