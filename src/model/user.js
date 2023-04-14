const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String },
    username: { type: String },
    password: { type: String },
    bio: { type: String },
    img: { type: String }
})
user.methods.toObjectUser = function() {
    return {
        email: this.email,
        username: this.username,
        bio: this.bio,
        img: this.img
    }
}
module.exports = mongoose.model('user', user);