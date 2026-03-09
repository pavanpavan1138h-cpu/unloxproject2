const Transaction = require('../models/Transaction');
const Borrower = require('../models/Borrower');
const interestEngine = require('../services/interestCalculator');

exports.createTransaction = async (req, res) => {
    try {
        const {
            borrowerId, borrowerName, contactNumber, transactionType,
            principalAmount, interestRate, interestType, interestFrequency,
            dueDate, paymentMode, notes, screenshotURL
        } = req.body;

        const newTransaction = new Transaction({
            userId: req.user.id,
            borrowerId,
            borrowerName,
            contactNumber,
            transactionType,
            principalAmount,
            interestRate,
            interestType,
            interestFrequency,
            dueDate,
            paymentMode,
            notes,
            screenshotURL
        });

        const transaction = await newTransaction.save();

        // Update borrower
        const borrower = await Borrower.findById(borrowerId);
        if (!borrower) {
            return res.status(404).json({ msg: 'Borrower not found' });
        }

        if (transactionType === 'Given') {
            borrower.totalBorrowed += Number(principalAmount);
        } // If "Taken", logic might be different or mapped differently. Let's assume this refers to money lent or borrowed by the user.
        borrower.outstandingBalance += Number(principalAmount);
        borrower.associatedTransactions.push(transaction._id);
        await borrower.save();

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
        if (transaction.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
        if (transaction.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
