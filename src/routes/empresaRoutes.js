// src/routes/empresaRoutes.js
const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

console.log('Registering empresa routes');

// Ruta para crear una nueva empresa
router.post('/nuevaEmpresa', (req, res) => {
    console.log('POST /nuevaEmpresa');
    empresaController.createEmpresa(req, res);
});

// Ruta para obtener detalles de una empresa específica
router.get('/consultar/:codigoempresa', (req, res) => {
    console.log('GET /consultar/:codigoempresa');
    empresaController.getEmpresa(req, res);
});

// Ruta para obtener todas las empresas creadas por un administrador específico
router.get('/consultarPorAdministrador/:idadministrador', (req, res) => {
    console.log('GET /consultarPorAdministrador/:idadministrador');
    empresaController.getEmpresasByAdmin(req, res);
});

// Ruta para actualizar una empresa existente
router.put('/actualizar/:codigoempresa', (req, res) => {
    console.log('PUT /actualizar/:codigoempresa');
    empresaController.updateEmpresa(req, res);
});

// Ruta para eliminar una empresa
router.delete('/eliminar/:codigoempresa', (req, res) => {
    console.log('DELETE /eliminar/:codigoempresa');
    empresaController.deleteEmpresa(req, res);
});

// Ruta para vincular un empleado a una empresa
router.post('/vincularEmpleado', (req, res) => {
    console.log('POST /vincularEmpleado');
    empresaController.linkEmpleadoToEmpresa(req, res);
});

// Ruta para desvincular un empleado de una empresa
router.post('/desvincularEmpleado', (req, res) => {
    console.log('POST /desvincularEmpleado');
    empresaController.unlinkEmpleadoFromEmpresa(req, res);
});

module.exports = router;
