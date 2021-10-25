const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided'],
    },
    price: {
        type: Number,
        required: [true, 'price name must be provided'],
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default:Date.now()
    },
    company: {
        type: String,
        // limiting possible options for company name
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            // error message if value does not correspond to the listed values
            message: '{VALUE} is not supported'
        }
        // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    }
})

module.exports = mongoose.model("Product", productSchema);