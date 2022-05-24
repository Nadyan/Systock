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
        this.text = `Olá, ${usuario.nome}. Confirme seu endereço de email clicando aqui: localhost:3333/users/email/validate/${usuario.id}`;
        this.html = `<h1>Olá, ${usuario.nome}</h1> <p>Confirme seu endereço de email clicando <a href="localhost:3333/users/email/validate/${usuario.id}">aqui</a></p>`;
    }
}

module.exports = {
    EmailVerificacao
};
