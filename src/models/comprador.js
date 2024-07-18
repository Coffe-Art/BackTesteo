const db = require('../utils/db');

const Comprador = {
    create: (nombre, nombreUsuario, contrasena, direccion, ciudad, codigoPostal, telefono, correo_electronico, callback) => {
        const query = 'CALL CreateComprador(COALESCE(?, nombre), COALESCE(?, nombreUsuario), COALESCE(?, contrasena), COALESCE(?, direccion), COALESCE(?, ciudad), COALESCE(?, codigoPostal), COALESCE(?, telefono), COALESCE(?, correo_electronico))';
        db.query(query, [nombre, nombreUsuario, contrasena, direccion, ciudad, codigoPostal, telefono, correo_electronico], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM comprador WHERE correo_electronico = ?';
        db.query(query, [email], callback);
    },
    update: (email, updates, callback) => {
        const query = 'UPDATE comprador SET nombre = COALESCE(?, nombre), nombreUsuario = COALESCE(?, nombreUsuario), contrasena = COALESCE(?, contrasena), direccion = COALESCE(?, direccion), ciudad = COALESCE(?, ciudad), codigoPostal = COALESCE(?, codigoPostal), telefono = COALESCE(?, telefono) WHERE correo_electronico = ?';
        db.query(query, [updates.nombre, updates.nombreUsuario, updates.contrasena, updates.direccion, updates.ciudad, updates.codigoPostal, updates.telefono, email], callback);
    }
};

module.exports = Comprador;
