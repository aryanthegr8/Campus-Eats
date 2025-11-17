const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Sample users data
const users = [
  {
    name: 'Admin User',
    email: 'admin@campuseats.com',
    password: 'admin123',
    phone: '1234567890',
    address: {
      street: '123 Admin Street',
      city: 'Campus City',
      state: 'CA',
      zipCode: '12345'
    },
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '9876543210',
    address: {
      street: '456 Student Ave',
      city: 'Campus City',
      state: 'CA',
      zipCode: '12345'
    },
    role: 'user'
  }
];

// Sample menu items data
const menuItems = [
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh tomatoes, mozzarella cheese, and basil leaves',
    price: 12.99,
    category: 'pizza',
    preparationTime: 25,
    isVegetarian: true,
    ingredients: ['tomatoes', 'mozzarella', 'basil', 'pizza dough'],
    spiceLevel: 'none'
  },
  {
    name: 'Chicken Burger',
    description: 'Juicy grilled chicken breast with lettuce, tomato, and mayo in a sesame bun',
    price: 8.99,
    category: 'burgers',
    preparationTime: 15,
    ingredients: ['chicken breast', 'lettuce', 'tomato', 'mayo', 'sesame bun'],
    spiceLevel: 'mild'
  },
  {
    name: 'Pad Thai',
    description: 'Traditional Thai stir-fried noodles with shrimp, tofu, and peanuts',
    price: 10.99,
    category: 'chinese',
    preparationTime: 20,
    ingredients: ['rice noodles', 'shrimp', 'tofu', 'peanuts', 'bean sprouts'],
    spiceLevel: 'medium'
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan cheese, croutons, and Caesar dressing',
    price: 7.99,
    category: 'appetizers',
    preparationTime: 10,
    isVegetarian: true,
    ingredients: ['romaine lettuce', 'parmesan cheese', 'croutons', 'caesar dressing'],
    spiceLevel: 'none'
  },
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, creamy tomato-based curry sauce',
    price: 13.99,
    category: 'indian',
    preparationTime: 30,
    ingredients: ['chicken', 'tomatoes', 'cream', 'butter', 'spices'],
    spiceLevel: 'medium'
  },
  {
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, pancetta, and black pepper',
    price: 11.99,
    category: 'italian',
    preparationTime: 20,
    ingredients: ['spaghetti', 'eggs', 'parmesan', 'pancetta', 'black pepper'],
    spiceLevel: 'none'
  },
  {
    name: 'Chocolate Brownie',
    description: 'Rich and fudgy chocolate brownie served warm with vanilla ice cream',
    price: 5.99,
    category: 'desserts',
    preparationTime: 5,
    isVegetarian: true,
    ingredients: ['chocolate', 'flour', 'eggs', 'butter', 'vanilla ice cream'],
    spiceLevel: 'none'
  },
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice packed with vitamin C',
    price: 3.99,
    category: 'beverages',
    preparationTime: 5,
    isVegetarian: true,
    isVegan: true,
    ingredients: ['fresh oranges'],
    spiceLevel: 'none'
  },
  {
    name: 'Veggie Spring Rolls',
    description: 'Crispy spring rolls filled with fresh vegetables and served with sweet chili sauce',
    price: 6.99,
    category: 'snacks',
    preparationTime: 12,
    isVegetarian: true,
    isVegan: true,
    ingredients: ['vegetables', 'spring roll wrapper', 'sweet chili sauce'],
    spiceLevel: 'mild'
  },
  {
    name: 'Fish Tacos',
    description: 'Grilled fish tacos with cabbage slaw and lime crema',
    price: 9.99,
    category: 'main-course',
    preparationTime: 18,
    ingredients: ['fish', 'tortillas', 'cabbage', 'lime', 'sour cream'],
    spiceLevel: 'mild'
  }
];

// Seed function
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await MenuItem.deleteMany({});

    // Hash passwords for users
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert users
    console.log('👥 Seeding users...');
    await User.insertMany(users);
    console.log(`✅ ${users.length} users created`);

    // Insert menu items
    console.log('🍕 Seeding menu items...');
    await MenuItem.insertMany(menuItems);
    console.log(`✅ ${menuItems.length} menu items created`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Admin: admin@campuseats.com / admin123');
    console.log('User: john@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
if (require.main === module) {
  seedData();
}

module.exports = seedData;
