const Borrower = require('../models/Borrower');

exports.createBorrower = async (req, res) => {
    const { name, phone, email, address } = req.body;
    try {
        const newBorrower = new Borrower({
            userId: req.user.id,
            name,
            phone,
            email,
            address
        });

        const borrower = await newBorrower.save();
        res.json(borrower);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(borrowers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getBorrowerById = async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id).populate('associatedTransactions');
        if (!borrower) return res.status(404).json({ msg: 'Borrower not found' });
        if (borrower.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        res.json(borrower);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
