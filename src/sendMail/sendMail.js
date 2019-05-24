var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'servicobateomartelo@gmail.com',
        pass: 'ads1020304050'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

const sendEmail = (email, passwd) => {
    const mailOptions = {
        from: 'servicobateomartelo@gmail.com',
        to: email,
        subject: 'Confirmação de Cadastro',
        html: `Seja bem vindo! Sua senha temporária é ${passwd} 
        Realize seu primeiro login utilizando esta senha e depois altere sua senha! 
        Seja rápido pois esta senha expira em 10 minutos!`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response)
        }
    });

}

const sendEmailForgot = (email, passwd) => {
    const mailOptions = {
        from: 'servicobateomartelo@gmail.com',
        to: email,
        subject: 'Esqueceu sua Senha',
        html: `Esqueceu sua Senha? Sem problemas! Sua nova senha temporária é ${passwd} 
        Realize login com ela para atualizar para uma nova senha! 
        Seja rápido pois esta senha expira em 10 minutos!`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response)
        }
    });

}

module.exports = {
    sendEmail,
    sendEmailForgot
}

