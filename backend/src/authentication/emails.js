const nodemailer = require('nodemailer');

class Email {
    async enviaEmail() {
        const contaTeste = await nodemailer.createTestAccount();
        const transportador = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            auth: contaTeste
        });
        const info = await transportador.sendMail(this);
    
        const url = nodemailer.getTestMessageUrl(info);
        console.log('Link do email teste: ' + url);
    }
}

class EmailVerificacao extends Email {
    constructor(usuario) {
        super();

        this.from = '"SYStock" <noreply@systock.com.br>';
        this.to = usuario.email;
        this.subject = 'Verificação de email';
        this.text = `Olá, ${usuario.nome}. Confirme seu endereço de email clicando aqui: ${geraURL('/users/email/validate/', usuario.tokenEmail)}`;
        this.html = `<h1>Olá, ${usuario.nome}</h1> <p>Confirme seu endereço de email clicando <a href="${geraURL('/users/email/validate/', usuario.tokenEmail)}">aqui</a></p>`;
    }
}

function geraURL(rota, token) {
    const baseURL = process.env.BASE_URL;
    const url = `${baseURL}${rota}${token}`;

    return url;
}

module.exports = {
    EmailVerificacao
};
