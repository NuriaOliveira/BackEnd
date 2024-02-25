const express = require('express')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const { emit } = require('process')

const routerProd = require('./routes/products.routes')
const routerCart = require('./routes/carts.routes')
const routerHome = require('./routes/home.routes')
const routerRTP = require('./routes/realTimeProducts.routes')
const Database = require('./dao/db/index')
const ProductManager = require('./src/ProductManager')
const ProductManagerMongo = require('./dao/db/mongo/ProductManagerMongo')
const app = express()
PORT = 8080
const server = http.createServer(app)
let productManager = new ProductManager()
let productManagerMongo = new ProductManagerMongo()

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
    //let productos = await productManager.getProducts()
    let productos = await productManagerMongo.getProducts()
    socket.emit('inicio', "Sesion iniciada")
    socket.on('inicio:OK', () => {
        socket.emit('listarProductos', productos)
    })

    socket.on('addPorduct', async(product) => {
        let respuesta = await productManagerMongo.addProduct(product)
        if (respuesta) {
            socket.emit('agregarProducto', product)
        } else {
            console.log("El producto ya existe")
        }
    })

    socket.on('deleteProduct', async(prodId) => {
        let respuesta = await productManagerMongo.deleteProduct(prodId)
        if (respuesta) {
            respuesta = await productManagerMongo.getProducts()
            socket.emit('eliminarProducto', respuesta)

        } else {
            console.log("Error al eliminar producto")
        }
    }) 

    socket.on('getProduct', async(prodId) => {
        let producto = await productManagerMongo.getProductById(prodId)
        if(producto){
            socket.emit('obtenerProducto', producto)
        }else{
            console.log("Error al buscar producto.")
        }
    })
})



server.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)
    Database.connect()
})


 