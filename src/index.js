const express = require('express')



const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const route = require('./router/index')
const db = require('./config/dbconnect')
var bodyParser = require('body-parser')

const app = express()


const port = 3000


db.connect();
app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('hbs', handlebars.engine({
    extname: '.hbs',

}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'))

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})