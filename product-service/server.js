const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
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
