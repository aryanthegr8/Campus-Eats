import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const features = [
    {
      icon: 'fas fa-clock',
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30-45 minutes'
    },
    {
      icon: 'fas fa-utensils',
      title: 'Quality Food',
      description: 'Fresh ingredients and delicious meals'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Easy Ordering',
      description: 'Simple and intuitive ordering process'
    },
    {
      icon: 'fas fa-credit-card',
      title: 'Secure Payment',
      description: 'Multiple payment options available'
    }
  ];

  const popularItems = [
    {
      name: 'Margherita Pizza',
      price: '$12.99',
      image: '/api/placeholder/300/200'
    },
    {
      name: 'Chicken Burger',
      price: '$8.99',
      image: '/api/placeholder/300/200'
    },
    {
      name: 'Pad Thai',
      price: '$10.99',
      image: '/api/placeholder/300/200'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Campus Eats</h1>
          <p>Your favorite campus food delivery service</p>
          <p>Delicious meals delivered right to your dorm or classroom</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">
              Order Now
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <i className="fas fa-pizza-slice hero-icon"></i>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Campus Eats?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="popular-items">
        <div className="container">
          <h2>Popular Items</h2>
          <div className="items-grid">
            {popularItems.map((item, index) => (
              <div key={index} className="item-card">
                <div className="item-image">
                  <i className="fas fa-image placeholder-icon"></i>
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/menu" className="btn btn-primary">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Order?</h2>
          <p>Join thousands of students who trust Campus Eats for their daily meals</p>
          <Link to="/menu" className="btn btn-primary btn-large">
            Start Ordering
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
