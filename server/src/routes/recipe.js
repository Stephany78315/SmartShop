'use strict'

const express = require('express');
const recipeController = require('../controllers/recipe');

const router = express.Router();

// Ruta para crear una nueva receta
router.post('/createRecipe', recipeController.createRecipe);

// Ruta para obtener todas las recetas
router.get('/getRecipes', recipeController.getRecipes);

// Ruta para actualizar una receta
router.put('/updateRecipe/:id', recipeController.updateRecipe);

// Ruta para eliminar una receta
router.delete('/deleteRecipe/:id', recipeController.deleteRecipe);

module.exports = router;
