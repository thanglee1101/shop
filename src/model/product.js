const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const product = new Schema({
    code: { type: String },
    name: { type: String },
    price: { type: String },
    description: { type: String },
    color: { type: Array },
    size: { type: Array },
    img: { type: Array },
    createAt: { type: String },
    updateAt: { type: Date },
    isDelete: { type: Boolean }
})


product.methods.toProductResponse = async function() {
    return {
        code: this.code,
        name: this.name,
        price: this.price,
        description: this.description,
        color: this.color,
        size: this.size,
        img: this.img
    }
}
module.exports = mongoose.model('product', product);