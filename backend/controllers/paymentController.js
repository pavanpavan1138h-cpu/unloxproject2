const Payment = require('../models/Payment');
const Transaction = require('../models/Transaction');
const Borrower = require('../models/Borrower');
const interestEngine = require('../services/interestCalculator');

exports.createPayment = async (req, res) => {
    try {
        const { transactionId, amountPaid, paymentDate, paymentMode, notes } = req.body;

        const transaction = await Transaction.findById(transactionId);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
        if (transaction.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const newPayment = new Payment({
            transactionId,
            amountPaid,
            paymentDate,
            paymentMode,
            notes
        });

        const payment = await newPayment.save();

        // Partial payment logic & updating borrower 
        const borrower = await Borrower.findById(transaction.borrowerId);
        if (borrower) {
            borrower.totalRepaid += Number(amountPaid);
            borrower.outstandingBalance -= Number(amountPaid);
            if (borrower.outstandingBalance < 0) borrower.outstandingBalance = 0;
            await borrower.save();
        }

        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('transactionId');
        // Filter to ensure only payments belonging to the user's transactions are returned
        const userPayments = payments.filter(p => p.transactionId && p.transactionId.userId.toString() === req.user.id);
        res.json(userPayments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
