require('dotenv').config(); // Carga las variables de entorno
console.log('JWT_SECRET in authService:', process.env.JWT_SECRET); // Verifica que se cargue la variable

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db'); 
const { promisify } = require('util');

const query = promisify(pool.query).bind(pool);

// Función para registrar un usuario
const register = async (tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia, estado, permisos, idAdministrador) => {
    try {
        const tipoUsuarioLower = tipoUsuario.toLowerCase();
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        let procedure;
        let params;

        switch (tipoUsuarioLower) {
            case 'administrador':
                procedure = 'CALL CreateAdministrador(?, ?, ?, ?, ?)';
                params = [nombre, historia || null, hashedPassword, correo_electronico, telefono];
                break;
            case 'empleado':
                procedure = 'CALL CreateEmpleado(?, ?, ?, ?, ?, ?, ?)';
                params = [nombre, hashedPassword, estado, telefono, permisos, correo_electronico, idAdministrador];
                break;
            case 'comprador':
                procedure = 'CALL CreateComprador(?, ?, ?, ?)';
                params = [nombre, hashedPassword, telefono, correo_electronico];
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }

        await query(procedure, params);
    } catch (err) {
        console.error('Error en el registro:', err.message);
        throw new Error('Error al registrar usuario: ' + err.message);
    }
};

// Función para iniciar sesión
const login = async (tipoUsuario, correo_electronico, contrasena) => {
    try {
        const tipoUsuarioLower = tipoUsuario.toLowerCase();
        let table;
        let idField;

        switch (tipoUsuarioLower) {
            case 'administrador':
                table = 'administrador';
                idField = 'idadministrador';
                break;
            case 'empleado':
                table = 'empleado';
                idField = 'idempleado';
                break;
            case 'comprador':
                table = 'comprador';
                idField = 'idcomprador';
                break;
            default:
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

        const token = jwt.sign({ id: user[idField], tipoUsuario: tipoUsuarioLower }, process.env.JWT_SECRET, { expiresIn: '4h' });
        return token;
    } catch (err) {
        console.error('Error en el login:', err.message);
        throw new Error('Error al iniciar sesión: ' + err.message);
    }
};


module.exports = { register, login, };
