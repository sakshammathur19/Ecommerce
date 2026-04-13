import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <h1>OakAura</h1>
          <p>
            Crafted in Wood, Designed for Life. Premium furniture built with
            elegance, durability, and modern aesthetics.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h2>Quick Links</h2>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/policy">Privacy Policy</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h2>Contact</h2>
          <p>📍 Jaipur, Rajasthan, India</p>
          <p>📞 +91 9784957969</p>
          <p>✉️ skdsaksham@gmail.com</p>

          {/* SOCIAL */}
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} ALL RIGHTS ARE RESERVED
      </div>
    </footer>
  );
};

export default Footer;
