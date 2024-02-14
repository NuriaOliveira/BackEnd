const mongoose = require('mongoose')

module.exports = {
    connect: () => {
        return mongoose.connect("mongodb+srv://nuriaeo:123abc@proyectocoder.aofd5cw.mongodb.net/ecommerce")
        .then(() => {
            console.log('Base de datos conectada')
        }).catch((err) => {
            console.log(err)
        })
    }
}