const mongoose = require('mongoose');
const { startPriceFetchingService } = require('../Controller/ServiceFetch.js');
require('dotenv').config();
const Connection=()=>{
const uri = "mongodb+srv://parthranipa12:RwbJr2OYF4aPubUU@cluster0.gwjb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/CryptoDb";
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
 console.log('Connected to MongoDB')
  startPriceFetchingService(); // Start the price fetching service
})
.catch((error) => console.log('MongoDB connection error:', error));


}

module.exports = {
    Connection
};


