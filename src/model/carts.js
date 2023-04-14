const mongoose = require('mongoose');
const product = require('./product');
const Schema = mongoose.Schema;

const cart = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    listProducts: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: { type: Number }
        }

    ],
})
module.exports = mongoose.model('cart', cart)