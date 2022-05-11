const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUserByEmailAuth, getUserByIdAuth } = require('./userController');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        },
        async (email, senha, done) => {
            try {

                if (email === '') {
                    throw new Error('Campo email vazio');
                } else if (senha === '') {
                    throw new Error('Campo senha vazio');
                }

                var usuario = await getUserByEmailAuth(email);
                if (usuario.length === 0) {
                    throw new Error('Usuário não encontrado');
                } else {
                    usuario = usuario[0];
                }

                const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
                if (!senhaValida) {
                    throw new Error('Email ou senha incorretos');
                }

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
