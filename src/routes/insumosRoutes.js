// src/routes/insumoRoutes.js
const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumoController');

console.log('Registering insumo routes');

// Ruta para crear un nuevo insumo
router.post('/nuevoInsumo', (req, res) => {
    console.log('POST /nuevoInsumo');
    insumoController.createInsumo(req, res);
});

// Ruta para obtener detalles de un insumo específico
router.get('/consultar/:idInsumo', (req, res) => {
    console.log('GET /consultar/:idInsumo');
    insumoController.getInsumo(req, res);
});

// Ruta para actualizar un insumo existente
router.put('/actualizar/:idInsumo', (req, res) => {
    console.log('PUT /actualizar/:idInsumo');
    insumoController.updateInsumo(req, res);
});

// Ruta para eliminar un insumo
router.delete('/eliminar/:idInsumo', (req, res) => {
    console.log('DELETE /eliminar/:idInsumo');
    insumoController.deleteInsumo(req, res);
});

// Ruta para obtener todos los insumos de un usuario
router.get('/insumosPorUsuario/:idUsuario', (req, res) => {
    console.log('GET /insumosPorUsuario/:idUsuario');
    insumoController.getInsumosByUser(req, res);
});

module.exports = router;
