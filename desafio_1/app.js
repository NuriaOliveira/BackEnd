class ProductManager {
    constructor(){
        this.products = []
    }

    addProduct (titulo, descripcion, precio, ruta, codido, cant){

        if(!titulo || !descripcion || !precio || !ruta || !codido || !cant){
            return "Todos los campos son obligatorios"
        }

        if(this.products.some(p => p.code === codido)){
            //return `El codigo ${codido} ya existe`
            console.log(`El codigo ${codido} ya existe`)
        }


        let product = {"id": this.products.length + 1, "title": titulo, "description": descripcion, "price": precio, "thumbnail": ruta, "code": codido, "stock": cant}
        this.products.push(product)

    }

    getProducts(){
        //return this.products
        this.products.forEach(p => {
            console.log(p)
        })
    }

    getProductById(id){
        if(this.products.some(p => p.id === id)){
            return this.products.find(p => p.id === id)
        } else {
            //return "Not found"
            console.log("Not found")
        } 
    }
}

let productos = new ProductManager()

productos.getProducts()

productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productos.getProducts()
productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log(productos.getProductById(3))

/*
productos.addProduct("SANDMAN: Obertura", "OVERTURE #1-6, completando el círculo de la fascinante saga de Sandman de Gaiman y sirviendo como precuela y coda de la innovadora serie original",
11000, "a definir", "978-987-819-183-6", 18)
productos.addProduct("SANDMAN Vol.01: Preludios y Nocturnos", "PRELUDIOS Y NOCTURNOS recopila los números #1-8 de la serie original de THE SANDMAN, comenzando una saga épica única en la literatura gráfica e introduciendo a los lectores a un mundo oscuro y encantador de sueños y pesadillas: la casa de Morfeo, el Rey de los Sueños y sus parientes, los Eternos.",
9900, "a definir", "978-987-819-070-9", 15)

console.log("lista de productos")
productos.getProducts()

console.log("produto por id")
console.log(productos.getProductById(2))
*/