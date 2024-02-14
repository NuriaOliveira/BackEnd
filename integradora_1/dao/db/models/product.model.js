const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    desciption: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String,
        unique: true,
        require: true
    },
    stock: {
        type: Number,
        default: 1
    },
    category: {
        type: String,
        enum: ['Novela grafica','Cuento']
    },
    status: {
        type: Boolean
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product