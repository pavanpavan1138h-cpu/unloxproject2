const Transaction = require('../models/Transaction');
const Borrower = require('../models/Borrower');
const Payment = require('../models/Payment');

exports.getDashboardSummary = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        const borrowers = await Borrower.find({ userId: req.user.id });

        let totalGiven = 0;
        let totalTaken = 0;
        let totalOutstandingBalance = 0;

        transactions.forEach(t => {
            if (t.transactionType === 'Given') totalGiven += t.principalAmount;
            if (t.transactionType === 'Taken') totalTaken += t.principalAmount;
        });

        borrowers.forEach(b => {
            totalOutstandingBalance += b.outstandingBalance;
        });

        // Recent Transactions
        const recentTransactions = await Transaction.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalGiven,
            totalTaken,
            totalOutstandingBalance,
            recentTransactions
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
