const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { tipoItem, produto, quantidade, servico, valorServico } = request.body;

        const [ id ] = await connection('negotiation_temp').insert({
            tipoItem, //S = Serviço, P = Produto
            produto, //ID da tabela produto
            quantidade, // Quantidade do produto
            servico, //String descrevendo o servico
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
            .select(
                'idTemp',
                'tipoItem',
                'produto',
                'quantidade',
                'servico',
                'valorServico',
                'id',
                'codigo',
                'modelo',
                'marca',
                'descricao',
                'tipo',
                'fornecedor',
                'valorCompra',
                'cfop'
            )
            .join('products', 'produto', 'products.id');
    
        response.header('X-Total-Count-Neg', count['count(*)']);

        return response.json(items);
    },

    async delete(request, response) {
        const { idTemp } = request.params;
        await connection('negotiation_temp').where('idTemp', idTemp).delete();

        return response.status(204).send(); // sucesso sem conteudo
    },

    async deleteAll(request, response) {
        await connection('negotiation_temp').delete();

        return response.status(204).send();
    }
}