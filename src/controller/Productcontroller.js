const Product = require('../model/product')

class productController {
    async getallproducts(req, res) {
        Product.find({}).then(result => {
            data => {
                data.map(result)
                res.status(200).json({ listProduct: data })
            }

        })
    }
    async createNewProduct(req, res) {
        const product = req.body.product;
        if (!product.code || !product.name || !product.price) {
            return res.status(401).json({ message: "requied information product" })
        }
        const existproduct = await Product.findOne({ code: product.code })
        if (existproduct) {
            return res.status(401).json({ message: " Product is exist" })
        }
        const saveProduct = await Product.create(product)
        if (saveProduct) {
            return res.status(200).json(product)
        }
    }
    async deleteProduct(req, res) {

    }
}
module.exports = new productController;