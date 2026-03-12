const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/authRoutes'));
app.use('/api/borrowers', require('./routes/borrowerRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.get('/', (req, res) => {
    res.json({
        message: 'Interest Calculator API is running...',
        databaseStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

const PORT = process.env.PORT || 5000;

// Start server first
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    // Attempt to connect to MongoDB
    if (process.env.MONGO_URI) {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('MongoDB Connected'))
            .catch(err => console.error('MongoDB Connection Error:', err.message));
    } else {
        console.warn('MONGO_URI is not defined in .env file.');
    }
});
