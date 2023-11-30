const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required:'Please enter your name',
        unique: true,
    },
    password: {
        type: String,
        required:'Please enter your password',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('users', UserSchema)

