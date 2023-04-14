const express = require('express');
const router = express.Router();
const { authByToken } = require('../middleware/auth')
const PayPalController = require('../controller/PaypalController')

router.post('/create-paypal-order', authByToken, PayPalController.createPaymentOrder)
router.get('/capture-paypal-order', PayPalController.executePayment)
module.exports = router;