const express = require('express');
const router = express.Router();
const User = require('../db/models/user.model')
const userController = require('../controllers/userController');
const passport = require('passport');
require('../middleware/passportConfig')(passport);


//AUTH ROUTES
router.post("/register", (req, res) => {
    User.register(new User({email: req.body.email}), req.body.password, (err, user) => {
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
    res.json(user);
})

router.get("/logout", (req, res) => {
    //handle with passport
    req.logout();
    res.redirect("http://localhost:4200/login");
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile']}));

router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('http://localhost:4200/personal-info');
    }
);

//Main routes
router.get('/personal-info', userController.get_personal_info)


module.exports = router;