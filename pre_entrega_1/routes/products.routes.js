const express = require('express')
const ProductManager = require('../src/ProductManager')

const { Router } = express

const product = new ProductManager()

const routerProd = Router()

routerProd.get('/', async(req, res) => {
    let products = await product.getProducts()
    let { limit } = req.query
    res.status(200).send(products.slice(0, limit))

})

routerProd.get('/:pid', async(req, res) => {
    let prod = await product.getProductById(req.params.pid)
    //console.log(prod)
    //console.log(req.params.pid)
    if (prod) {
        res.status(200).send(prod)
    } else {
        res.status(404).send("Not found")
    }
    
})

routerProd.post('/', async(req, res) => {
    let producto = req.body
    if(!producto.title || !producto.description || !producto.price || !producto.code || !producto.stock || !producto.category || !producto.status){
        res.send("Todos los campos con obligatorios")
    }else{
        console.log(producto)
        let prod = await product.addProduct(producto)
        if (prod) {
            res.status(201).send("El producto fue cargado correctamente")
        } else {
            res.status(400).send("El producto ya existe")
        }
    }
    
})

routerProd.put('/:pid', async(req, res) => {
    let prod = await product.updateProduct(req.params.pid, req.body)

    if (prod) {
        res.status(201).send("Producto actualizado correctamente")
    } else {
        res.status(404).send("Producto no encontrado")
    }

})

routerProd.delete('/:pid', async(req, res) => {
    let prod = await product.deleteProduct(req.params.pid)

    if (prod) {
        res.status(201).send("Producto eliminado correctamente")
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

module.exports = routerProd 