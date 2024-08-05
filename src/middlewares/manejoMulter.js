const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }).single('urlProductoImg');

app.post('/nuevoProducto', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error al cargar el archivo:', err);
            return res.status(500).json({ error: 'Error al cargar el archivo' });
        }

        const { materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador } = req.body;
        const urlProductoImg = req.file ? `/uploads/${req.file.filename}` : null;

        if (!nombre || !precio) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        // Aquí iría tu lógica para guardar el producto y los datos de la imagen
        // await crearProductoEnBaseDeDatos({ materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador, imagen: urlProductoImg });

        res.status(201).json({ mensaje: 'Producto creado con éxito', imagen: urlProductoImg });
    });
});
