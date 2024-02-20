const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        userName: String,
        password: String,
        
    },
    { versionKey: false }
);


const User = mongoose.model('user', usersSchema, 'User');

module.exports = {User};