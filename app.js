const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/Routes.js');
const { Connection } = require('./db/Connection.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
//MongoDB connection
Connection();
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
