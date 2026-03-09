const mongoose = require('mongoose');

const BorrowerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    totalBorrowed: { type: Number, default: 0 },
    totalRepaid: { type: Number, default: 0 },
    outstandingBalance: { type: Number, default: 0 },
    associatedTransactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, { timestamps: true });

module.exports = mongoose.model('Borrower', BorrowerSchema);
