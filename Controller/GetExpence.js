const { Transaction, EthereumPrice } =require('../Model/Model.js');

const getUserExpenses = async (req, res) => {
    const { address } = req.params;

    try {
        // Fetch all transactions for the given address
        const transactions = await Transaction.find({ address });

        if (transactions.length === 0) {
            return res.status(404).json({ error: "No transactions found for this address." });
        }

        // Calculate total expenses
        const totalExpenses = transactions.reduce((total, tx) => {
            const expense = (BigInt(tx.gasUsed) * BigInt(tx.gasPrice)) / BigInt(1e18);
            return total + Number(expense);
        }, 0);

        // Fetch the latest Ethereum price
        const latestPriceEntry = await EthereumPrice.findOne().sort({ timestamp: -1 });

        if (!latestPriceEntry) {
            return res.status(500).json({ error: "Unable to fetch the current Ethereum price." });
        }

        const currentEthPriceInINR = latestPriceEntry.price;

        res.status(200).json({
            address,
            totalExpensesInETH: totalExpenses,
            currentEthPriceInINR,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserExpenses,
};
