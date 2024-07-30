const db = require('../utils/db');

const Comprador = {
    create: (nombre, contrasena, direccion, ciudad, codigoPostal, telefono, correo_electronico, callback) => {
        const query = 'CALL CreateComprador(?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [nombre, contrasena, direccion, ciudad, codigoPostal, telefono, correo_electronico], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM comprador WHERE correo_electronico = ?';
        db.query(query, [email], callback);
    },
    update: (idComprador, updates, callback) => {
        const query = 'CALL UpdateComprador(?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [idComprador, updates.nombre, updates.contrasena, updates.direccion, updates.ciudad, updates.codigoPostal, updates.telefono, updates.correo_electronico], callback);
    }
};

module.exports = Comprador;

