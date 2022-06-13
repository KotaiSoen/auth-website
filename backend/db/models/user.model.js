const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        //  required: true
    },
    googleid: {
        type: String,
    },
    photourl: {
        type: String,
    },
    githubid: {
        type: String,
    },
    twitterid: {
        type: String,
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
    },
    phonenumber: {
        type: Number
    },
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', UserSchema);

module.exports = User;