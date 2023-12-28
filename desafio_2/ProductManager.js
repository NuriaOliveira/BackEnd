const fs = require('fs')

class ProductManager {
    

    constructor(){
        this.products = []
        this.path = '../productos.json'
    }

    async addProduct (titulo, descripcion, precio, img, codido, cant){
        try {
            
            if(!titulo || !descripcion || !precio || !codido || !cant){
                throw "Todos los campos son obligatorios"
            }

            let data = await fs.promises.readFile(this.path, 'utf-8')

            if(data == 0)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            else
                this.products = JSON.parse(data)
            
            if(this.products.some(p => p.code === codido)){
                //return `El codigo ${codido} ya existe`nn
                throw `El codigo ${codido} ya existe`
            }

            let product = {"id": this.products.length + 1, "title": titulo, "description": descripcion, "price": precio, "thumbnail": img, "code": codido, "stock": cant}
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            //console.log(this.products)
            
        } catch (error) {

            console.log(error)

        }


    }

    async getProducts(){
        
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            this.products.forEach(p => {
                console.log(p)
            })

            //return this.products
        } catch (error) {
            console.log(error)
        }
        
    }

    async getProductById(id){
        try {

            let data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            if(this.products.some(p => p.id === id)){
                console.log(this.products.find(p => p.id === id))
                //return this.products.find(p => p.id === id)

            } else {
                //return "Not found"
                throw "Not found"
            } 
        } catch (error) {
            console.log(error)
        }
        
    }

    async updateProduct(id, product){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            const indice = this.products.findIndex(p => p.id === id)

            if(indice != -1){
                this.products[indice].code = product.code
                this.products[indice].description = product.description
                this.products[indice].stock = product.stock
                this.products[indice].price = product.price
                this.products[indice].title = product.title
                this.products[indice].thumbnail = product.thumbnail
            }else{
                throw 'Producto no encontrado'
            }

            await fs.promises.writeFile(this.path, JSON.stringify(this.products))

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data).filter((p)=>p.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))

        } catch (error) {
            console.log(error)
        }
    }
}

let productos = new ProductManager()

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

productos.deleteProduct(3)