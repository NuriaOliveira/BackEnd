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
                await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,2))
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


productos.addProduct("SANDMAN: Obertura", "OVERTURE #1-6, completando el círculo de la fascinante saga de Sandman de Gaiman y sirviendo como precuela y coda de la innovadora serie original",
11000, "a definir", "978-987-819-183-6", 18)

productos.addProduct("SANDMAN Vol.01: Preludios y Nocturnos", "PRELUDIOS Y NOCTURNOS recopila los números #1-8 de la serie original de THE SANDMAN, comenzando una saga épica única en la literatura gráfica e introduciendo a los lectores a un mundo oscuro y encantador de sueños y pesadillas: la casa de Morfeo, el Rey de los Sueños y sus parientes, los Eternos.",
9900, "a definir", "978-987-819-070-9", 15)

productos.addProduct("SANDMAN Vol.02: La Casa de Muñecas", "La casa de muñecas sigue a una joven llamada Rose Walker mientras descubre la naturaleza singular de su identidad. Este viaje es observado de cerca por el Rey de los Sueños, para quien Rose se convierte en un misterio intrigante y una amenaza mortal.",
11800, "a definir", "978-987-724-858-6", 8)

productos.addProduct("SANDMAN Vol.03: País de Sueños", "Cuatro episodios únicos forman el tapiz de PAÍS DE SUEÑOS: “Calliope”, “Un sueño de mil gatos”, “Façade” y el aclamado “El sueño de una noche de verano”, el único cómic que ha ganado el World Fantasy Award a la mejor obra de ficción corta. También se incluye el guion original de Gaiman para “Calliope”, con anotaciones tanto del escritor como del artista.",
11800, "a definir", "978-987-819-034-1", 5)

productos.addProduct("SANDMAN Vol.04: Estacion de Nieblas", "PRELUDIOS Y NOCTURNOS recopila los números #1-8 de la serie original de THE SANDMAN, comenzando una saga épica única en la literatura gráfica e introduciendo a los lectores a un mundo oscuro y encantador de sueños y pesadillas: la casa de Morfeo, el Rey de los Sueños y sus parientes, los Eternos.",
11800, "a definir", "978-987-819-035-8", 25)

productos.addProduct("SANDMAN Vol.05: Un Juego de Ti", "En UN JUEGO DE TI, los paisajes imaginados de la infancia se transforman en el campo de batalla de una contienda mortal por el control. A medida que aparecen grietas en el muro que separa el mundo despierto del Sueño, un grupo de jóvenes neoyorquinas se ve atraído inexorablemente a través de las brechas hacia un rincón olvidado hace tiempo del reino del Rey de los Sueños; un escenario que es siniestramente familiar e inquietantemente maligno.",
11800, "a definir", "978-987-819-069-3", 2)

productos.addProduct("SANDMAN Vol.06: Fábulas y Reflejos", "Fábulas y reflejos sigue al Señor de los Sueños en un sinuoso viaje a través del tiempo y el espacio mientras toca las vidas de nueve soñadores notables. En estas historias inquietantes, reyes y espías, emperadores y actores, cuervos y hombres lobo, todos comparten sus historias secretas: sueños de vida y amor, poder y oscuridad.",
11800, "a definir", "978-987-819-071-6", 1)

productos.addProduct("SANDMAN Vol.07: Vidas Breves", "En Vidas breves, Delirio, la más joven de la extensa familia conocida como los Eternos, convence a su hermano Sueño para ayudar a encontrar a su hermano desaparecido, Destrucción. Su posterior odisea a través del mundo de la vigilia y su confrontación final con Destrucción —así como la resolución de la dolorosa relación de Sueño con su hijo, Orfeo— cambiarán los Eternos para siempre",
11800, "a definir", "978-987-724-849-4", 1)

productos.addProduct("SANDMAN Vol.08: El Fin de los Mundos", "En el fin de los mundos, caminantes de todos los tiempos, mitos e imaginación buscan refugio de la furia de una tormenta de realidad en los acogedores salones de una misteriosa posada. Mientras esperan que pase la tempestad que los rodea, los viajeros comparten historias de los lugares en los que han estado, las cosas que han visto... y las que han soñado.",
11800, "a definir", "978-987-724-918-7", 10)

productos.addProduct("SANDMAN Vol.09: Las Benévolas", "Las Benévolas tienen muchos nombres. Las Erinias. Las Euménidas. Las Dirae. Las Furias. Agentes de venganza, implacables e imparables. No se detienen ante nada hasta que los crímenes que buscan castigar sean purificados con sangre. Lyta Hall recurre a ellas cuando su bebé, Daniel, es secuestrado, y Sueño de los Eternos se vuelve su objetivo. Pero detrás de la angustia de una madre y de su ira inflexible se encuentran fuerzas que podrían demandar el sacrificio más grande que el Sueño haya conocido.",
11800, "a definir", "978-987-724-965-1", 1)
/*
console.log("lista de productos")
productos.getProducts()
*/

//console.log("produto por id")
//console.log(productos.getProductById(3))
//productos.getProductById(2)

//productos.updateProduct(4,{title: "producto prueba", description: "Este es un producto prueba que fue modificado", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25})

//productos.deleteProduct(3)