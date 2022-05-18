const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUserByEmailAuth, getUserByIdAuth } = require('../controllers/userController');
const { InvalidArgumentError } = require('../errors/errors');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        },
        async (email, senha, done) => {
            try {
                var usuario = await verificaDados(email, senha);
                await verificaSenha(senha, usuario.senhaHash);

                done(null, usuario);
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const usuario = await getUserByIdAuth(payload.id);

                done(null, usuario);
            } catch (err) {
                done(err);
            }            
        }
    )
);

async function verificaDados(email, senha) {
    if (email === '') {
        throw new InvalidArgumentError('Campo email vazio');
    } else if (senha === '') {
        throw new InvalidArgumentError('Campo senha vazio');
    }

    var usuario = await getUserByEmailAuth(email);
    if (usuario.length === 0) {
        throw new InvalidArgumentError('Usuário não encontrado');
    } else {
        usuario = usuario[0];
    }

    return usuario;
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('Email ou senha incorretos');
    }
}
