const Product = require('../model/product')

class productController {
    async getProductById(id) {
        const slug = req.body.productId
        const product = await Product.findOne({ slug })
        if (!product) {
            res.status(401).json({ message: "Product not found" })
        }
        return res.status(200).json({
            product: await product.toProductResponse()
        })
    }
    async getallproducts(req, res, next) {
        Product.find({}).then(
            data => {
                data.map(result => result.toObject())
                res.status(200).json({ listProduct: data })
            }

        ).catch(next)
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
        product.createAt = new Date();
        product.updateAt = null;
        product.isDelete = false
        const saveProduct = await Product.create(product)
        if (saveProduct) {
            return res.status(200).json(product)
        }
    }
    async updateProduct(req, res, next) {
        const newProduct = req.body.product;
        if (!newProduct.code) {
            return res.status(401).json({ message: "Unknow code product" })
        }
        const existProduct = await Product.findOne({ code: newProduct.code })
        if (!existProduct) {
            return res.status(401).json({ message: "can't find product" })
        }
        if (newProduct.name) {
            existProduct.name = newProduct.name
        }
        if (newProduct.price) {
            existProduct.price = newProduct.price
        }
        if (newProduct.description) {
            existProduct.description = newProduct.description
        }
        if (typeof newProduct.color !== 'undefined') {
            existProduct.color = newProduct.color
        }
        if (typeof newProduct.size !== 'undefined') {
            existProduct.size = newProduct.size
        }
        if (typeof newProduct.img !== 'undefined') {
            existProduct.img = newProduct.img
        }
        existProduct.updateAt = new Date();
        await existProduct.save();
        return res.status(200).json({ user: existProduct })
    }
    async deleteProduct(req, res) {
        const productId = req.body.productId
        if (!productId) {
            res.status(401).json({ message: "no found ProductId" })
        }
        const existProduct = await Product.findOne({ productId: productId }).exec()
        if (!existProduct) {
            res.status(401).json({ message: "no found Product" })
        }
        existProduct.isDelete = true
        existProduct.save
        return res.status(200).json({ message: "Delete product success" })
    }
}
module.exports = new productController;