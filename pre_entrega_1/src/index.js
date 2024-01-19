const express = require('express')
const routerProd = require('../routes/products.routes')
const routerCart = require('../routes/carts.routes')
//const ProductManager = require('./ProductManager')

const app = express()
//let product = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(8080, ()=> {
    console.log("Todo ok")

})
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)

//desafio 3
/*
app.get('/',(req,res) => {
    res.send('Hola')
})

app.get("/products", async(req,res)=>{
    let products = await product.getProducts()
    let limit = req.query
    if(limit > 0){
        res.send(products.slice(0, limit))
    }else{
        res.send("el limite debe ser mayor a cero")

    }
})

app.get("/products/:pid", async(req,res)=>{

    let sproduct = await product.getProductById(req.params.pid)
    res.send(sproduct)
})

*/

 