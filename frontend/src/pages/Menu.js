import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import '../styles/Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false
  });
  const [loading, setLoading] = useState(true);

  const { addToCart, getItemQuantity } = useCart();

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, [selectedCategory, searchTerm, filters]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);
      if (filters.vegetarian) params.append('vegetarian', 'true');
      if (filters.vegan) params.append('vegan', 'true');
      if (filters.glutenFree) params.append('glutenFree', 'true');

      const res = await axios.get(`/api/menu?${params}`);
      setMenuItems(res.data.data);
    } catch (error) {
      toast.error('Error fetching menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/menu/categories');
      setCategories(res.data.data);
    } catch (error) {
      console.error('Error fetching categories');
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const formatCategory = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="menu">
      <div className="container">
        <h1>Our Menu</h1>
        
        {/* Search and Filters */}
        <div className="menu-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          
          <div className="filters">
            <div className="category-filter">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {formatCategory(category)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="dietary-filters">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.vegetarian}
                  onChange={() => handleFilterChange('vegetarian')}
                />
                <span>Vegetarian</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.vegan}
                  onChange={() => handleFilterChange('vegan')}
                />
                <span>Vegan</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.glutenFree}
                  onChange={() => handleFilterChange('glutenFree')}
                />
                <span>Gluten Free</span>
              </label>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading menu items...</p>
          </div>
        ) : (
          <div className="menu-grid">
            {menuItems.length > 0 ? (
              menuItems.map(item => (
                <div key={item._id} className="menu-item-card">
                  <div className="item-image">
                    {item.image && item.image !== 'default-food.jpg' ? (
                      <img src={`/uploads/${item.image}`} alt={item.name} />
                    ) : (
                      <div className="placeholder-image">
                        <i className="fas fa-utensils"></i>
                      </div>
                    )}
                    <div className="item-badges">
                      {item.isVegetarian && <span className="badge vegetarian">V</span>}
                      {item.isVegan && <span className="badge vegan">VG</span>}
                      {item.isGlutenFree && <span className="badge gluten-free">GF</span>}
                    </div>
                  </div>
                  
                  <div className="item-content">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    
                    <div className="item-details">
                      <span className="prep-time">
                        <i className="fas fa-clock"></i>
                        {item.preparationTime} min
                      </span>
                      {item.spiceLevel !== 'none' && (
                        <span className="spice-level">
                          <i className="fas fa-pepper-hot"></i>
                          {item.spiceLevel}
                        </span>
                      )}
                    </div>
                    
                    <div className="item-footer">
                      <span className="item-price">${item.price.toFixed(2)}</span>
                      <button
                        className="btn btn-primary add-to-cart-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        <i className="fas fa-plus"></i>
                        Add to Cart
                        {getItemQuantity(item._id) > 0 && (
                          <span className="cart-quantity">
                            ({getItemQuantity(item._id)})
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-items">
                <i className="fas fa-search"></i>
                <h3>No items found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
