const express = require('express')
const CartManager = require('../src/CartManager')
const CartManagerMongo = require('../dao/db/mongo/CartManagerMongo')

const { Router } = express

const cart = new CartManager()
const cartM = new CartManagerMongo()

const routerCart = Router()

//Consultar todos los carritos
routerCart.get('/', async(req, res) => {
    let carts = await cartM.getCarts()
    let { limit } = req.query
    res.status(200).send(carts.slice(0, limit))

})

//Consultar carrito por id
routerCart.get('/:cid', async(req, res) => {
    let carrito = await cartM.getCartById(req.params.cid)
    //console.log(prod)
    //console.log(req.params.pid)
    if (carrito) {
        res.status(200).send(carrito.products)
    } else {
        res.status(404).send("Not found")
    }
    
})

//Crear nuevo carrito
routerCart.post('/', async(req, res) => {
    let carrito = req.body
    console.log(carrito)
    let is_ok = await cartM.addCart(carrito)
    if (is_ok) {
        res.status(201).send("Se guardo su producto en el carrito")
    } else {
        res.status(400).send("Su producto no fue guardado en el carrito")
    }
    
})

//Agregar productos a carrito
routerCart.post('/:cid/products/:pid', async(req, res) => {
    let is_ok = await cartM.updateCart(req.params.cid, req.params.pid)
    if (is_ok) {
        res.status(201).send("Producto cargado correctamente")
    } else {
        res.status(404).send("No hay carrito")
    }
})

//Eliminar producto del carrito
routerCart.delete('/:cid/products/:pid', async(req, res) => {
    let is_ok = await cartM.deleteProduct(req.params.cid, req.params.pid)
    if (is_ok) {
        res.status(201).send("Producto eliminado correctamente")
    } else {
        res.status(404).send("No se encontro el producto")
    }
})



module.exports = routerCart