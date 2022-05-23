const passport = require('passport');

/*
    Sobrescrita dos middlewares do passport
    para customizar as mensagens de erro
*/

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false },
            (err, usuario, info) => { // sobrescrita da função done
                if (err && err.name === 'InvalidArgumentError') {
                    return res.status(401).json({err: err.message});
                }
                if (err) {
                    return res.status(500).json({err: err.message});
                }
                if (!usuario) {
                    // credenciais vazias
                    return res.status(401).json();
                }

                req.user = usuario;
                return next();
            }
        )(req, res, next);
    },

    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer',
            { session: false },
            (err, usuario, info) => {
                if (err && err.name === 'JsonWebTokenError') {
                    return res.status(401).json({err: 'Token de autenticação inválido'});
                }
                if (err) {
                    return res.status(500).json({err: err.message});
                }
                if (!usuario) {
                    // credenciais vazias
                    return res.status(401).json();
                }

                req.user = usuario;
                return next();
            }
        )(req, res, next);
    }
};