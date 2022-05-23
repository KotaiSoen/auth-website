const mongoose = require('mongoose');

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
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }],
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

//requiring methods
require('./user.methods')(UserSchema);

const User = mongoose.model('User', UserSchema);

module.exports = User;