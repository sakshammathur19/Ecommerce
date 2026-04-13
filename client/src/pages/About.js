import React from "react";
import Layout from "../components/layout/Layout.js";
import "../styles/About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout title="About Us - OakAura">
      <div className="about-page container py-5">
        {/* HEADER */}
        <div className="about-header text-center mb-5">
          <h1>About OakAura</h1>
          <p className="lead">
            Crafted in Wood, Designed for Life. Where elegance meets timeless
            craftsmanship.
          </p>
        </div>

        {/* CONTENT */}
        <div className="row align-items-center about-content">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src="aboutus.png"
              alt="OakAura Furniture"
              className="about-img shadow"
            />
          </div>

          <div className="col-lg-6">
            <h2>Our Mission</h2>
            <p>
              At OakAura, our mission is to redefine living spaces with
              furniture that blends durability, elegance, and comfort. Every
              product is crafted with precision to bring warmth and
              sophistication into your home.
            </p>

            <h2>Our Vision</h2>
            <p>
              To become a globally trusted furniture brand known for innovation,
              sustainability, and timeless wooden craftsmanship.
            </p>

            <h2>Why Choose OakAura?</h2>
            <ul className="about-list">
              <li>Premium handcrafted wooden furniture</li>
              <li>Modern luxury designs</li>
              <li>Eco-friendly & sustainable materials</li>
              <li>Long-lasting durability</li>
              <li>Customer-first approach</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta text-center mt-5">
          <h3>Transform Your Space with OakAura</h3>
          <p>
            Discover furniture that brings warmth, elegance, and life into your
            home.
          </p>
          <Link to="/" className="btn btn-explore">
            Explore Collection
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default About;
