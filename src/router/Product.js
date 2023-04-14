const express = require('express');
const router = express.Router();
const productController = require('../controller/Productcontroller')

router.post('/createproduct', productController.createNewProduct)
router.put('/updateProduct/{productId}', productController.updateProduct)
router.get('/getProductById/{productId}', productController.getProductById)
router.delete('/deleteProduct/{productId', productController.deleteProduct)
router.get('/getallproducts', productController.getallproducts)

module.exports = router;