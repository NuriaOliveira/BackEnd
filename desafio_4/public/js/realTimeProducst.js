
const socket = io()

socket.on('inicio',(data) => {
    console.log(data)
    //axios('http://localhost:8080/api/realtimeproducts')
})

const addProduct = () => {
   try {
    const producto = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        status: document.getElementById('status').value
    }
    console.log(producto)
    console.log(JSON.parse(producto))
    axios.post('/api/realTimeProducts/',producto)
    .then((res) => console.log(res.status))
   } catch (error) {
        console.log(error)
   }
    

     return false
}
const render = (data) => {
    let http = data.map( elem => {
        return (`<div>
            <p>Id: ${elem.id}}</p>
            <h2>Titulo: ${elem.title}}</h2> 
            <p>Descripcion: ${elem.description}}</p> 
            <p>Precio: ${elem.price}} </p> 
            <p>Imagenes: ${elem.thumbnail}}</p>
            <p>Codigo: ${elem.code}}</p> 
            <p>Stock: ${elem.stock}}</p> 
            <p>Estado: ${elem.status}}</p> 
            <p>Categoria: ${elem.category}}</p> 
        </div>`

        )
    })

    document.getElementById('listaProductos').innerHTML = http
    console.log(http)
}