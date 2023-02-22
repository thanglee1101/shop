const express = require('express');
const router = express.Router();
const CartController = require('../controller/CartController')
const { authByToken } = require('../middleware/auth')

router.get('/:id', authByToken, CartController.getAllCartItem)
router.post('/:userId/:productId', authByToken, CartController.addProductToCart)
router.delete('/:userId/:productId', authByToken, CartController.removeCartItem)
module.exports = router