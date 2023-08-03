const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const promotionRoutes = require('./routes/promotion');
const recruitmentRoutes = require('./routes/recruitment');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/', promotionRoutes);
app.use('/api/', recruitmentRoutes);

const PORT = process.env.PORT || 5000
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('You are connected to diligenze_db!')
        app.listen(PORT, () => {
            console.log(`Server is running at ${process.env.SERVER_HOST}:${PORT}`)
        });
    })
    .catch((error) => {
        console.log('Connection to diligenze_db failed', error)
    });

