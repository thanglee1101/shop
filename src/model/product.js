const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const product = new Schema({
    code: { type: String },
    name: { type: String },
    price: { type: String },
    description: { type: String },
    color: { type: Array },
    size: { type: Array },
    img: { type: Array }
})
module.exports = mongoose.model('product', product);