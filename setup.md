# Campus Eats Setup Guide

## 🚀 Quick Start Instructions

Follow these steps to get your Campus Eats food ordering website up and running:

### 1. Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download here](https://git-scm.com/)

### 2. Database Setup

#### Option A: Local MongoDB
1. Install and start MongoDB on your local machine
2. MongoDB will run on `mongodb://localhost:27017` by default

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/campus-eats`)
4. Update the `MONGODB_URI` in `backend/.env` with your connection string

### 3. Environment Configuration
The backend `.env` file is already configured with default values:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-eats
JWT_SECRET=your_jwt_secret_key_change_this_in_production_2024_campus_eats_secure_key
```

**Important**: Change the `JWT_SECRET` to a secure random string in production!

### 4. Install Dependencies
All dependencies are already installed, but if you need to reinstall:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 5. Seed Sample Data (Optional)
To populate your database with sample menu items and users:

```bash
cd backend
node seedData.js
```

This will create:
- **Admin User**: admin@campuseats.com / admin123
- **Regular User**: john@example.com / password123
- **10 Sample Menu Items** across different categories

### 6. Start the Application

#### Option A: Start Both Frontend and Backend Together
```bash
# From the root directory
npm run dev
```

#### Option B: Start Separately
```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm start
```

### 7. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🎯 Testing the Application

### User Features
1. **Register** a new account or login with sample credentials
2. **Browse Menu** - View food items with filters and search
3. **Add to Cart** - Add items and manage quantities
4. **Place Orders** - Complete the checkout process
5. **View Orders** - Track your order history and status
6. **Profile Management** - Update your information

### Admin Features
1. **Login** with admin credentials: admin@campuseats.com / admin123
2. **Admin Dashboard** - View statistics and recent orders
3. **Menu Management** - Add, edit, and delete menu items
4. **Order Management** - Update order statuses
5. **Upload Images** - Add food images (stored in backend/uploads/)

## 🛠️ Development Commands

```bash
# Root directory commands
npm run dev          # Start both frontend and backend
npm run server       # Start only backend
npm run client       # Start only frontend
npm run build        # Build frontend for production

# Backend commands (from backend directory)
npm start           # Start backend in production mode
npm run dev         # Start backend in development mode
node seedData.js    # Seed sample data

# Frontend commands (from frontend directory)
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
```

## 📁 Project Structure Overview

```
campus-eats/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── uploads/           # File uploads storage
│   ├── .env               # Environment variables
│   ├── seedData.js        # Sample data seeder
│   └── server.js          # Main server file
├── frontend/               # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   └── styles/        # CSS stylesheets
│   └── package.json
├── package.json           # Root package.json
└── README.md             # Main documentation
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - For Atlas, ensure your IP is whitelisted

2. **Port Already in Use**
   - Backend: Change `PORT` in `backend/.env`
   - Frontend: It will automatically suggest a different port

3. **CORS Issues**
   - The backend is configured to accept requests from the frontend
   - Check that both servers are running on correct ports

4. **Image Upload Issues**
   - Ensure `backend/uploads/` directory exists
   - Check file permissions

### Reset Database
```bash
cd backend
node -e "require('./seedData.js')()"
```

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables on your hosting platform
2. Use MongoDB Atlas for the database
3. Update `MONGODB_URI` with your cloud database URL

### Frontend (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `build` folder
3. Update API endpoints to point to your deployed backend

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify environment variables are set correctly
4. Check that MongoDB is running and accessible

## 🎉 You're Ready!

Your Campus Eats food ordering website is now ready to use! Enjoy exploring all the features and customizing it for your needs.
