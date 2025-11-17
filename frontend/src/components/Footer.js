import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Campus Eats</h3>
            <p>Your favorite campus food delivery service</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
            <p><i className="fas fa-envelope"></i> info@campuseats.com</p>
            <p><i className="fas fa-map-marker-alt"></i> Campus University, Building A</p>
          </div>
          
          <div className="footer-section">
            <h4>Hours</h4>
            <p>Monday - Friday: 8:00 AM - 10:00 PM</p>
            <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Campus Eats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
