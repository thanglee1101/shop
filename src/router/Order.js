const express = require('express');
const router = express.Router();
const { authByToken } = require('../middleware/auth')
const { authoriationAdmin } = require('../middleware/Authorization')
const orderController = require('../controller/OrderController')

router.post('/craeteOrder', authByToken, orderController.createOrder)
router.get('/getAllOrderByUserId', authByToken, orderController.getAllOrderByUserId)
router.get('/getOneOrderByUserId', authByToken, orderController.getOneOrderByUserId)
router.get('/getAllOrderbyAdmin', authByToken, authoriationAdmin, orderController.getAllOrderbyAdmin)
router.put('/updateOrderById', authByToken, authoriationAdmin, orderController.updateOrderById)

module.exports = router