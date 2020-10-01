const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    company: String,
}, {
    timestamp: true
})

module.exports = mongoose.model('Recipes', RecipeSchema)