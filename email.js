const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'tucorreo@gmail.com',
        pass: 'tucontraseña'
    }
});

const mailOptions = {
    from: '"Tu nombre" <tucorreo@gmail.com>',
    to: 'destinatario@correo.com',
    subject: 'Asunto del correo electrónico',
    text: 'Cuerpo del mensaje en texto plano',
    html: 'Cuerpo del mensaje en HTML'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Correo electrónico enviado: ' + info.response);
    }
});