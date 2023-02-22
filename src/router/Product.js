const express = require('express');
const router = express.Router();
const productController = require('../controller/Productcontroller')

router.post('/createproduct', productController.createNewProduct)
router.get('/', productController.getallproducts)

module.exports = router;