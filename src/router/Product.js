const express = require('express');
const router = express.Router();
const productController = require('../controller/Productcontroller')

router.get('/', productController.getallproducts)
router.post('/createproduct', productController.createNewProduct)

module.exports = router;