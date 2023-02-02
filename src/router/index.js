const UserRourer = require('./User')
const ProductRoute = require('./Product')

function route(app) {
    app.use('/products', ProductRoute)
    app.use('/user', UserRourer);
}
module.exports = route;