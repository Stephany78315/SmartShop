'use strict';

const Recipe = require('../models/recipe');

const recipeController = {
    createRecipe: (req, res) => {
        const recipeData = req.body;

        // Verificar que se proporcionen los campos requeridos
        if (!recipeData.name_recipe || !recipeData.user_id || !recipeData.reation_date) {
            return res.status(400).json({
                status: 'error',
                message: 'Por favor, proporciona al menos el nombre de la receta y el ID del usuario.'
            });
        }

        const newRecipe = new Recipe(recipeData);

        newRecipe.save((err, recipeStored) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al crear la receta'
                });
            }

            return res.status(200).json({
                status: 'success',
                recipe: recipeStored
            });
        });
    },

    getRecipes: (req, res) => {
        Recipe.find({}, (err, recipes) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al obtener las recetas'
                });
            }
            if (!recipes || recipes.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No hay recetas para mostrar'
                });
            }

            return res.status(200).json({
                status: 'success',
                recipes
            });
        });
    },

    updateRecipe: (req, res) => {
        const recipeId = req.params.id;
        const newData = req.body;

        Recipe.findByIdAndUpdate(recipeId, newData, { new: true }, (err, updatedRecipe) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al actualizar la receta'
                });
            }
            if (!updatedRecipe) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró la receta a actualizar'
                });
            }

            return res.status(200).json({
                status: 'success',
                recipe: updatedRecipe
            });
        });
    },

    deleteRecipe: (req, res) => {
        const recipeId = req.params.id;

        Recipe.findByIdAndRemove(recipeId, (err, deletedRecipe) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al eliminar la receta'
                });
            }
            if (!deletedRecipe) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró la receta a eliminar'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Receta eliminada exitosamente'
            });
        });
    }
};

module.exports = recipeController;
