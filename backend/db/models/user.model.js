const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8
    },
    name: {
        type: String
    },
    bio: {
        type: String
    },
    phone: {
        type: Number
    },
    google: {
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        email: {
            type: String
        }
    },
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email'});

const User = mongoose.model('User', UserSchema);

module.exports = User;