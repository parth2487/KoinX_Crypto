const axios = require('axios');
const { EthereumPrice } = require('../Model/Model.js');

const fetchEthereumPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'ethereum',
                vs_currencies: 'inr',
            }
        });

        if (response.data && response.data.ethereum) {
            const priceData = {
                currency: 'INR',
                price: response.data.ethereum.inr,
            };

            const priceEntry = new EthereumPrice(priceData);
            await priceEntry.save();
            console.log(`Ethereum price saved: ${priceEntry.price} INR at ${priceEntry.timestamp}`);
        }
    } catch (error) {
        console.error('Error fetching Ethereum price:', error.message);
    }
};

const startPriceFetchingService = () => {
    fetchEthereumPrice(); // Initial fetch
    setInterval(fetchEthereumPrice, 10 * 60 * 1000); // Fetch every 10 minutes
};

module.exports = {
    startPriceFetchingService,
};
