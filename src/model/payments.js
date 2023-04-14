const mongoose = require('mongoose')
const Schema = mongoose.Schema


const payment = new Schema({
    orderId: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    method: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        // default: Date.now,
    },
    updateAt: {
        type: Date,
        // default: Date.now,
    },
    status: { type: String },
})

module.exports = mongoose.model('payment', payment)