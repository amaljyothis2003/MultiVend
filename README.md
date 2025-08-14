# MultiVend - Full-Stack Microservices E-commerce Platform

A complete e-commerce platform built with microservices architecture featuring user management, product catalog, order processing, and a modern React frontend.

## 🏗️ Architecture

- **User Service** (Port 3001) - Authentication & User Management
- **Product Service** (Port 3002) - Product CRUD Operations
- **Order Service** (Port 3003) - Order Processing & Management
- **Frontend** (React + Vite) - User Interface

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js (for frontend development)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MultiVend
   ```

2. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # ⚠️ IMPORTANT: Edit .env file and update the JWT_SECRET with a secure value
   # For production, generate a secure random string for JWT_SECRET
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
- The `.env.example` contains safe defaults for development only
- **Always change the JWT_SECRET in production**
- Use strong, unique secrets for production deployment

### Environment Variables:
The project uses environment variables for all sensitive configuration:
- `JWT_SECRET` - Secret key for JWT token generation
- Database URIs and service ports
- Service URLs for inter-service communication

See `.env.example` for all available options.

## 📁 Project Structure

```
MultiVend/
├── user-service/          # User authentication microservice
├── product-service/       # Product management microservice
├── order-service/         # Order processing microservice
├── frontend/             # React frontend application
├── docker-compose.yml    # Docker services configuration
├── .env                 # Environment variables (DO NOT COMMIT)
├── .env.example         # Example environment variables (safe to commit)
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## 🎯 Features

### Frontend Features
- Modern React application with Vite
- User authentication and registration
- Product browsing with search and filters
- Shopping cart and order management
- Responsive design with professional UI

### Backend Services
- **User Management**: Registration, login, JWT authentication
- **Product Management**: CRUD operations, image support, inventory
- **Order Processing**: Order creation, payment, cancellation, stock management

## 🔧 Development

### APIs Available:
- **User Service**: http://localhost:3001
- **Product Service**: http://localhost:3002  
- **Order Service**: http://localhost:3003
- **Frontend**: http://localhost:5173 (Vite dev server)

### Database Access:
- User DB: MongoDB on port 27017
- Product DB: MongoDB on port 27018
- Order DB: MongoDB on port 27019

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
   - Set up proper CORS origins
   - Enable HTTPS

3. **Security checklist**:
   - [ ] Strong JWT secret generated
   - [ ] Environment variables secured
   - [ ] HTTPS enabled
   - [ ] Database access restricted
   - [ ] Firewall configured
   - [ ] Development ports removed from public access

## ⚠️ Security Warning

**The current `.env.example` contains development-only values. NEVER use these in production:**
- The JWT_SECRET must be changed to a secure random string
- Database credentials should be properly secured
- All secrets must be managed through secure environment variable systems

## 📦 Deployment Platforms

This application can be deployed on:
- AWS (ECS, EKS, EC2)
- Google Cloud (Cloud Run, GKE)
- Azure (Container Instances, AKS)
- Digital Ocean App Platform
- Heroku (with Docker)
- Any Docker-compatible platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure `.env` is not committed
5. Test thoroughly
6. Submit a pull request

---

**Made with ❤️ for learning microservices architecture**
