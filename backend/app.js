const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');

//the mongoose config file
require('./db/mongoose');

//json parser middleware
app.use(express.json());

//cors middleware
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

app.use(function (req, res, next) {
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

//route middleware
app.use('/users', userRoute)

//server process
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})