const mongoose = require('mongoose');
require('./roleModel');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    birthDate: {
        type: Date
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    },
    googleId: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;