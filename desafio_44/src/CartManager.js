const fs = require('fs')
const uuid4 = require('uuid4')

class CartManager {
    

    constructor(){
        this.carts = []
        this.path = '../carritos.json'
    }

    async addCart (carrito){
        try {
            
            let data = await fs.promises.readFile(this.path, 'utf-8')

            if(data == 0)
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            else
                this.carts = JSON.parse(data)
            
            carrito.id = uuid4()
            //let product = {"id": this.carts.length + 1, "title": titulo, "description": descripcion, "price": precio, "thumbnail": img, "code": codido, "stock": cant, "status": estado, "category": categoria}
            this.carts.push(carrito)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            return true
            
        } catch (error) {
            return false
            console.log(error)

        }


    }

    async getCarts(){
        
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(data)
            
            /*this.carts.forEach(p => {
                console.log(p)
            }) */

            return this.carts
        } catch (error) {
            console.log(error)
        }
        
    }

    async getCartById(id){
        try {

            let data = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(data)
            return this.carts.find(c => c.id == id)

        } catch (error) {
            console.log(error)
        }
        
    }

    async updateCart(cid, pid){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(data)

            let indicec = this.carts.findIndex(c => c.id === cid)
            
            if(indicec != -1){ 
                
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


module.exports = CartManager