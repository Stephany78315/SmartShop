'use strict'

var Account = requiere('../models/account');

//Creamos un objeto para disponer todo los metodos de ruta que vamos a definir.
var controller = {

    // Método para crear una nueva cuenta con información básica y un usuario mínimo.
    createAccount: (req, res) => {
        var accountData = req.body;

        // Verificar que se proporcionen los campos requeridos
        if (!accountData.account_name || !accountData.gmail || !accountData.password || !accountData.creation_date) {
            return res.status(400).json({
                status: 'error',
                message: 'Por favor, proporciona todos los campos requeridos para crear la cuenta.'
            });
        }

        // Crear una nueva cuenta
        const newAccount = new Account({
            account_name: accountData.account_name,
            gmail: accountData.gmail,
            password: accountData.password,
            creation_date: accountData.creation_date,
            state: 'Activo'
        });

        // Guardar la nueva cuenta en la base de datos
        newAccount.save((err, accountStored) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al crear la cuenta'
                });
            }

            return res.status(200).json({
                status: 'success',
                account: accountStored
            });
        });
    },

    //Para obtener en listado todas las cuentas. 
    getAccounts: (req, res) => {
        Article.find({}, (err, articles) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al obtener los artículos'
                });
            }
            if (!articles || articles.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });
            }
    
            return res.status(200).json({
                status: 'success',
                articles
            });
        });
    },

    //Método para hacer algun cambio en la información de la cuenta
    updateAccount: (req, res) => {
        const accountId = req.params.id; // Supongo que el ID de la cuenta se pasa como un parámetro en la URL
        const newData = req.body; // Nuevos datos de la cuenta
    
        Account.findByIdAndUpdate(accountId, newData, { new: true }, (err, updatedAccount) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al actualizar la cuenta'
                });
            }
            if (!updatedAccount) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró la cuenta a actualizar'
                });
            }
    
            return res.status(200).json({
                status: 'success',
                account: updatedAccount
            });
        });
    },

    deleteAccount: (req, res) => {
        const accountId = req.params.id; // Supongo que el ID de la cuenta se pasa como un parámetro en la URL
    
        Account.findByIdAndRemove(accountId, (err, deletedAccount) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al eliminar la cuenta'
                });
            }
            if (!deletedAccount) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró la cuenta a eliminar'
                });
            }
    
            return res.status(200).json({
                status: 'success',
                message: 'Cuenta eliminada exitosamente'
            });
        });
    }

};

module.exports = controller;
