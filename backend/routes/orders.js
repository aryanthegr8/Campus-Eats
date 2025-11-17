const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getUserOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const orderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.menuItem')
    .isMongoId()
    .withMessage('Invalid menu item ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('paymentMethod')
    .isIn(['cash', 'card', 'upi', 'wallet'])
    .withMessage('Please select a valid payment method'),
  body('deliveryAddress.street')
    .notEmpty()
    .withMessage('Street address is required'),
  body('deliveryAddress.city')
    .notEmpty()
    .withMessage('City is required'),
  body('deliveryAddress.state')
    .notEmpty()
    .withMessage('State is required'),
  body('deliveryAddress.zipCode')
    .notEmpty()
    .withMessage('Zip code is required')
];

const statusValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'])
    .withMessage('Please provide a valid status')
];

// Protected routes
router.post('/', protect, orderValidation, createOrder);
router.get('/', protect, getUserOrders);
router.get('/stats', protect, admin, getOrderStats);
router.get('/all', protect, admin, getAllOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, admin, statusValidation, updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
