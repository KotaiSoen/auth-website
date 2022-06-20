const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        //  required: true
    },
    googleId: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    githubId: {
        type: String,
    },
    twitterId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', UserSchema);

module.exports = User;