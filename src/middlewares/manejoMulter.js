const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Carpeta para guardar las imágenes

app.post('/nuevoProducto', upload.single('urlProductoImg'), async (req, res) => {
  try {
    const { materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador } = req.body;
    const imagen = req.file; // La imagen cargada

    if (!nombre || !precio) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // Aquí iría tu lógica para guardar el producto y los datos de la imagen
    // await crearProductoEnBaseDeDatos({ materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador, imagen: imagen.path });

    res.status(201).json({ mensaje: 'Producto creado con éxito', imagen: imagen.path });
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});
