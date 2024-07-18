const express = require('express');
require('dotenv').config(); // Carga las variables de entorno

const authRoutes = require('./src/routes/authRoutes');
const empresaRoutes = require('./src/routes/empresaRoutes'); // Importa las rutas de la empresa

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/empresa', empresaRoutes); // Usa las rutas de la empresa bajo la URL base '/api/empresa'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
