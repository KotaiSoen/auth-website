const express = require('express');
const router = express.Router();
const User = require('../db/models/user.model')
const userController = require('../controllers/userController');
const passport = require('passport');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
const session = require('express-session');
const cors = require('cors');
require('../middleware/passportConfig')(passport);
require('dotenv').config();

const LOCAL_ORIGIN = 'http://localhost:4200';

//AUTHENTICATE MIDDLEWARE

function isLoggedIn(req, res, next) {
    console.log(`This is the req.user ${req.user}`);
    req.user ? next() : res.sendStatus(401);
}


//LOCAL AUTH ROUTES
router.post("/register", (req, res) => {

    User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        passport.authenticate("local")(req, res, () => {
            console.log(user)
            res.send({ 'message': 'You have been locally signed in'})
        })
    })

})


router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log('authenticated');
    const userEmail = req.user.email;
    console.log(userEmail)
    res.json(userEmail);
})

router.post('/change-password', isLoggedIn, userController.change_password);

//GOOGLE AUTH ROUTES

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_PORT}/personal-info`);
    }
);

//FACEBOOK ROUTE
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: `${process.env.FRONTEND_PORT}/login`}),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_PORT}/personal-info`);
    }
);

//GITHUB ROUTES
router.get('/auth/github', passport.authenticate('github'));

router.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_PORT}/personal-info`);
    }
);

//TWITTER ROUTES
router.get('/auth/twitter', passport.authenticate('twitter', { scope: ['email', 'profile'] }));

router.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter'),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_PORT}/personal-info`);
    }
);

//LOGOUT ROUTE
router.get("/logout", isLoggedIn,  (req, res) => {
    //handle with passport
    req.logout(function(err) {
        if (err) { return next(err); }
        res.send({ 'message': 'successfully deleted'})
      });
});

//Main routes
router.get('/personal-info', isLoggedIn, userController.get_personal_info);
router.put('/edit-personal', isLoggedIn, userController.update_personal_info);

//IMAGE STORAGE ROUTES
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

var storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ['jpg', 'png'],
});

const parser = multer({ storage: storage });

router.put("/uploadPicture", isLoggedIn, parser.single('file'), (req, res) => {
    const image_url = req.file.path;
    console.log(`this is the image url ${image_url}`)
    User.findOneAndUpdate({ _id: req.user._id }, {
        photoUrl: image_url
    }).then(() => {
        res.send({ 'message': 'photoUrl send successfully'})
    })
})



module.exports = router;