const axios = require('axios');
const {Transaction} = require('../Model/Model.js');
const mongoose = require('mongoose');
require('dotenv').config();

const getTransactions = async (req, res) => {
    const { address } = req.params;

    try {
        const response = await axios.get(`https://api.etherscan.io/api`, {
            params: {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                sort: 'asc',
                apikey: process.env.ETHERSCAN_API_KEY
            }
        });

        if (response.data.status === "1") {
            const transactions = response.data.result.map(tx => ({
                ...tx,
                address,
            }));

            // Save to MongoDB
            await Transaction.insertMany(transactions);

            res.status(200).json(transactions);
        } else {
            res.status(404).json({ error: "No transactions found or invalid address." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTransactions,
};
