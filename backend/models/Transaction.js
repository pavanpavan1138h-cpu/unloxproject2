const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
    borrowerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    transactionType: { type: String, enum: ['Given', 'Taken'], required: true },
    principalAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true }, // Percentage (e.g. 5 for 5%)
    interestType: { type: String, enum: ['Simple', 'Compound'], required: true },
    interestFrequency: { type: String, enum: ['Monthly', 'Yearly'], required: true },
    transactionDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date },
    paymentMode: { type: String, default: 'Cash' },
    notes: { type: String },
    screenshotURL: { type: String },
    status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
