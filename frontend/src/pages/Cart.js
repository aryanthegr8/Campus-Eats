import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Cart.css';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    paymentMethod: 'cash',
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    specialInstructions: ''
  });

  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Initialize delivery address with user's address
  React.useEffect(() => {
    if (user?.address) {
      setOrderData(prev => ({
        ...prev,
        deliveryAddress: user.address
      }));
    }
  }, [user]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('deliveryAddress.')) {
      const addressField = name.split('.')[1];
      setOrderData(prev => ({
        ...prev,
        deliveryAddress: {
          ...prev.deliveryAddress,
          [addressField]: value
        }
      }));
    } else {
      setOrderData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const { deliveryAddress } = orderData;
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.state || !deliveryAddress.zipCode) {
      toast.error('Please fill in all delivery address fields');
      return;
    }

    setLoading(true);
    
    try {
      const orderItems = items.map(item => ({
        menuItem: item._id,
        quantity: item.quantity
      }));

      const response = await axios.post('/api/orders', {
        items: orderItems,
        paymentMethod: orderData.paymentMethod,
        deliveryAddress: orderData.deliveryAddress,
        specialInstructions: orderData.specialInstructions
      });

      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/orders/${response.data.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items from our menu</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/menu')}
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            <h2>Order Items</h2>
            {items.map(item => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  {item.image && item.image !== 'default-food.jpg' ? (
                    <img src={`/uploads/${item.image}`} alt={item.name} />
                  ) : (
                    <div className="placeholder-image">
                      <i className="fas fa-utensils"></i>
                    </div>
                  )}
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)} each</p>
                </div>
                
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>$2.99</span>
            </div>
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>${(total + 2.99).toFixed(2)}</span>
            </div>
            
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              <h3>Delivery Information</h3>
              
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="deliveryAddress.street"
                  value={orderData.deliveryAddress.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="deliveryAddress.city"
                    value={orderData.deliveryAddress.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="deliveryAddress.state"
                    value={orderData.deliveryAddress.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="deliveryAddress.zipCode"
                    value={orderData.deliveryAddress.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  name="paymentMethod"
                  value={orderData.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="wallet">Digital Wallet</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Special Instructions (Optional)</label>
                <textarea
                  name="specialInstructions"
                  value={orderData.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Any special requests or instructions..."
                  rows="3"
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Placing Order...
                  </>
                ) : (
                  `Place Order - $${(total + 2.99).toFixed(2)}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
