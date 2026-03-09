const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/authRoutes')); // profile route is inside authRoutes for simplicity
app.use('/api/borrowers', require('./routes/borrowerRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.get('/', (req, res) => {
    res.send('Interest Calculator API is running...');
});

// Database connection
const PORT = process.env.PORT || 5000;
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }).catch(err => console.log(err));
} else {
    console.log('MONGO_URI not provided; starting server without DB for now.');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
