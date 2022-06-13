const express = require('express');
const router = express.Router();
const User = require('../db/models/user.model')
const userController = require('../controllers/userController');
const passport = require('passport');
const session = require('express-session');
require('../middleware/passportConfig')(passport);

const LOCAL_ORIGIN = 'http://localhost:4200';

function isLoggedIn(req, res, next) {
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
}


//AUTH ROUTES
router.post("/register", (req, res) => {
    User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("http://localhost:4200/register")
        }
        passport.authenticate("local")(req, res, () => {
            console.log(user)
            res.redirect("http://localhost:4200/personal-info");
        })
    })

})

router.post("/login", passport.authenticate("local", {
    successRedirect: "http://localhost:4200/personal-info",
    failureRedirect: "http://localhost:4200/register"
}), (req, res) => {
    const user = req.user;
    console.log(user);
    res.status(200).json(user);
})

// router.options("*", (req, res) => {
//     res.header("Access-Control-Allow-Origin", LOCAL_ORIGIN);
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.end();
// });

// router.post("/login", passport.authenticate("local", {
//     successRedirect: "http://localhost:4200/personal-info",
//     failureRedirect: "http://localhost:4200/register"
// }), (req, res) => {
//     res.header("Access-Control-Allow-Origin", LOCAL_ORIGIN);
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     console.log("users: ", req.user);
//     const user = req.user;
//     res.json(user);
// });

router.get("/logout", (req, res) => {
    //handle with passport
    req.logout();
    res.redirect("http://localhost:4200/login");
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('http://localhost:4200/personal-info');
    }
);

//Main routes
router.get('/personal-info', isLoggedIn, userController.get_personal_info)


module.exports = router;