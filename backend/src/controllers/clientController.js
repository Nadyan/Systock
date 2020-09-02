const connection = require('../database/connection');

module.exports = {
    async create(request, response) {

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
    
        return response.json({ id, nome });
    },

    async index(request, response)  {
        const { page = 1 } = request.query;

        const [ count ] = await connection('clients').count();

        const products = await connection('clients')
            //.limit(5)
            //.offset((page-1)*5)
            .select('*');
    
        response.header('X-Total-Count-Cli', count['count(*)']);

        return response.json(products);
    },

    async delete(request, response) {
        const { id } = request.params;
        await connection('clients').where('id', id).delete();

        return response.status(204).send(); // sucesso, mas sem conteudo
    }
}