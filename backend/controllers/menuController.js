const MenuItem = require('../models/MenuItem');
const { validationResult } = require('express-validator');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res) => {
  try {
    const { category, search, vegetarian, vegan, glutenFree } = req.query;
    let query = { isAvailable: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by dietary preferences
    if (vegetarian === 'true') {
      query.isVegetarian = true;
    }
    if (vegan === 'true') {
      query.isVegan = true;
    }
    if (glutenFree === 'true') {
      query.isGlutenFree = true;
    }

    let menuItems;

    // Search functionality
    if (search) {
      menuItems = await MenuItem.find({
        ...query,
        $text: { $search: search }
      }).sort({ score: { $meta: 'textScore' } });
    } else {
      menuItems = await MenuItem.find(query).sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: 'Server error fetching menu items' });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(500).json({ message: 'Server error fetching menu item' });
  }
};

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const menuItem = await MenuItem.create({
      ...req.body,
      image: req.file ? req.file.filename : 'default-food.jpg'
    });

    res.status(201).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ message: 'Server error creating menu item' });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = async (req, res) => {
  try {
    let menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Update fields
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Update menu item error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(500).json({ message: 'Server error updating menu item' });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Delete menu item error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(500).json({ message: 'Server error deleting menu item' });
  }
};

// @desc    Get menu categories
// @route   GET /api/menu/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category', { isAvailable: true });
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

module.exports = {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getCategories
};
