const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require('../db/models/user.model');
require('dotenv').config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/users/auth/google/callback",
        passReqToCallback: true
    },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                let existingUser = await User.findOne({ 'google.id': profile.id });
                // if user exists return the user 
                if (existingUser) {
                    return done(null, existingUser);
                }
                // if user does not exist create a new user 
                console.log('Creating new user...');
                const newUser = new User({
                    method: 'google',
                    google: {
                        id: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    }
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false)
            }
        }
    ))
}