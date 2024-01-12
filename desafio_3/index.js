const express = require('express')
const ProductManager = require('./ProductManager')

const app = express()
let product = new ProductManager()

app.listen(8080, ()=> {
    console.log("Todo ok")

})

app.get('/',(req,res) => {
    res.send('Hola')
})

app.get("/products", async(req,res)=>{
    let products = await product.getProducts()
    let limit = req.query
    res.send(products)
})

app.get("/products/:pid", async(req,res)=>{

    let sproduct = await product.getProductById(req.params.pid)
    res.send(sproduct)
})



 