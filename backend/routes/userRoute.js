const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//passport middleware
const passport = require("passport");
require('../middleware/passportConfig')(passport);

router.post('/sign-up', userController.sign_up);
router.post('/login', userController.login);
router.get('/me/access-token', userController.verifySession, userController.get_access_token);
router.get('/personal-info', userController.authenticate, userController.get_personal_info);

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        res.redirect('http://localhost:4200/personal-info');
    }
);
router.get('/profile', (req, res) => {
    console.log(req);
    res.send("welcome");
})




module.exports = router;