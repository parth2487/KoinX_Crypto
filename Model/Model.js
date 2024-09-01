const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    blockNumber: String,
    timeStamp: String,
    hash: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    isError: String,
    txreceipt_status: String,
    input: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    gasUsed: String,
    confirmations: String,
    address: String,
});

const priceSchema = new mongoose.Schema({
    currency: String,
    price: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const EthereumPrice = mongoose.model('EthereumPrice', priceSchema);

module.exports = {
    Transaction,
    EthereumPrice,
};
