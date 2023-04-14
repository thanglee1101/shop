const express = require('express');
const router = express.Router();
const CartController = require('../controller/CartController')
const { authByToken } = require('../middleware/auth')

router.get('/getAllCartItem/:id', authByToken, CartController.getAllCartItem)
router.post('/addProductToCart/:userId/:productId', authByToken, CartController.addProductToCart)
router.delete('/removeCartItem/:userId/:productId', authByToken, CartController.removeCartItem)
module.exports = router