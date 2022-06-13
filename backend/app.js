const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');
const MongoStore = require('connect-mongo');
const User = require('./db/models/user.model')

//dotenv config
require('dotenv').config();

//the mongoose config file
require('./db/mongoose');

//json parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//cors middleware

// app.use((req, res) => {
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, content-type, Accept, x-access-token, x-refresh-token, _id");
    res.header('Content-Type', 'application/json');
    next();
});

// app.options('/*', (_, res) => {
//     res.status(200);
// });

//express session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}));



app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//route middleware
app.use('/users', userRoute)

//server process
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})