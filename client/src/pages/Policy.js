import React from "react";
import Layout from "../components/layout/Layout.js";
import "../styles/Policy.css"; // We'll create this CSS file

const Policy = () => {
  return (
    <Layout title="Privacy Policy - TechSaksham Furniture">
      <div className="policy-page container py-5">
        {/* Header */}
        <div className="policy-header text-center mb-5">
          <h1>Privacy Policy</h1>
          <p className="lead">
            Your privacy matters to us. Learn how we collect, use, and protect your data.
          </p>
        </div>

        {/* Content Section */}
        <div className="row align-items-start policy-content">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src="/images/contactus.jpeg"
              alt="Privacy Policy"
              className="policy-img shadow"
            />
          </div>
          <div className="col-lg-6">
            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide to us when making purchases,
              signing up for newsletters, or interacting with our website.
            </p>

            <h2>How We Use Information</h2>
            <p>
              Your information helps us process orders, provide customer support, 
              and personalize your experience on our site.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              personal data from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Cookies</h2>
            <p>
              Our website uses cookies to improve user experience, analyze traffic, 
              and personalize content.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We do not sell your information. Some services we use may have their
              own privacy policies, and we recommend reviewing them.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;