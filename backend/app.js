const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const User = require('./db/models/user.model');
const cookieParser = require('cookie-parser');

//dotenv config
require('dotenv').config();

//the mongoose config file
require('./db/mongoose');

//json parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
var distDir = __dirname + "/dist";
app.use(express.static(distDir));



//cors middleware

// app.use((req, res) => {
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });


app.use(function (req, res, next) {
    res.header('credentials', 'include');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_PORT);
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


//express session middleware
app.set('trust proxy', 1);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 1000
    },
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native',
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