'use strict';

const ProductWithoutQR = require('../models/product_without_qr');

const productWithoutQRController = {
    createProductWithoutQR: (req, res) => {
        const productData = req.body;

        // Verificar que se proporcionen los campos requeridos
        if (!productData.nameimage || !category || !creation_date) {
            return res.status(400).json({
                status: 'error',
                message: 'Por favor, proporciona al menos el nombre del producto.'
            });
        }

        const newProduct = new ProductWithoutQR(productData);

        newProduct.save((err, productStored) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al crear el producto sin código QR'
                });
            }

            return res.status(200).json({
                status: 'success',
                product: productStored
            });
        });
    },

    getProductsWithoutQR: (req, res) => {
        ProductWithoutQR.find({}, (err, products) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al obtener los productos sin código QR'
                });
            }
            if (!products || products.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No hay productos sin código QR para mostrar'
                });
            }

            return res.status(200).json({
                status: 'success',
                products
            });
        });
    },

    updateProductWithoutQR: (req, res) => {
        const productId = req.params.id;
        const newData = req.body;

        ProductWithoutQR.findByIdAndUpdate(productId, newData, { new: true }, (err, updatedProduct) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al actualizar el producto sin código QR'
                });
            }
            if (!updatedProduct) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró el producto sin código QR a actualizar'
                });
            }

            return res.status(200).json({
                status: 'success',
                product: updatedProduct
            });
        });
    },

    deleteProductWithoutQR: (req, res) => {
        const productId = req.params.id;

        ProductWithoutQR.findByIdAndRemove(productId, (err, deletedProduct) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al eliminar el producto sin código QR'
                });
            }
            if (!deletedProduct) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró el producto sin código QR a eliminar'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Producto sin código QR eliminado exitosamente'
            });
        });
    }
};

module.exports = productWithoutQRController;
