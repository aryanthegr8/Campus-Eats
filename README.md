# Campus Eats 🍕

A full-featured food ordering website built with the MERN stack, designed specifically for campus food delivery services.

## 🚀 Features

### For Customers
- **User Authentication**: Secure login and registration system
- **Browse Menu**: View categorized food items with detailed descriptions
- **Shopping Cart**: Add/remove items with quantity management
- **Order Placement**: Seamless checkout process
- **Order Tracking**: Real-time order status updates
- **User Profile**: Manage personal information and order history

### For Administrators
- **Admin Dashboard**: Comprehensive management interface
- **Menu Management**: Add, edit, and delete food items
- **Order Management**: View and update order statuses
- **User Management**: Monitor registered users
- **Analytics**: Basic sales and order statistics

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, Axios, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcryptjs for hashing
- **Development**: Nodemon, Concurrently

## 📁 Project Structure

```
campus-eats/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── MenuItem.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── menu.js
│   │   └── orders.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── styles/
│   ├── package.json
│   └── ...
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-eats
   ```

2. **Install dependencies**
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

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/campus-eats
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Database Setup**
   - Make sure MongoDB is running on your system
   - The application will automatically create the database and collections

5. **Run the application**
   ```bash
   # From the root directory, run both frontend and backend
   npm run dev
   
   # Or run them separately:
   # Backend (from backend directory)
   npm run server
   
   # Frontend (from frontend directory)
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `POST /api/menu` - Add menu item (Admin only)
- `PUT /api/menu/:id` - Update menu item (Admin only)
- `DELETE /api/menu/:id` - Delete menu item (Admin only)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/all` - Get all orders (Admin only)
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin only)

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Interface**: Clean and intuitive user interface
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback for user actions

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Route-level authentication checks
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to MongoDB Atlas
4. Deploy using Git

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the build folder to your preferred hosting service
3. Update API endpoints to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Thanks to the MERN stack community
- Inspiration from various food delivery platforms
- Campus community for feedback and testing

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Coding! 🚀**
