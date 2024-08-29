const nodemailer = require('nodemailer');

// Configura el transportador con tus credenciales de correo
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Cambia por el servidor SMTP que utilices
  port: 587, // o 465 para SSL
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: 'coffeart224@gmail.com', // Tu correo electrónico
    pass: 'ijkm tiqe jduz jakn' // Tu contraseña de aplicación o contraseña directa
  },
  debug: true, // Habilitar depuración (opcional para desarrollo)
  logger: true // Habilitar registro (opcional para desarrollo)
});

// Función para enviar correos
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Coffe Art" <coffeart224@gmail.com>', // Nombre y correo del remitente
      to: to, // Correo del destinatario
      subject: subject, // Asunto del correo
      text: text, // Contenido en texto plano del correo
      html: html // Contenido en HTML del correo (opcional)
    });

    console.log('Correo enviado: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar el correo: ', error);
    throw new Error('Error al enviar el correo');
  }
};

module.exports = { sendEmail };