const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');
const auth = require('../middlewares/auth');

// @route   POST api/borrowers
// @desc    Add new borrower
// @access  Private
router.post('/', auth, borrowerController.createBorrower);

// @route   GET api/borrowers
// @desc    Get all borrowers for user
// @access  Private
router.get('/', auth, borrowerController.getBorrowers);

// @route   GET api/borrowers/:id
// @desc    Get borrower by id
// @access  Private
router.get('/:id', auth, borrowerController.getBorrowerById);

module.exports = router;
