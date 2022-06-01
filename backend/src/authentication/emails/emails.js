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
        const transportador = nodemailer.createTransport(config);

        await transportador.sendMail(this, 
            function(error, info) {
                if (error) {
                    console.log('Erro ao enviar email: \n' + error);
                } else {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log(`Link email teste: ${nodemailer.getTestMessageUrl(info)}`);
                    }
                }
            }
        );        
    }
}

class EmailVerificacao extends Email {
    constructor(usuario) {
        super();

        this.from = '"SYStock" <noreply@systock.com.br>';
        this.to = usuario.email;
        this.subject = 'Verificação de email';
        this.text = `Olá, ${usuario.nome}. Confirme seu endereço de email clicando aqui: ${geraURL('/users/email/validate/', usuario.tokenEmail)}`;
        this.html = `<h1>
                        Olá, ${usuario.nome}
                    </h1>
                    <div>
                        <p>
                            Confirme seu endereço de email para ter acesso à todas as funcionalidades do sistema.
                        </p>
                        <a href="${geraURL('/users/email/validate/', usuario.tokenEmail)}">
                            Clique aqui para confirmar
                        </a>
                    </div>`
    }
}

function geraURL(rota, token) {
    const url = `${process.env.BASE_URL}${rota}${token}`;
    return url;
}

module.exports = {
    EmailVerificacao
};
