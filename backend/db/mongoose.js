const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to database');
})

module.exports = mongoose;