const nodemailer = require('nodemailer');

async function criaConfiguracaoEmail() {
    let dados;
    
    if (process.env.NODE_ENV === 'production') {
        dados = {
            host: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            secure: true
        }
    } else {
        const contaTeste = await nodemailer.createTestAccount();
        dados = {
            host: 'smtp.ethereal.email',
            auth: contaTeste
        };
    }

    return dados;
}

class Email {
    async enviaEmail() {
        const config = await criaConfiguracaoEmail();

        console.log(config);
        const transportador = nodemailer.createTransport(config);
        const info = await transportador.sendMail(this, function(error, info) {
            if (error) {
                console.log(error);
            }
        });
        
        if (process.env.NODE_ENV !== 'production') {
            console.log('Link do email teste: '
                        + nodemailer.getTestMessageUrl(info));
        }
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
