require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/orders', orderRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Order Service',
        timestamp: new Date().toISOString()
    });
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Order DB Connected'))
    .catch(err => console.error('DB Connection Error:', err));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
