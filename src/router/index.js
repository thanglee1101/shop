const UserRourer = require('./User')
const ProductRoute = require('./Product')
const CartRouter = require('./Cart')

function route(app) {
    app.use('/products', ProductRoute)
    app.use('/user', UserRourer);
    app.use('/cart', CartRouter)
}
module.exports = route;