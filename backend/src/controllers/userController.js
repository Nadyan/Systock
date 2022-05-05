const connection = require('../database/connection');
const bcrypt = require('bcrypt');

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

            return response.status(200).json({ id, email });
        } catch (err) {
            return response.status(500).json(err);
        }        
    },

    login(request, response) {
        response.status(204).send();
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
    }
}
