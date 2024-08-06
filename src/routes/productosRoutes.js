const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig'); // Ruta correcta a tu configuración de multer
const productoController = require('../controllers/productoController');

// Ruta para crear un nuevo producto con archivo
router.post('/productos', upload.single('urlProductoImg'), productoController.createProducto);

// Ruta para obtener un producto por ID
router.get('/productos/:idProducto', productoController.getProducto);

// Ruta para obtener productos por idAdministrador
router.get('/productos/administrador/:idAdministrador', productoController.getProductosByIdAdministrador);

// Ruta para obtener productos por codigoEmpresa
router.get('/productos/empresa/:codigoempresa', productoController.getProductosByCodigoEmpresa);

// Ruta para actualizar un producto con archivo
router.put('/productos/:idProducto', upload.single('urlProductoImg'), productoController.updateProducto);

// Ruta para eliminar un producto
router.delete('/productos/:idProducto', productoController.deleteProducto);

module.exports = router;
