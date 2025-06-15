import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ComputerIcon from "@mui/icons-material/Computer";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./LandingPage.css";

function LandingPage() {
  const [meetingID, setMeetingID] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoin = () => {
    if (meetingID.trim()) {
      navigate(`/meeting/${meetingID}`);
    } else {
      alert("Please enter a valid Meeting ID");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          StripChat
        </div>
        <div className="navbar-menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <button onClick={() => navigate("/joinAsGuest")}>
            Join As Guest
          </button>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>
      </nav>

      {/* Landing Content */}
      <div className="landing-container">
        <header className="landing-header">
          <h1 className="landing-title">Connect with Anyone, Anywhere</h1>
          <p className="landing-subtitle">
            Free, secure video conferencing. Start or join a meeting instantly.
          </p>

          <p className="developer-message">
            Thanks for Visiting Us ❤️ Developed By :
            <span className="developer"> Yogesh Pote </span>
          </p>
        </header>
      </div>
      <div className="reviews">
        <h1 className="landing-title">See How Real People Found Real Moments Here.</h1>
        <div className="images">
          <img className="img" src="./phoneCall.png" alt="" />
          <img className="img" src="./callWithGirl.jpg" alt="" />
          <img className="img" src="./meeting.jpg" alt="" />
        </div>
      </div>
      {/* Social Media Section */}
      <div className="social-section">
        <p className="social-text">Follow Us On :</p>
        <div className="social-icons">
          <a
            href="https://github.com/yogpote035"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon fontSize="large" />
          </a>
          <a
            href="https://linkedin.com/in/yogesh-pote"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon fontSize="large" />
          </a>
          <a
            href="https://instagram.com/_its_yogesh_pote"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon fontSize="large" />
          </a>
          <a
            href="https://yogpote035.github.io/Portfolio-Website/"
            target="_blank"
            rel="noreferrer"
          >
            <ComputerIcon fontSize="large" />
          </a>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
