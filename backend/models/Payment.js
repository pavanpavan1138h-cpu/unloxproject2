const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMode: { type: String, default: 'Cash' },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
