const GoogleStrategy = require("passport-google-oauth2").Strategy;
const LocalStrategy = require('passport-local').Strategy;
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
                    name: profile.displayName,
                    googleid: profile.id,
                    email: profile.emails[0].value,
                    photourl: profile.photos[0].value
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user)
        console.log(`this is the serialized user: ${user}`)
    })

    passport.deserializeUser((id, done) => {
        console.log('the user is being deserialized');
        User.findById(id, function(err, user) {
            done(err, user)
    })
    })
}