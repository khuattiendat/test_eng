const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'teacher'],
        default: 'user',
    },
    refreshToken: {
        type: String || null,
    },
}, {
    timestamps: true,
});
const User = mongoose.model('User', userSchema);
module.exports = User;