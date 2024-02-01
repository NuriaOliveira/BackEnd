socket.on('inicio',(data) => {
    socket.emit('inicio:OK')
    
})



const addProduct = () => {
  
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
    //console.log(JSON.parse(producto))
    socket.emit('addPorduct', producto)
   

     return false
}
const render = (data) => {
    console.log(data)
    let html = data.map( elem => {
        return (
        `
        <div class="col">
            <div class="card">
            <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${elem.title}</h5>
                    <p class="card-text">Id: ${elem.id}</p>
                    <p class="card-text">Descripcion: ${elem.description}</p>
                    <p class="card-text">Precio: ${elem.price}</p>
                    <p class="card-text">Codigo: ${elem.code}</p>
                    <p class="card-text">Stock: ${elem.stock}</p>
                    <p class="card-text">Estado: ${elem.status}</p>
                    <p class="card-text">Categoria: ${elem.category}</p>
                    <a onclick="eliminar()" class="btn btn-danger">Eliminar</a>
                </div>
            </div>
        </div>
        `
        
        )
        
    }).join(' ')
    let tarjetaProducto = document.getElementById('listaProductos')
    tarjetaProducto.innerHTML = html
    let botonEliminar = tarjetaProducto.querySelector(".btn btn-danger")
    botonEliminar.addEventListener("click", () => {
        eliminarProducto(elem)
    })
    //console.log(http)
}

const eliminarProducto = (prod) => {
    console.log(item)
}

