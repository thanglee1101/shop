const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String },
    username: { type: String },
    password: { type: String },
    bio: { type: String },
    img: { type: String }
})

module.exports = mongoose.model('user', user);