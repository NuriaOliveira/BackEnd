socket.on('inicio',(data) => {
    socket.emit('inicio:OK')
    
})

let tarjetaProducto = document.getElementById('listaProductos')

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
    //console.log(producto)
    //console.log(JSON.parse(producto))
    document.formularioCarga.reset()

    socket.emit('addPorduct', producto)
   

     return false
}

const render = (data) => {
    //console.log(data)
    tarjetaProducto.innerHTML = ''

    data.forEach(elem => {
        tarjetaProducto.append(newCard(elem))
    });
    
}

const renderCard = (data) => {
    tarjetaProducto.append(newCard(data))
}

const newCard = (elem) => {
    const div = document.createElement('div')
    //div.classList.add('col')

    div.innerHTML =  `
    <div class="col">
        <div class="card">
        <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${elem.title}</h5>
                <p class="card-text">Id: ${elem._id}</p>
                <p class="card-text">Descripcion: ${elem.description}</p>
                <p class="card-text">Precio: ${elem.price}</p>
                <p class="card-text">Codigo: ${elem.code}</p>
                <p class="card-text">Stock: ${elem.stock}</p>
                <p class="card-text">Estado: ${elem.status}</p>
                <p class="card-text">Categoria: ${elem.category}</p>
                <a class="btn btn-danger delete" data-id=${elem._id}>Eliminar</a>
                <a class="btn btn-success update" data-id=${elem._id}>Editar</a>
            </div>
        </div>
    </div>
    `
    const btnEliminar = div.querySelector(".delete")
    btnEliminar.addEventListener('click', () => {
        socket.emit('deleteProduct', btnEliminar.dataset.id)
    })

    const btnUpdate = div.querySelector(".update")
    btnUpdate.addEventListener('click', () => {
        socket.emit('getProduct', btnUpdate.dataset.id)
    })

    return div
}
/*
const render = (data) => {
    //console.log(data)
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
                    <a onclick="eliminarProducto()" class="btn btn-danger" data-id=${elem.id}>Eliminar</a>
                </div>
            </div>
        </div>
        `
        
        )
        
    }).join(' ')

    document.getElementById('listaProductos').innerHTML = html
   
    console.log(html)
}
*/
const eliminarProducto = (item) => {
    console.log(item)
}

