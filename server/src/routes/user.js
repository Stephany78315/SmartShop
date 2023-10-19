const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/createUser', userController.createUser);

// Ruta para obtener todos los usuarios
router.get('/getUsers', userController.getUsers);

// Ruta para actualizar un usuario
router.put('/updateUser/:id', userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
