'use strict';

const User = require('../models/user');

const userController = {
    createUser: (req, res) => {
        const userData = req.body;

        // Verificar que se proporcionen los campos requeridos
        if (!userData.account_id || !userData.user_name || !userData.date_of_birth) {
            return res.status(400).json({
                status: 'error',
                message: 'Por favor, proporciona todos los campos requeridos para crear un usuario.'
            });
        }

        // Establecer las notificaciones en true por defecto
        userData.notification = {
            products_out_of_stock: true,
            products_low_price: true,
            expired_products: true
        };

        const newUser = new User(userData);

        newUser.save((err, userStored) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al crear el usuario'
                });
            }

            return res.status(200).json({
                status: 'success',
                user: userStored
            });
        });
    },

    getUsers: (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al obtener los usuarios'
                });
            }
            if (!users || users.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No hay usuarios para mostrar'
                });
            }

            return res.status(200).json({
                status: 'success',
                users
            });
        });
    },

    updateUser: (req, res) => {
        const userId = req.params.id;
        const newData = req.body;

        User.findByIdAndUpdate(userId, newData, { new: true }, (err, updatedUser) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al actualizar el usuario'
                });
            }
            if (!updatedUser) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró el usuario a actualizar'
                });
            }

            return res.status(200).json({
                status: 'success',
                user: updatedUser
            });
        });
    },

    deleteUser: (req, res) => {
        const userId = req.params.id;

        User.findByIdAndRemove(userId, (err, deletedUser) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al eliminar el usuario'
                });
            }
            if (!deletedUser) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró el usuario a eliminar'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Usuario eliminado exitosamente'
            });
        });
    }
};

module.exports = userController;
