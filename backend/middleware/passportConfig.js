const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../db/models/user.model');
require('dotenv').config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_PORT}/auth/google/callback`,
        passReqToCallback: true
    },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                let existingUser = await User.findOne({$or: [{ 'email': profile.emails[0].value }, { 'googleId': profile.id }]});
                // if user exists return the user 
                if (existingUser) {
                    if (!existingUser.googleId) {
                        console.log('not here')
                        existingUser.update({ googleId: profile.id }).then(() => {console.log('googleId created')})
                    }
                    return done(null, existingUser);
                }
                // if user does not exist create a new user 
                console.log('Creating new user...');
                const newUser = new User({
                    method: 'google',
                    name: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    photoUrl: profile.photos[0].value,
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false)
            }
        }
    ))

    passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_PORT}/auth/facebook/callback`,
        passReqToCallback: true,
        profileFields: ['id', 'emails', 'name', 'photos'],
    },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                let existingUser = await User.findOne({$or: [{ 'email': profile.emails[0].value }, { 'facebookId': profile.id }]});
                // if user exists return the user 
                if (existingUser) {
                    if (!existingUser.facebookId) {
                        console.log('not here')
                        existingUser.update({ facebookId: profile.id }).then(() => {console.log('facebookId created')})
                    }
                    return done(null, existingUser);
                }
                // if user does not exist create a new user 
                console.log('Creating new user...');
                const newUser = new User({
                    method: 'facebook',
                    name: profile.name.givenName + ' ' + profile.name.familyName,
                    facebookId: profile.id,
                    email: profile.emails[0].value,
                    photoUrl: profile.photos[0].value,
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false)
            }
        }
    ));

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_PORT}/auth/github/callback`,
        passReqToCallback: true,
        scope: 'user:email',
    },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                let existingUser = await User.findOne({$or:[{ 'email': profile._json.email }, { 'githubId': profile.id}]});
                // if user exists return the user 
                if (existingUser) {
                    console.log(`this is the github existing user ${existingUser}`)
                    if (!existingUser.githubId) {
                        existingUser.update({ githubId: profile.id }).then(() => {console.log('githubId created')})
                    }
                    return done(null, existingUser);
                }
                // if user does not exist create a new user 
                console.log('Creating new user...');
                const newUser = new User({
                    method: 'github',
                    name: profile._json.name,
                    githubId: profile.id,
                    email: profile._json.email !== null ? profile._json.email : '' ,
                    photoUrl: profile.photos[0].value,
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false)
            }
        }
    ))

    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_KEY_SECRET,
        callbackURL: `${process.env.BACKEND_PORT}/auth/twitter/callback`,
        includeEmail: true,
    },
        async(token, tokenSecret, profile, done) => {
            console.log(profile);
            try {
                let existingUser = await User.findOne({$or: [{ 'email': profile._json.email }, { 'twitterId': profile.id }]});
                // if user exists return the user 
                if (existingUser) {
                    if (!existingUser.twitterId) {
                        existingUser.update({ twitterId: profile.id }).then(() => {console.log('twitterId created')})
                    }
                    return done(null, existingUser);
                }
                // if user does not exist create a new user 
                console.log('Creating new user...');
                const newUser = new User({
                    method: 'twitter',
                    name: profile.displayName,
                    twitterId: profile.id,
                    email: profile._json.email,
                    photoUrl: profile.photos[0].value,
                    bio: profile._json.description,
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false)
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user)
        console.log(`this is the serialized user: ${user}`)
    })

    passport.deserializeUser((id, done) => {
        console.log('the user is being deserialized');
        User.findById(id, function (err, user) {
            done(err, user)
        })
    })
}