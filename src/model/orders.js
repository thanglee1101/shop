const mongoose = require('mongoose');
const product = require('./product');
const Schema = mongoose.Schema;


const order = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    listProducts: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number
        }
    }],
    total: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    status: {
        type: String
    },
    createAt: {
        type: Date
    },
    updateAt: {
        type: Date
    }
})

order.methods.toObjectOrder = function() {
    return {
        userId: this.userId,
        listProducts: this.listProducts,
        total: this.total,
        paymentMethod: this.paymentMethod,
        status: this.status,
        createAt: this.createAt,
        updateAt: this.updateAt
    }
}
module.exports = mongoose.model('order', order)