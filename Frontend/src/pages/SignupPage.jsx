import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup:", { name, email, password });
    // Add signup logic here
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2 className="signup-title">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />

        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        <p className="signup-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="signup-link">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
