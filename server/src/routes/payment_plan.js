'use strict'

const express = require('express');
const paymentPlanController = require('../controllers/payment_plan');

const router = express.Router();

// Ruta para crear un nuevo plan de pago
router.post('/createPaymentPlan', paymentPlanController.createPaymentPlan);

// Ruta para obtener todos los planes de pago
router.get('/getPaymentPlans', paymentPlanController.getPaymentPlans);

// Ruta para actualizar un plan de pago
router.put('/updatePaymentPlan/:id', paymentPlanController.updatePaymentPlan);

// Ruta para eliminar un plan de pago
router.delete('/deletePaymentPlan/:id', paymentPlanController.deletePaymentPlan);

module.exports = router;
