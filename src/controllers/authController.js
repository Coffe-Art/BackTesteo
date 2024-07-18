const Administrador = require('../models/administrador');
const Comprador = require('../models/comprador');
const Empleado = require('../models/empleado');

const register = async (req, res) => {
    try {
        console.log("Register endpoint hit");
        const { tipoUsuario, nombre, nombreUsuario, contrasena, direccion, ciudad, correo_electronico, telefono, codigopostal } = req.body;

        // Verificar tipo de usuario y realizar el registro correspondiente
        if (tipoUsuario === 'administrador') {
            Administrador.create(nombre, contrasena, correo_electronico, telefono, (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(err.message);
                }
                res.status(201).send('Administrador registrado con éxito');
            });
        } else if (tipoUsuario === 'empleado') {
            Empleado.create(nombre, contrasena, correo_electronico, telefono, (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(err.message);
                }
                res.status(201).send('Empleado registrado con éxito');
            });
        } else if (tipoUsuario === 'comprador') {
            Comprador.create(nombre, nombreUsuario, contrasena, direccion, ciudad, codigopostal, telefono, correo_electronico, (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(err.message);
                }
                res.status(201).send('Comprador registrado con éxito');
            });
        } else {
            return res.status(400).send('Tipo de usuario no válido');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

const login = async (req, res) => {
    try {
        console.log("Login endpoint hit");
        const { tipoUsuario, correo_electronico, contrasena } = req.body;

        // Asegúrate de que authService esté configurado para manejar el inicio de sesión
        const token = await authService.login(tipoUsuario, correo_electronico, contrasena);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
};

module.exports = { register, login };
