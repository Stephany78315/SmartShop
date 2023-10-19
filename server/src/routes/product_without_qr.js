const express = require('express');
const productWithoutQRController = require('../controllers/product_without_qr');

const router = express.Router();

// Ruta para crear un nuevo producto sin código QR
router.post('/createProductWithoutQR', productWithoutQRController.createProductWithoutQR);

// Ruta para obtener todos los productos sin código QR
router.get('/getProductsWithoutQR', productWithoutQRController.getProductsWithoutQR);

// Ruta para actualizar un producto sin código QR
router.put('/updateProductWithoutQR/:id', productWithoutQRController.updateProductWithoutQR);

// Ruta para eliminar un producto sin código QR
router.delete('/deleteProductWithoutQR/:id', productWithoutQRController.deleteProductWithoutQR);

module.exports = router;
