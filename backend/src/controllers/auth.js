const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        },
        async (email, senha, done) => {
            try {
                var usuario = await connection('usuarios').select('senhaHash').where('email', email);
                
                if (usuario.length === 0) {
                    throw new Error('Usuário não encontrado');
                } else {
                    usuario = usuario[0];
                }
                
                const senhaHash = usuario.senhaHash;
                const senhaValida = await bcrypt.compare(senha, senhaHash);

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
