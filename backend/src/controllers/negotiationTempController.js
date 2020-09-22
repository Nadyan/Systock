const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { tipo, produto, servico, valorServico } = request.body;
    
        const [ id ] = await connection('negotiation_temp').insert({
            tipo, //S = Serviço, P = Produto
            produto, //ID da tabela produto
            servico, //String descrevendo o produto
            valorServico, // valor em float
        });
    
        return response.json({ id });
    },

    async index(request, response)  {
        const { page = 1 } = request.query;

        const [ count ] = await connection('negotiation_temp').count();

        const items = await connection('negotiation_temp')
            //.limit(5)
            //.offset((page-1)*5)
            .select('*');
    
        response.header('X-Total-Count-Neg', count['count(*)']);

        return response.json(items);
    },

    async delete(request, response) {
        const { id } = request.params;
        await connection('negotiation_temp').where('id', id).delete();

        return response.status(204).send(); // sucesso sem conteudo
    }
}