require('dotenv').config();
console.log('JWT_SECRET in authService:', process.env.JWT_SECRET); // Verifica que se cargue la variable

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db'); 
const { promisify } = require('util');

const query = promisify(pool.query).bind(pool);

const register = async (tipoUsuario, nombre, nombreUsuario, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal) => {
    try {
        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        let procedure;
        let params;

        switch (tipoUsuarioLower) {
            case 'administrador':
                procedure = 'CALL CreateAdministrador(?, ?, ?, ?)';
                params = [nombre, hashedPassword, correo_electronico, telefono];
                break;
            case 'empleado':
                procedure = 'CALL CreateEmpleado(?, ?, ?, ?, ?, ?, ?)';
                params = [hashedPassword, nombre, 'activo', telefono, 'permisos', correo_electronico, ''];
                break;
            case 'comprador':
                procedure = 'CALL CreateComprador(?, ?, ?, ?, ?, ?, ?, ?)';
                params = [nombre, nombreUsuario, hashedPassword, direccion, ciudad, codigopostal, telefono, correo_electronico];
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }

        // Ejecutar el procedimiento almacenado con los parámetros
        await query(procedure, params);
    } catch (err) {
        console.error('Error en el registro:', err.message);
        throw err;
    }
};

const login = async (tipoUsuario, correo_electronico, contrasena) => {
    try {
        // Convertir tipoUsuario a minúsculas
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
                idField = 'idComprador';
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }

        // Consultar al usuario en la base de datos por correo electrónico
        const result = await query(`SELECT * FROM ${table} WHERE correo_electronico = ?`, [correo_electronico]);

        if (result.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const user = result[0];

        // Comparar la contraseña ingresada con la contraseña hasheada almacenada
        const match = await bcrypt.compare(contrasena, user.contrasena);

        if (!match) {
            throw new Error('Contraseña incorrecta');
        }

        // Generar un token JWT si la autenticación es exitosa
        const token = jwt.sign({ id: user[idField], tipoUsuario: tipoUsuarioLower }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.error('Error en el login:', err.message);
        throw err;
    }
};

module.exports = { register, login };
