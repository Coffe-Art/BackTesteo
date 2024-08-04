const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

console.log('Registering producto routes');

// Ruta para crear un nuevo producto
router.post('/nuevoProducto', upload.single('productoImg'), (req, res) => {
    console.log('POST /nuevoProducto');
    productoController.createProducto(req, res);
});

// Ruta para obtener detalles de un producto específico
router.get('/consultar/:idProducto', (req, res) => {
    console.log('GET /consultar/:idProducto');
    productoController.getProducto(req, res);
});

// Ruta para obtener productos por idAdministrador
router.get('/consultar/administrador/:idAdministrador', (req, res) => {
    console.log('GET /consultar/administrador/:idAdministrador');
    productoController.getProductosByIdAdministrador(req, res);
});

// Ruta para obtener productos por codigoEmpresa
router.get('/consultar/empresa/:codigoempresa', (req, res) => {
    console.log('GET /consultar/empresa/:codigoempresa');
    productoController.getProductosByCodigoEmpresa(req, res);
});

// Ruta para actualizar un producto existente
router.put('/actualizar/:idProducto', upload.single('productoImg'), (req, res) => {
    console.log('PUT /actualizar/:idProducto');
    productoController.updateProducto(req, res);
});

// Ruta para eliminar un producto
router.delete('/eliminar/:idProducto', (req, res) => {
    console.log('DELETE /eliminar/:idProducto');
    productoController.deleteProducto(req, res);
});

module.exports = router;
