// src/pages/Login.jsx
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import "../login/Login.css";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">{isSignUp ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">
          {isSignUp ? "Create Account" : "Log In"}
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="login-toggle"
        >
          {isSignUp ? "Already have an account?" : "Create an account"}
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}
