const express = require('express')
const ProductManager = require('../src/ProductManager')
const ProductManagerMongo = require('../dao/db/mongo/ProductManagerMongo')

const { Router } = express

const product = new ProductManager()
const productM = new ProductManagerMongo

const routerHome = Router()

routerHome.get('/', async(req, res) => {
    //let products = await product.getProducts()
    let products = await product.getProducts()
    res.render("home", {
        products: products
    })

})

module.exports = routerHome