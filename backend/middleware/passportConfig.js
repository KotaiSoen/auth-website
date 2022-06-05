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

    passport.serializeUser((user, done) => {
        done(null, user.id)
        console.log(`this is the serialized user: ${user}`)
    })

    passport.deserializeUser((id, done) => {
        console.log(`this is the id:${id}`)
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            User.findOne({ id: id }).then(user => {
                console.log('it is done')
                done(null, user)
            })
        } else {
            console.log("wrong id format")
        }
    })
}