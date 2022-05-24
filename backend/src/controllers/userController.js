const connection = require('../database/connection');
const { EmailVerificacao } = require('../authentication/emails');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function geraTokenJWT(usuario) {
    const payload = {
        id: usuario.id
    };
    
    const token = jwt.sign(
        payload, 
        process.env.CHAVE_JWT, 
        { expiresIn: '60m' }
    );
    
    return token;
}

module.exports = {
    async create(request, response) {
        try {
            const { nome, admin, email, senha } = request.body;
            const custoHash = 12;

            /* verifica se o user já existe */
            const user = await connection('usuarios').select('id').where('email', email);
            if (user.length !== 0) {
                return response.status(422).json('Email já cadastrado');
            }
            /* verificações da senha */
            if (typeof senha !== 'string' || senha === '' || senha.length < 6) {
                return response.status(422).json('A senha deve possuir pelo menos 6 caracteres');
            }

            const senhaHash = await bcrypt.hash(senha, custoHash);

            const dados = {
                nome,
                admin,
                email,
                senhaHash
            };

            const [ id ] = await connection('usuarios').insert(dados);

            const emailVerificacao = new EmailVerificacao({nome, email, id});
            emailVerificacao.enviaEmail().catch(console.log);

            return response.status(201).json({ id, email });
        } catch (err) {
            return response.status(500).json(err);
        }        
    },

    login(request, response) {
        try {
            const accessToken = geraTokenJWT(request.user);

            response.set('Authorization', accessToken);
            return response.status(204).send(); // header útil
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async index(request, response)  {
        try {
            const [ count ] = await connection('usuarios').count();

            const users = await connection('usuarios')
                .select('*');
        
            response.header('X-Total-Count-Cli', count['count(*)']);

            return response.status(200).json(users);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async getUserById(request, response) {
        try {
            const { id } = request.params;
            const user = await connection('usuarios').select('*').where('id', id);
            
            return response.status(200).json(user);
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async getUserByEmail(request, response) {
        try {
            const { email } = request.params;
            const user = await connection('usuarios').select('*').where('email', email);
            
            return response.status(200).json(user);
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            await connection('usuarios').where('id', id).delete();

            return response.status(204).send(); // sucesso, mas sem conteudo
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    verifyToken(request, response) {
        try {
            const { token } = request.body;
            let isValid = false;
            
            if (token !== "") {
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                if (payload.id) {
                    isValid = true;
                }
            }

            return response.status(200).json(isValid);
        } catch (err) {
            return response.status(500).json(false);
        }
    },

    async validateEmail(request, response) {
        try {
            const { id } = request.params;
            const user = await connection('usuarios').select('*').where('id', id);
            
            if (user.length === 0) {
                return response.status(422).json('Usuário não encontrado');
            } else if (user[0].emailVerificado === 1) {
                return response.status(422).json('Email já confirmado');
            }

            await connection('usuarios').update({ emailVerificado: 1 }).where('id', id);

            return response.status(204).send();
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async getUserByEmailAuth(email) {
        try {
            const user = await connection('usuarios').select('*').where('email', email);
            
            return user;
        } catch (err) {
            return err;
        }
    },

    async getUserByIdAuth(id) {
        try {
            const user = await connection('usuarios').select('*').where('id', id);
            
            return user;
        } catch (err) {
            return err;
        }
    }
}
