const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { nome, tipo, cpfCnpj, email, endereco, bairro, cidade, cep, uf, inscricaoEst, telefone} = request.body;
        
            const [ id ] = await connection('clients').insert({
                nome, 
                tipo, 
                cpfCnpj,
                email,
                endereco,
                bairro,
                cidade,
                cep,
                uf,
                inscricaoEst,
                telefone
            });
        
            return response.status(200).json({ id, nome });
        } catch (err) {
            return response.status(500).json(err);
        }        
    },

    async index(request, response)  {
        //const { page = 1 } = request.query;
        try {
            const [ count ] = await connection('clients').count();

            const clients = await connection('clients')
                //.limit(5)
                //.offset((page-1)*5)
                .select('*');
        
            response.header('X-Total-Count-Cli', count['count(*)']);

            return response.status(200).json(clients);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async select(request, response) {
        try {
            const items = await connection('clients')
                .select('id as value','nome as label');

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            await connection('clients').where('id', id).delete();

            return response.status(204).send(); // sucesso, mas sem conteudo
        } catch (err) {
            return response.status(500).json(err);
        } 
    }
}