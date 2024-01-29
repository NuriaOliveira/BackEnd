const express = require('express')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const { emit } = require('process')

const routerProd = require('./routes/products.routes')
const routerCart = require('./routes/carts.routes')
const routerHome = require('./routes/home.routes')
const routerRTP = require('./routes/realTimeProducts.routes')
//const ProductManager = require('./ProductManager')

const app = express()
PORT = 8080
const server = http.createServer(app)
//let product = new ProductManager()

//Configuraciones
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views') 


//Routes
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/api/home', routerHome)
app.use('/api/realTimeProducts', routerRTP)


//Socket
const io = new Server(server)
io.on('connection', (socket) => {
    socket.emit('inicio', "Sesion iniciada")
})


server.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)

})


 