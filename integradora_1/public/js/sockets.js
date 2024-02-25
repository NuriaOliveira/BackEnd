const socket = io()

socket.on('listarProductos', (products) => {
    render(products)
})

socket.on('agregarProducto', (product) => {
    renderCard(product)
    console.log("El producto fue cargado correctamente")
    //socket.emit('addPorduct', product)
})

socket.on('eliminarProducto', (products) => {
    render(products)
    console.log("El producto fue eliminado")

})

socket.on('obtenerProducto', (prod) => {
    console.log(prod)
})