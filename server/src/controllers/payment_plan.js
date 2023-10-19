'use strict';

const PaymentPlan = require('../models/payment_plan');

const paymentPlanController = {
    
    createPaymentPlan: (req, res) => {
        const planData = req.body;

        // Verificar que se proporcionen los campos requeridos
        if (!planData.payment_name || !planData.price || !planData.currency) {
            return res.status(400).json({
                status: 'error',
                message: 'Por favor, proporciona todos los campos requeridos para crear el plan de pago.'
            });
        }

        const newPaymentPlan = new PaymentPlan(planData);

        newPaymentPlan.save((err, planStored) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al crear el plan de pago'
                });
            }

            return res.status(200).json({
                status: 'success',
                plan: planStored
            });
        });
    },

    getPaymentPlans: (req, res) => {
        PaymentPlan.find({}, (err, plans) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al obtener los planes de pago'
                });
            }
            if (!plans || plans.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No hay planes de pago para mostrar'
                });
            }

            return res.status(200).json({
                status: 'success',
                plans
            });
        });
    },

    updatePaymentPlan: (req, res) => {
        const planId = req.params.id;
        const newData = req.body;

        PaymentPlan.findByIdAndUpdate(planId, newData, { new: true }, (err, updatedPlan) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al actualizar el plan de pago'
                });
            }
            if (!updatedPlan) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró el plan de pago a actualizar'
                });
            }

            return res.status(200).json({
                status: 'success',
                plan: updatedPlan
            });
        });
    },

    deletePaymentPlan: (req, res) => {
        const planId = req.params.id;

        PaymentPlan.findByIdAndRemove(planId, (err, deletedPlan) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al eliminar el plan de pago'
                });
            }
            if (!deletedPlan) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se encontró el plan de pago a eliminar'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Plan de pago eliminado exitosamente'
            });
        });
    }

};

module.exports = paymentPlanController;
