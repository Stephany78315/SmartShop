const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name_recipe: String,
    user_id: String,
    images: [String], // Arreglo de URLs de imágenes de la receta
    category: [String],
    description: String,
    creation_date: Date,
    servings: Number,
    duration_time_minutes: Number,
    ingredients: [
        {
            name: String,
            quantity: Number,
            unit_of_measurement: String
        }
    ],
    steps: [
        {
            description: String,
            images: [String] // Arreglo de URLs de imágenes de los pasos
        }
    ],
    likes: Number,
    average_of_stars: Number,
    total_reactions: Number,
    stars_reactions: {
        one_star: Number,
        two_stars: Number,
        three_stars: Number,
        four_stars: Number,
        five_stars: Number
    },
    comments: [
        {
            title: String,
            comment: String,
            stars: Number,
            comment_date: Date
        }
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);


