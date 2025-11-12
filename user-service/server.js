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
    .then(() => console.log('User DB Connected'))
    .catch(err => console.error(err));

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'User Service', timestamp: new Date().toISOString() });
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`User Service running on port ${process.env.PORT}`);
});
