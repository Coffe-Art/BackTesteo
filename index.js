require('dotenv').config(); // Carga las variables de entorno

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const empresaRoutes = require('./src/routes/empresaRoutes'); 
const insumoRoutes = require('./src/routes/insumosRoutes'); 

const app = express();
app.use(express.json());

// Configurar CORS
app.use(cors({
    origin: '*', // Permite todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use('/api/auth', authRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/insumo', insumoRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
