import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/AdminMenu.css';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'main-course',
    preparationTime: '',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: 'none',
    ingredients: '',
    image: null
  });

  const categories = [
    'appetizers', 'main-course', 'desserts', 'beverages', 
    'snacks', 'pizza', 'burgers', 'chinese', 'indian', 'italian'
  ];

  const spiceLevels = ['none', 'mild', 'medium', 'hot', 'extra-hot'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('/api/menu');
      setMenuItems(res.data.data);
    } catch (error) {
      toast.error('Error fetching menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'ingredients') {
        const ingredients = formData[key].split(',').map(item => item.trim()).filter(item => item);
        submitData.append(key, JSON.stringify(ingredients));
      } else if (key === 'image' && formData[key]) {
        submitData.append(key, formData[key]);
      } else if (key !== 'image') {
        submitData.append(key, formData[key]);
      }
    });

    try {
      if (editingItem) {
        await axios.put(`/api/menu/${editingItem._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Menu item updated successfully!');
      } else {
        await axios.post('/api/menu', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Menu item added successfully!');
      }
      
      fetchMenuItems();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving menu item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      preparationTime: item.preparationTime.toString(),
      isVegetarian: item.isVegetarian,
      isVegan: item.isVegan,
      isGlutenFree: item.isGlutenFree,
      spiceLevel: item.spiceLevel,
      ingredients: item.ingredients.join(', '),
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await axios.delete(`/api/menu/${id}`);
        toast.success('Menu item deleted successfully!');
        fetchMenuItems();
      } catch (error) {
        toast.error('Error deleting menu item');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'main-course',
      preparationTime: '',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      spiceLevel: 'none',
      ingredients: '',
      image: null
    });
  };

  const formatCategory = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="admin-menu">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading menu items...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-menu">
      <div className="container">
        <div className="page-header">
          <h1>Menu Management</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-plus"></i>
            Add New Item
          </button>
        </div>

        <div className="menu-grid">
          {menuItems.map(item => (
            <div key={item._id} className="menu-item-card admin">
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
                <p className="item-category">{formatCategory(item.category)}</p>
                <p className="item-description">{item.description}</p>
                
                <div className="item-details">
                  <span className="prep-time">
                    <i className="fas fa-clock"></i>
                    {item.preparationTime} min
                  </span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
                
                <div className="item-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    <i className="fas fa-edit"></i>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <i className="fas fa-trash"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="menu-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Item Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {formatCategory(cat)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="preparationTime">Prep Time (minutes)</label>
                    <input
                      type="number"
                      id="preparationTime"
                      name="preparationTime"
                      value={formData.preparationTime}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="spiceLevel">Spice Level</label>
                    <select
                      id="spiceLevel"
                      name="spiceLevel"
                      value={formData.spiceLevel}
                      onChange={handleInputChange}
                    >
                      {spiceLevels.map(level => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ingredients">Ingredients (comma-separated)</label>
                  <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    placeholder="e.g., tomatoes, cheese, basil"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                  />
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isVegetarian"
                      checked={formData.isVegetarian}
                      onChange={handleInputChange}
                    />
                    <span>Vegetarian</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isVegan"
                      checked={formData.isVegan}
                      onChange={handleInputChange}
                    />
                    <span>Vegan</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isGlutenFree"
                      checked={formData.isGlutenFree}
                      onChange={handleInputChange}
                    />
                    <span>Gluten Free</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
