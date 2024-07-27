// src/models/administrador.js
const db = require('../utils/db');

const Administrador = {
    create: (nombre, historia, contrasena, correo_electronico, telefono, callback) => {
        const query = 'INSERT INTO administrador (nombre, historia, contrasena, correo_electronico, telefono) VALUES (COALESCE(?, nombre), COALESCE(?, historia), COALESCE(?, contrasena), COALESCE(?, correo_electronico), COALESCE(?, telefono))';
        db.query(query, [nombre, historia, contrasena, correo_electronico, telefono], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM administrador WHERE correo_electronico = ?';
        db.query(query, [email], callback);
    },
    update: (email, updates, callback) => {
        const query = 'UPDATE administrador SET nombre = COALESCE(?, nombre), historia = COALESCE(?, historia), contrasena = COALESCE(?, contrasena), telefono = COALESCE(?, telefono) WHERE correo_electronico = ?';
        db.query(query, [updates.nombre, updates.historia, updates.contrasena, updates.telefono, email], callback);
    }
};

module.exports = Administrador;
