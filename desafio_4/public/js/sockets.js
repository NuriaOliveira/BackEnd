const socket = io()

socket.on('listarProductos', async(products) => {
    render(products)
})

socket.on('agregarProducto', async(product) => {
    render(product)
    //socket.emit('addPorduct', product)
})