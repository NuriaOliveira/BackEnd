const fs = require('fs')
const uuid4 = require('uuid4')
const Carts = require('../models/cart.model')

class CartManagerMongo {
    

    constructor(){
        this.carts = []
        this.path = '../carritos.json'
    }

    async addCart (carrito){
        try {
            
            let data = await Carts.create(carrito)
            //let data = await fs.promises.readFile(this.path, 'utf-8')
            /*
            if(data == 0)
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            else
                this.carts = JSON.parse(data)
            
            carrito.id = uuid4()
            //let product = {"id": this.carts.length + 1, "title": titulo, "description": descripcion, "price": precio, "thumbnail": img, "code": codido, "stock": cant, "status": estado, "category": categoria}
            this.carts.push(carrito)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            */
            console.log(data)
            return true
            
        } catch (error) {
            return false
            console.log(error)

        }


    }

    async getCarts(){
        
        try {
            //let data = await fs.promises.readFile(this.path, 'utf-8')
            let data = await Carts.find()
            //this.carts = JSON.parse(data)
            
            /*this.carts.forEach(p => {
                console.log(p)
            }) */

            return data
        } catch (error) {
            console.log(error)
        }
        
    }

    async getCartById(id){
        try {

            //let data = await fs.promises.readFile(this.path, 'utf-8')
            let data = await Carts.findById(id)
            //this.carts = JSON.parse(data)
            return data

        } catch (error) {
            console.log(error)
        }
        
    }

    async updateCart(cid, pid){
        try {
            //let data = await fs.promises.readFile(this.path, 'utf-8')
            //this.carts = JSON.parse(data)
            //let indicec = this.carts.findIndex(c => c.id === cid)
            //let data = await Carts.findOne({_id: cid}).populate('products.product')
            let data = await Carts.findOneAndUpdate({_id: cid, products: {_id : pid}}, {$inc: {quantity : 1}}, {new : true, upsert: true})
            //let data = await Carts.findOne({_id: cid, products: {_id : pid}})

            console.log(data)

            //await Carts.updateOne({_id : cid}, data)
            return true
            /*
            if(await Carts.find({$and:[{_id: cid}, {products : {_id : pid}}]})){ 
                
                if (this.carts[indicec].products.some(p => p.id === pid)) {
                    let indicep = this.carts[indicec].products.findIndex(p => p.id === pid)
                    this.carts[indicec].products[indicep].quantity ++
                } else {
                    let producto = {"id": pid, "quantity": 1}
                    this.carts[indicec].products.push(producto)
                }
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
                return true
            }else{
                return false
            }

           */

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            let products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))

            if (products.find(p => p.id === id)) {
                products = products.filter((p)=>p.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return true
            } else {
                return false
            }

            console.log(products)
            
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = CartManagerMongo