import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h1>Techsaksham</h1>
          <p>
            Your premium furniture store. Bringing style & comfort to every
            corner of your home.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h2>Quick Links</h2>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/policy">Privacy Policy</Link>
          <Link to="/">Products</Link>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h2>Contact Us</h2>
          <p>📍 123 Furniture Street, Jaipur, India</p>
          <p>📞 +91 12345 67890</p>
          <p>✉️ support@techsaksham.com</p>

          {/* Social Icons */}
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

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Techsaksham. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
