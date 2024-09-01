const express = require('express');
const { getTransactions } = require('../Controller/GetTransaction.js');
const { getUserExpenses } = require('../Controller/GetExpence.js');
const router = express.Router();


//This For Task 1 Route
router.get('/transactions/:address', getTransactions);


//This is For Task 3 Route
router.get('/expenses/:address', getUserExpenses); 


module.exports = router;