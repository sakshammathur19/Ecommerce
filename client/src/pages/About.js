import React from "react";
import Layout from "../components/layout/Layout.js";
import "../styles/About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout title="About Us - TechSaksham Furniture">
      <div className="about-page container py-5">
        {/* Header Section */}
        <div className="about-header text-center mb-5">
          <h1>About TechSaksham Furniture</h1>
          <p className="lead">
            Crafting comfort and style for every home. Quality furniture that
            speaks elegance.
          </p>
        </div>

        {/* Content Section */}
        <div className="row align-items-center about-content">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src="/images/about.jpeg"
              alt="About Us"
              className="about-img shadow"
            />
          </div>
          <div className="col-lg-6">
            <h2>Our Mission</h2>
            <p>
              At TechSaksham Furniture, our mission is to bring you timeless
              designs with unmatched quality. We blend modern aesthetics with
              comfort, so every piece in your home tells a story.
            </p>

            <h2>Our Vision</h2>
            <p>
              To be the leading furniture brand that transforms houses into
              dream homes. Our vision is to provide stylish, durable, and
              sustainable furniture for every lifestyle.
            </p>

            <h2>Why Choose Us?</h2>
            <ul className="about-list">
              <li>Premium quality materials & craftsmanship</li>
              <li>Modern and ergonomic designs</li>
              <li>Eco-friendly & sustainable practices</li>
              <li>Exceptional customer support</li>
            </ul>
          </div>
        </div>

        {/* Call-to-action Section */}
        <div className="about-cta text-center mt-5">
          <h3>Ready to elevate your home?</h3>
          <p>
            Explore our collections and bring style to every corner of your
            home.
          </p>
          <Link to="/" className="btn btn-explore">
            Explore Now
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default About;
