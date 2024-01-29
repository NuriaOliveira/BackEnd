const express = require('express')
const ProductManager = require('../src/ProductManager')

const { Router } = express

const product = new ProductManager()

const routerHome = Router()

routerHome.get('/', async(req, res) => {
    let products = await product.getProducts()
    res.render("home", {
        products: products
    })

})

module.exports = routerHome