// src/models/comprador.js
const db = require('../utils/db');

const Comprador = {
    create: (nombre, contrasena, direccion, ciudad, codigoPostal, telefono, correo_electronico, callback) => {
        const query = 'CALL CreateComprador(?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [nombre, contrasena, direccion, ciudad, codigoPostal, telefono, correo_electronico], callback);
    },
    deleteById: (idComprador, callback) => {
        const query = 'CALL DeleteComprador(?)';
        db.query(query, [idComprador], callback);
    },
    findById: (idComprador, callback) => {
        const query = 'CALL ReadComprador(?)';
        db.query(query, [idComprador], callback);
    },
    update: (idComprador, updates, callback) => {
        const query = 'CALL UpdateComprador(?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [idComprador, updates.nombre, updates.contrasena, updates.direccion, updates.ciudad, updates.codigoPostal, updates.telefono, updates.correo_electronico], callback);
    }
};

module.exports = Comprador;
