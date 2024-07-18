const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');
const { promisify } = require('util');

const query = promisify(pool.query).bind(pool);

const register = async (tipoUsuario, nombre, nombreUsuario, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal) => {
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        let procedure;
        let params;

        if (tipoUsuario === 'administrador') {
            procedure = 'CALL CreateAdministrador(?, ?, ?, ?)';
            params = [nombre, hashedPassword, correo_electronico, telefono];
        } else if (tipoUsuario === 'empleado') {
            procedure = 'CALL CreateEmpleado(?, ?, ?, ?, ?, ?, ?)';
            params = [nombre, hashedPassword, 'activo', telefono, 'permisos', correo_electronico, ''];
        } else if (tipoUsuario === 'comprador') {
            procedure = 'CALL CreateComprador(?, ?, ?, ?, ?, ?, ?, ?)';
            params = [nombre, nombreUsuario, hashedPassword, direccion, ciudad, codigopostal, telefono, correo_electronico];
        } else {
            throw new Error('Tipo de usuario no válido');
        }

        await query(procedure, params);
    } catch (err) {
        throw err;
    }
};

const login = async (tipoUsuario, correo_electronico, contrasena) => {
    try {
        let table;
        let idField;

        if (tipoUsuario === 'administrador') {
            table = 'administrador';
            idField = 'idadministrador';
        } else if (tipoUsuario === 'empleado') {
            table = 'empleado';
            idField = 'idempleado';
        } else if (tipoUsuario === 'comprador') {
            table = 'comprador';
            idField = 'idComprador';
        } else {
            throw new Error('Tipo de usuario no válido');
        }

        const result = await query(`SELECT * FROM ${table} WHERE correo_electronico = ?`, [correo_electronico]);

        if (result.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const user = result[0];

        const match = await bcrypt.compare(contrasena, user.contrasena);
        if (!match) {
            throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign({ id: user[idField], tipoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (err) {
        throw err;
    }
};

module.exports = { register, login };
