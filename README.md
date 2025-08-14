# MultiVend - Full-Stack Microservices E-commerce Platform

A complete e-commerce platform built with microservices architecture featuring user management, product catalog, order processing, role-based access control, and a modern React frontend with admin dashboard.

## 🏗️ Architecture

- **User Service** (Port 3001) - Authentication & User Management
- **Product Service** (Port 3002) - Product CRUD Operations  
- **Order Service** (Port 3003) - Order Processing & Management
- **Frontend** (React + Vite) - User Interface with Role-Based Access

## ✨ Key Features

### � User Privilege System
- **Buyer Role**: Browse and purchase products
- **Seller Role**: Buy products + manage their own product listings
- **Admin Role**: Complete platform management with dedicated dashboard

### 👨‍💼 Admin Dashboard
- Comprehensive admin panel with tabs for Users, Products, and Orders
- View and manage all platform data
- Cascading delete operations (delete user removes all their data)
- Real-time data management through secure APIs

### 🛍️ Enhanced Shopping Experience
- **Buy Now** functionality for instant purchases
- Advanced product detail pages with dual action buttons
- Seamless authentication flow during purchase
- Complete order management with cancellation support

### 👤 User Profile Management
- In-app profile editing (click user icon in navbar)
- Switch between buyer/seller roles
- Update personal information
- Role-based UI adjustments

## �🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js (for frontend development)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/amaljyothis2003/MultiVend.git
   cd MultiVend
   ```

2. **Environment Configuration**
   ```bash
   # Backend services - Copy the example environment file
   cp .env.example .env
   
   # Frontend configuration
   cd frontend
   cp .env.example .env
   
   # ⚠️ IMPORTANT: Edit both .env files and update sensitive values
   # See Security section below for details
   ```

3. **Start all services**
   ```bash
   docker compose up --build
   ```

4. **Start frontend development server**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔒 Security & Environment Configuration

### ⚠️ IMPORTANT SECURITY NOTES:
- **Never commit `.env` files to version control**
- The `.env.example` files contain safe defaults for development only
- **Always change sensitive values in production**
- Use environment-specific configuration management

### Environment Variables:

**Backend Services:**
- `JWT_SECRET` - Secret key for JWT token generation (MUST be changed)
- Database URIs and service ports
- Service URLs for inter-service communication

**Frontend Configuration:**
- Service API endpoints
- Admin authentication settings (secured via environment variables)
- Application-specific configuration

**See respective `.env.example` files for all available options.**

## 🎯 User Roles & Permissions

### 👤 Buyer
- ✅ Browse and search products
- ✅ View product details
- ✅ Place and manage orders
- ✅ Edit personal profile
- ❌ Cannot manage products

### 🏪 Seller  
- ✅ All buyer permissions
- ✅ Add, edit, and delete own products
- ✅ Manage product inventory
- ✅ View sales analytics

### 👑 Admin
- ✅ Complete platform oversight
- ✅ User database management
- ✅ Product database management
- ✅ Order database management
- ✅ Dedicated admin dashboard
- ✅ Cascading delete operations

## 📁 Project Structure

```
MultiVend/
├── user-service/          # User authentication microservice
├── product-service/       # Product management microservice
├── order-service/         # Order processing microservice
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components (including AdminDashboard)
│   │   ├── contexts/     # React contexts (AuthContext with roles)
│   │   └── services/     # API service layers
├── docker-compose.yml    # Docker services configuration
├── .env.example         # Backend environment template
├── frontend/.env.example # Frontend environment template
└── README.md           # This documentation
```

## 🔧 Development

### APIs Available:
- **User Service**: http://localhost:3001
- **Product Service**: http://localhost:3002  
- **Order Service**: http://localhost:3003
- **Frontend**: http://localhost:5173 (Vite dev server)

### Special Routes:
- **Admin Dashboard**: `/admin` (admin users only)
- **Product Management**: `/manage-products` (sellers and admin)
- **User Profile**: Click user icon in navbar
- **Order Confirmation**: `/order-confirmation` (Buy Now flow)

### Database Access:
- User DB: MongoDB on port 27017
- Product DB: MongoDB on port 27018
- Order DB: MongoDB on port 27019

## 🛡️ Authentication & Security

### Admin Access
- Admin authentication is handled securely through environment variables
- Admin credentials are never hardcoded in the source code
- Check `frontend/.env.example` for configuration template
- Admin UI is completely separate from regular user interface

### JWT Security
- Secure JWT token generation and validation
- Role-based access control implemented
- Protected routes based on user privileges
- Automatic token refresh and validation

## 🚀 Production Deployment

### Before deploying to production:

1. **Generate secure secrets**:
   ```bash
   # Generate a secure JWT secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Update environment variables**:
   - Use strong, unique JWT_SECRET
   - Configure production database URLs
   - Set up admin credentials securely
   - Configure production API endpoints
   - Enable HTTPS and secure CORS

3. **Security checklist**:
   - [ ] Strong JWT secret generated
   - [ ] Admin credentials configured securely
   - [ ] Environment variables secured
   - [ ] HTTPS enabled
   - [ ] Database access restricted
   - [ ] Firewall configured
   - [ ] Development ports removed from public access
   - [ ] Role-based access tested

## ⚠️ Security Warning

**The `.env.example` files contain development-only values. NEVER use these in production:**
- All secrets must be changed to secure random strings
- Admin credentials must be configured through secure environment management
- Database credentials should be properly secured
- All sensitive configuration must be managed through secure environment variable systems

## 🎨 UI/UX Features

- **Full-screen optimized design** for modern displays
- **Responsive layout** that works on all screen sizes
- **Role-based navigation** that adapts to user permissions
- **Professional admin interface** with tabbed management
- **Intuitive user profile management** via modal interface
- **Seamless Buy Now flow** with authentication handling

## 📦 Deployment Platforms

This application can be deployed on:
- AWS (ECS, EKS, EC2)
- Google Cloud (Cloud Run, GKE)
- Azure (Container Instances, AKS)
- Digital Ocean App Platform
- Heroku (with Docker)
- Any Docker-compatible platform with environment variable support

## 🧪 Testing Admin Features

1. **Access Admin Dashboard**:
   - Configure admin credentials in `frontend/.env`
   - Login with admin credentials
   - Access dedicated admin interface

2. **Test User Roles**:
   - Register as different user types
   - Test buyer/seller role switching
   - Verify permission-based UI changes

3. **Admin Operations**:
   - User management and cascading deletes
   - Product oversight and management
   - Order monitoring and control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure no `.env` files are committed
5. Test all user roles and permissions
6. Verify admin functionality works correctly
7. Submit a pull request

## 📄 License

This project is created for educational purposes to demonstrate microservices architecture, role-based access control, and modern web development practices.

---

**Made with ❤️ for learning microservices architecture and enterprise-grade user management**
