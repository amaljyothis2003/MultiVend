# 🚀 MultiVend Deployment Guide

## Option 1: Railway (Recommended - Full Stack)

Railway can deploy your entire application with Docker Compose support.

### Step 1: Prepare MongoDB Atlas
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create 3 databases: `userdb`, `productdb`, `orderdb`
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/`

### Step 2: Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your MultiVend repository
5. Railway will automatically detect Docker Compose

### Step 3: Set Environment Variables in Railway
Go to your project → Settings → Variables, and add:

```env
JWT_SECRET=your-super-secure-64-character-random-string
USER_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/userdb
PRODUCT_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/productdb
ORDER_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/orderdb
PORT=8080
```

### Step 4: Generate JWT Secret
Run this locally to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 5: Deploy
Railway will automatically build and deploy your application!

---

## Option 2: Vercel (Frontend) + Railway (Backend)

### Frontend on Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Set build settings:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Backend on Railway:
Deploy each service separately (user-service, product-service, order-service)

---

## Option 3: All-in-One with Render
1. Go to [render.com](https://render.com)
2. Create a new "Web Service" from your GitHub repo
3. Use Docker deployment
4. Set environment variables

---

## 🔧 Local Testing Before Deploy

### Test Production Build:
```bash
# Build frontend
cd frontend
npm run build

# Test with production Docker Compose
cd ..
docker-compose -f docker-compose.prod.yml up --build
```

### Access:
- Frontend: http://localhost:8080
- APIs: http://localhost:3001, :3002, :3003

---

## 🌍 Post-Deployment Checklist

1. ✅ Test user registration/login
2. ✅ Test product CRUD operations
3. ✅ Test order placement
4. ✅ Test admin dashboard
5. ✅ Test role-based permissions
6. ✅ Verify MongoDB Atlas connections
7. ✅ Test Buy Now functionality

---

## 🔒 Security Notes

- Never commit real `.env` files
- Use strong JWT secrets (64+ characters)
- Enable MongoDB Atlas IP whitelist (0.0.0.0/0 for Railway)
- Use HTTPS in production
- Rotate secrets regularly

---

## 📞 Need Help?

1. Check Railway/Vercel logs for errors
2. Verify environment variables are set correctly
3. Test MongoDB Atlas connection separately
4. Ensure CORS is configured for your domain

Happy Deploying! 🎉