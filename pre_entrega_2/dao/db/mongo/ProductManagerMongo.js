const fs = require('fs')
const uuid4 = require('uuid4')
const { model } = require('mongoose')
const Products = require('../models/product.model')

class ProductManagerMongo {
    

    constructor(){
        this.products = []
        this.path = '../productos.json'
    }

    async addProduct (producto){
        console.log(producto)
        try {
            await Products.create(producto)
            /*let data = await fs.promises.readFile(this.path, 'utf-8')

            if(data == 0)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            else
                this.products = JSON.parse(data)
            
            if(this.products.find(p => p.code === producto.code)){ 
                return false
            }

            producto.id = uuid4()
            //let product = {"id": this.products.length + 1, "title": titulo, "description": descripcion, "price": precio, "thumbnail": img, "code": codido, "stock": cant, "status": estado, "category": categoria}
            this.products.push(producto)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            */
            return true
            
        } catch (error) {

            console.log('Error en la carga ' + error)

        }


    }

    async getProducts(){
        
        try {
            let data = await Products.find()
            //let data = await fs.promises.readFile(this.path, 'utf-8')
            //this.products = JSON.parse(data)
            /*
            data.forEach(p => {
                console.log(p)
            }) */

            return data
        } catch (error) {
            console.log(error)
        }
        
    }

    async getProductById(id){
        try {

            //let data = await fs.promises.readFile(this.path, 'utf-8')
            let data = await Products.findById(id)
            //this.products = JSON.parse(data)
            //return this.products.find(p => p.id == id)
            return data
        } catch (error) {
            console.log(error)
        }
        
    }

    async updateProduct(id, product){
        try {
            //let data = await fs.promises.readFile(this.path, 'utf-8')
            let data = await Products.updateOne({"_id": id},
            {$set: { code: product.code, description: product.description, stock: product.stock, price: product.price, title: product.title, thumbnail: product.thumbnail, status: product.status, category: product.category}})
            return true
            /*this.products = JSON.parse(data)

            const indice = this.products.findIndex(p => p.id === id)

            if(indice != -1){
                this.products[indice].code = product.code
                this.products[indice].description = product.description
                this.products[indice].stock = product.stock
                this.products[indice].price = product.price
                this.products[indice].title = product.title
                this.products[indice].thumbnail = product.thumbnail
                this.products[indice].status = product.status
                this.products[indice].category = product.category
            }else{
                return false
            }

            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            return true
        */
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteProduct(id){
        try {
            //let products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            let products = await Products.deleteOne({_id: id})
            /*
            if (products.find(p => p.id === id)) {
                products = products.filter((p)=>p.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return true
            } else {
                return false
            }

            console.log(products)
            */
           return true
        } catch (error) {
            console.log(error)
        }
    }
}

//let productos = new ProductManager()

//productos.getProducts()

//productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
//productos.getProducts()
//productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
//productos.getProductById(3)

/*
productos.addProduct("SANDMAN: Obertura", "OVERTURE #1-6, completando el círculo de la fascinante saga de Sandman de Gaiman y sirviendo como precuela y coda de la innovadora serie original",
11000, "a definir", "978-987-819-183-6", 18)
productos.addProduct("SANDMAN Vol.01: Preludios y Nocturnos", "PRELUDIOS Y NOCTURNOS recopila los números #1-8 de la serie original de THE SANDMAN, comenzando una saga épica única en la literatura gráfica e introduciendo a los lectores a un mundo oscuro y encantador de sueños y pesadillas: la casa de Morfeo, el Rey de los Sueños y sus parientes, los Eternos.",
9900, "a definir", "978-987-819-070-9", 15)

console.log("lista de productos")
productos.getProducts()
*/

//console.log("produto por id")
//console.log(productos.getProductById(3))
//productos.getProductById(2)

//productos.updateProduct(4,{title: "producto prueba", description: "Este es un producto prueba que fue modificado", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25})

//productos.deleteProduct(3)

module.exports = ProductManagerMongo