'use strict'

var express = require('express');
var Account = require('../controllers/account');

//Llamamos al objeto router de express:
var router = express.Router();

// Ruta para crear una nueva cuenta
router.post('/createAccount', accountController.createAccount);
// Ruta para obtener todas las cuentas
router.get('/getAccounts', accountController.getAccounts);
// Ruta para actualizar una cuenta
router.put('/updateAccount/:id', accountController.updateAccount);
// Ruta para eliminar una cuenta
router.delete('/deleteAccount/:id', accountController.deleteAccount);


module.exports = router;