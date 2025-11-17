import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/OrderDetails.css';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`/api/orders/${id}`);
      setOrder(res.data.data);
    } catch (error) {
      toast.error('Error fetching order details');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await axios.put(`/api/orders/${id}/cancel`);
        toast.success('Order cancelled successfully');
        fetchOrderDetails();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error cancelling order');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffa500';
      case 'confirmed': return '#007bff';
      case 'preparing': return '#17a2b8';
      case 'ready': return '#28a745';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canCancelOrder = (status) => {
    return ['pending', 'confirmed'].includes(status);
  };

  if (loading) {
    return (
      <div className="order-details">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details">
        <div className="container">
          <div className="error-message">
            <h2>Order not found</h2>
            <button onClick={() => navigate('/orders')} className="btn btn-primary">
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details">
      <div className="container">
        <div className="order-header">
          <button onClick={() => navigate('/orders')} className="back-btn">
            <i className="fas fa-arrow-left"></i>
            Back to Orders
          </button>
          <h1>Order #{order.orderNumber}</h1>
        </div>

        <div className="order-content">
          <div className="order-info-card">
            <div className="order-status-section">
              <h2>Order Status</h2>
              <div className="status-info">
                <span 
                  className="status-badge large"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <div className="status-details">
                  <p><strong>Ordered:</strong> {formatDate(order.createdAt)}</p>
                  {order.estimatedDeliveryTime && (
                    <p><strong>Estimated Delivery:</strong> {formatDate(order.estimatedDeliveryTime)}</p>
                  )}
                  {order.actualDeliveryTime && (
                    <p><strong>Delivered:</strong> {formatDate(order.actualDeliveryTime)}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="order-items-section">
              <h2>Order Items</h2>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-detail">
                    <div className="item-image">
                      {item.menuItem.image && item.menuItem.image !== 'default-food.jpg' ? (
                        <img src={`/uploads/${item.menuItem.image}`} alt={item.menuItem.name} />
                      ) : (
                        <div className="placeholder-image">
                          <i className="fas fa-utensils"></i>
                        </div>
                      )}
                    </div>
                    <div className="item-info">
                      <h3>{item.menuItem.name}</h3>
                      <p className="item-description">{item.menuItem.description}</p>
                      <div className="item-pricing">
                        <span className="quantity">Qty: {item.quantity}</span>
                        <span className="price">${item.price.toFixed(2)} each</span>
                        <span className="total">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="delivery-info-section">
              <h2>Delivery Information</h2>
              <div className="delivery-details">
                <div className="address">
                  <h4>Delivery Address</h4>
                  <p>
                    {order.deliveryAddress.street}<br/>
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                  </p>
                </div>
                <div className="payment">
                  <h4>Payment Method</h4>
                  <p>{order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}</p>
                  <p className="payment-status">
                    Status: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </p>
                </div>
              </div>
              {order.specialInstructions && (
                <div className="special-instructions">
                  <h4>Special Instructions</h4>
                  <p>{order.specialInstructions}</p>
                </div>
              )}
            </div>

            <div className="order-summary-section">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${(order.totalAmount - 2.99).toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>$2.99</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {canCancelOrder(order.status) && (
              <div className="order-actions">
                <button 
                  onClick={handleCancelOrder}
                  className="btn btn-danger"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
