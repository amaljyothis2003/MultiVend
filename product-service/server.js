const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-vercel-app.vercel.app', 'https://multivend-user-service.onrender.com', 'https://multivend-product-service.onrender.com', 'https://multivend-order-service.onrender.com']
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Product DB Connected'))
    .catch(err => console.error(err));

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'Product Service', timestamp: new Date().toISOString() });
});

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Product Service running on port ${process.env.PORT}`);
});
