const express = require('express')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const { emit } = require('process')

const routerProd = require('./routes/products.routes')
const routerCart = require('./routes/carts.routes')
const routerHome = require('./routes/home.routes')
const routerRTP = require('./routes/realTimeProducts.routes')
const ProductManager = require('./src/ProductManager')

const app = express()
PORT = 8080
const server = http.createServer(app)
let productManager = new ProductManager()

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
io.on('connection', async(socket) => {
    let productos = await productManager.getProducts()
    socket.emit('inicio', "Sesion iniciada")
    socket.on('inicio:OK', () => {
        socket.emit('listarProductos', productos)
    })

    socket.on('addPorduct', async(product) => {
        let respuesta = await productManager.addProduct(product)
        if (respuesta) {
            socket.emit('agregarProducto', product)

            console.log("El producto fue cargado correctamente")
        } else {
            console.log("El producto ya existe")
        }
    })
})



server.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)

})


 