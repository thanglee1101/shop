const Order = require('../model/orders')
const User = require('../model/user')
class OrderController {
    async createOrder(req, res) {
        const userId = req.body.userId
        const listProducts = req.body.listProducts
        const total = req.body.total
        const newOrder = {
            userId: userId,
            listProducts: listProducts,
            total: total,
            paymentMethod: 'paypal',
            status: "Pending",
            createAt: Date.now,
            updateAt: Date.now
        }
        const result = await Order.create(newOrder)
        if (!result) {
            return res.status(401).json({ message: "Create Order fail" })
        } else {
            return res.status(200).json({ message: "Create Order Success" })
        }
    }
    async getAllOrderByUserId(req, res) {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "User not found" })
        }
        const orderUser = Order.findById(userId).then(data => {
            data.map(result => {
                return result.toObjectOrder()
            })
        })
        if (req.loggedin) {
            return res.status(401).json({
                message: "Not logged in yet"
            })
        } else {
            return res.status(200).json({
                orderUser: orderUser
            })
        }
    }
    async getOneOrderByUserId(req, res) {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "User not found" })
        }
        const orderUser = Order.findById(userId).then(data => data.toObjectOrder())
        if (req.loggedin) {
            return res.status(401).json({
                message: "Not logged in yet"
            })
        } else {
            return res.status(200).json({
                orderUser: orderUser
            })
        }
    }
    async getAllOrderbyAdmin(req, res) {
        const orderUser = Order.find({}).then(data => {
            data.map(result => {
                return result.toObjectOrder()
            })
        })
        if (!req.loggedin) {
            return res.status(401).json({
                message: "Not logged in yet"
            })
        } else {
            return res.status(200).json({
                orderUser: orderUser
            })
        }
    }
    async updateOrderById(req, res) {
        const userId = req.body.userId
        if (!userId) {
            return res.status(401).json({ message: "Not UserId found" })
        }
        const userLogin = await User.findById({ userId })
        if (!userLogin) {
            return res.status(401).json({ message: "Not User found " })
        }
        const orderId = req.body.orderId
        const existOrder = await Order.findById({ orderId: orderId }).exec()
        if (!existOrder) {
            return res.status(401).json({ message: "Not Order found" })
        }
        const status = req.body.status
        await existOrder.update({
            status: status ? status : existOrder.status,
            createAt: Date.now
        })
        return res.status(200).json({ message: "Update Order Success" })
    }

}
module.exports = new OrderController;