// src/models/empleado.js
const db = require('../utils/db');

const Empleado = {
    create: (nombre, contrasena, correo_electronico, telefono, callback) => {
        const query = 'INSERT INTO empleado (nombre, contrasena, correo_electronico, telefono) VALUES (COALESCE(?, nombre), COALESCE(?, contrasena), COALESCE(?, correo_electronico), COALESCE(?, telefono))';
        db.query(query, [nombre, contrasena, correo_electronico, telefono], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM empleado WHERE correo_electronico = ?';
        db.query(query, [email], callback);
    },
    update: (email, updates, callback) => {
        const query = 'UPDATE empleado SET nombre = COALESCE(?, nombre), contrasena = COALESCE(?, contrasena), telefono = COALESCE(?, telefono) WHERE correo_electronico = ?';
        db.query(query, [updates.nombre, updates.contrasena, updates.telefono, email], callback);
    }
};

module.exports = Empleado;
