import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const [meetingID, setMeetingID] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (meetingID.trim()) {
      navigate(`/meeting/${meetingID}`);
    } else {
      alert("Please enter a valid Meeting ID");
    }
  };

  return (
    <>
      <div className="landing-container">
        <header className="landing-header">
          <h1 className="landing-title">Connect with Anyone, Anywhere</h1>
          <p className="landing-subtitle">
            Free, secure video conferencing. Start or join a meeting instantly.
          </p>

          <input
            type="text"
            className="landing-input"
            placeholder="Enter Meeting ID"
            value={meetingID}
            onChange={(e) => setMeetingID(e.target.value)}
          />

          <div className="landing-button-group">
            <button className="landing-button join-button" onClick={handleJoin}>
              Join as Guest
            </button>
            <button
              className="landing-button login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="landing-button signup-button"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
          <p className="developer-message">
            Thanks for Visiting Us ❤️ Developed By :
            <span className="developer"> Yogesh Pote </span>
          </p>
        </header>
      </div>
      <p>Follow Us On :</p>
      
    </>
  );
}

export default LandingPage;
