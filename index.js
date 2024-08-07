const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const authRoutes = require('./src/routes/authRoutes');
const empresaRoutes = require('./src/routes/empresaRoutes'); 
const insumoRoutes = require('./src/routes/insumosRoutes'); 
const productoRoutes = require('./src/routes/productosRoutes'); 

const app = express();

// Configuración de Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 } // Limitar a 10 MB
});

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configuración de Content Security Policy usando Helmet
app.use(helmet.contentSecurityPolicy({
  directives: {
      defaultSrc: ["'self'"], // Permitir solo el mismo origen por defecto
      imgSrc: ["'self'", 'data:', 'https://backtesteo.onrender.com'], // Permitir imágenes desde el mismo origen, data URLs, y el dominio de tu favicon
      scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com'], // Permitir scripts desde el mismo origen y CDNs
      styleSrc: ["'self'", 'https://cdnjs.cloudflare.com'], // Permitir estilos desde el mismo origen y CDNs
      connectSrc: ["'self'"], // Permitir conexiones solo desde el mismo origen
      // Añadir otras directivas según sea necesario
  }
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/insumo', insumoRoutes); 
app.use('/api/producto', productoRoutes); 

// Servir archivos estáticos
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
