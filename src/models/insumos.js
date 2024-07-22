// src/models/insumoModel.js
const db = require('../utils/db');

const Insumo = {
  create: (Nombre, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, IdUsuario, callback) => {
    const query = 'CALL CreateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [Nombre, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, IdUsuario], callback);
  },
  findById: (IdInsumo, callback) => {
    const query = 'CALL ReadInsumo(?)';
    db.query(query, [IdInsumo], callback);
  },
  update: (IdInsumo, updates, callback) => {
    const query = 'CALL UpdateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [IdInsumo, updates.Nombre, updates.precioUnitario, updates.precioPorKilo, updates.descripcion, updates.lugarDeVenta, updates.correoContacto, updates.TelefonoContacto, updates.TipoDeVenta, updates.IdUsuario], callback);
  },
  delete: (IdInsumo, callback) => {
    const query = 'CALL DeleteInsumo(?)';
    db.query(query, [IdInsumo], callback);
  },
  findByUser: (IdUsuario, callback) => {
    const query = 'CALL GetInsumosByUser(?)';
    db.query(query, [IdUsuario], callback);
  }
};

module.exports = Insumo;
