const UserRourer = require('./User')
const ProductRoute = require('./Product')
const CartRouter = require('./Cart')
const PaypalRoute = require('./Paypal')
const OrderRouter = require('./Order')

function route(app) {
    app.use('/products', ProductRoute)
    app.use('/user', UserRourer);
    app.use('/cart', CartRouter);
    app.use('/paypal', PaypalRoute)
    app.use('/order', OrderRouter)

}
module.exports = route;