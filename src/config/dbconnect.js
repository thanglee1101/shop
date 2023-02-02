const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8', {
            useNewUrlParser: true,
            UseUnifiedTopology: true
        });
        console.log('connect successfully')
    } catch (error) {
        console.log('connect fail')
    }
}
module.exports = { connect };