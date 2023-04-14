const Cart = require('../model/orders');
const product = require('../model/product');
const mongoose = require('mongoose')

class CartController {
    async getAllCartItem(req, res) {
        const userId = req.params.id;
        if (!userId) {
            res.status(401).json({ message: "Can't found user" })
        }
        const userCart = await Cart.findOne({ userId: userId }).populate('listProducts.productId')
        if (!userCart) {
            const newCart = {
                userId: userId,
                listProducts: []
            }
            const createCart = await Cart.create(newCart)
            if (!createCart) {
                res.status(401).json({ message: "Error" })
            }
            return res.status(200).json({ cart: newCart })
        } else {
            return res.status(200).json({ cart: userCart })
        }
    }
    async addProductToCart(req, res) {
        const userId = req.params.userId;
        const quantity = req.body.quantity
        if (!userId) {
            res.status(401).json({ message: "Can't found user" })
        }
        const productId = mongoose.Types.ObjectId(req.params.productId)
        const userCart = await Cart.findOne({ userId: userId })
        if (!userCart) {
            const newCart = {
                userId: userId,
                listProducts: [{ productId: productId }]
            }
            const createCart = await Cart.create(newCart)
            if (!createCart) {
                res.status(401).json({ message: "Error" })
            }
            return res.status(200).json({ message: "add success" })
        } else {
            const existItem = userCart.listProducts.find(product => productId === productId)
            if (existItem) {
                existItem.quantity = existItem.quantity
            }
            userCart.listProducts.push({
                productId: productId,
                quantity: 1
            })
            userCart.save();
            return res.status(200).json({ message: "add success" })
        }
    }
    async removeCartItem(req, res) {
        const userId = req.params.id;
        if (!userId) {
            res.status(401).json({ message: "Can't found user" })
        }
        const userCart = await Cart.findOne({ userId: userId }).populate('listProducts.productId')
        userCart.listProducts.pull({ productId: mongoose.Types.ObjectId(req.params.productId) })
        userCart.save();
        return res.status(200).json({
            cart: userCart
        })
    }
}
module.exports = new CartController;