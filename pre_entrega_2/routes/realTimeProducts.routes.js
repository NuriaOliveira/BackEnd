const express = require('express')
//const socket = io()
const ProductManager = require('../src/ProductManager')
const ProductManagerMongo = require('../dao/db/mongo/ProductManagerMongo')

const { Router } = express

const product = new ProductManager()
const productM = new ProductManagerMongo()

const routerRTP = Router()

//Consultar todos los productos
routerRTP.get('/', async(req, res) => {
    let products = await productM.getProducts()
    let { limit } = req.query
    //res.status(200).send(products.slice(0, limit))
    //res.render('realTimeProducts',products.slice(0, limit))
    //socket.emit('realTimeProducts',products.slice(0, limit))
    res.render("realTimeProducts", {})
    
})

//Agregar producto
routerRTP.post('/', async(req, res) => {
    let producto = req.body
    try {
        let prod = await productM.addProduct(producto)
        if (prod) {
            res.status(201).send("El producto fue cargado correctamente")
        } else {
            res.status(400).send("El producto ya existe")
        }
    } catch (error) {
        console.log(error)
    }
    /*
    if(!producto.title || !producto.description || !producto.price || !producto.code || !producto.stock || !producto.category || !producto.status){
        res.send("Todos los campos con obligatorios")
    }else{
        console.log(producto)
        let prod = await productM.addProduct(producto)
        if (prod) {
            res.status(201).send("El producto fue cargado correctamente")
        } else {
            res.status(400).send("El producto ya existe")
        }
    }*/
    
})


module.exports = routerRTP