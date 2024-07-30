const bcrypt = require('bcrypt');
const Administrador = require('../models/administrador');
const Comprador = require('../models/comprador');
const Empleado = require('../models/empleado');
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        console.log("Register endpoint hit");

        // Datos recibidos
        const { tipoUsuario, nombre, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal, idAdministrador } = req.body;
        console.log('Datos recibidos para registro:', {
            tipoUsuario,
            nombre,
            contrasena,
            direccion,
            ciudad,
            correo_electronico,
            telefono,
            codigopostal,
            idAdministrador
        });

        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();
        console.log('Tipo de usuario convertido a minúsculas:', tipoUsuarioLower);

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        console.log('Contraseña hasheada:', hashedPassword);

        // Verificar tipo de usuario y realizar el registro correspondiente
        let result;
        switch (tipoUsuarioLower) {
            case 'administrador':
                result = await new Promise((resolve, reject) => {
                    Administrador.create(nombre, hashedPassword, correo_electronico, telefono, (err) => {
                        if (err) {
                            console.error('Error al registrar administrador:', err);
                            reject(err);
                        } else {
                            console.log('Administrador registrado con éxito');
                            resolve();
                        }
                    });
                });
                break;
            case 'empleado':
                result = await new Promise((resolve, reject) => {
                    Empleado.create(nombre, hashedPassword, null, telefono, null, correo_electronico, idAdministrador, (err) => {
                        if (err) {
                            console.error('Error al registrar empleado:', err);
                            reject(err);
                        } else {
                            console.log('Empleado registrado con éxito');
                            resolve();
                        }
                    });
                });
                break;
            case 'comprador':
                result = await new Promise((resolve, reject) => {
                    Comprador.create(nombre, hashedPassword, direccion, ciudad, codigopostal, telefono, correo_electronico, (err) => {
                        if (err) {
                            console.error('Error al registrar comprador:', err);
                            reject(err);
                        } else {
                            console.log('Comprador registrado con éxito');
                            resolve();
                        }
                    });
                });
                break;
            default:
                return res.status(400).json({ error: 'Tipo de usuario no válido' });
        }

        res.status(201).json({ message: `${tipoUsuarioLower.charAt(0).toUpperCase() + tipoUsuarioLower.slice(1)} registrado con éxito` });
    } catch (err) {
        console.error('Error en el registro:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        console.log("Login endpoint hit");

        const { tipoUsuario, correo_electronico, contrasena } = req.body;
        console.log('Datos recibidos para login:', {
            tipoUsuario,
            correo_electronico,
            contrasena
        });

        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();
        console.log('Tipo de usuario convertido a minúsculas:', tipoUsuarioLower);

        // Asegúrate de que authService esté configurado para manejar el inicio de sesión
        const token = await authService.login(tipoUsuarioLower, correo_electronico, contrasena);
        console.log('Token generado:', token);

        res.json({ token });
    } catch (err) {
        console.error('Error en el login:', err.message);
        res.status(400).json({ error: err.message });
    }
};

module.exports = { register, login };
