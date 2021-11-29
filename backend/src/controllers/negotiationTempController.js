const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { tipoItem, produto, quantidade, servico, valorServico } = request.body;

            const [ id ] = await connection('negotiation_temp').insert({
                tipoItem, //S = Serviço, P = Produto
                produto, //ID da tabela produto
                quantidade, // Quantidade do produto
                servico, //String descrevendo o servico
                valorServico, // valor em float
            });
        
            return response.status(200).json({ id });
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async index(request, response)  {
        try {
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

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async delete(request, response) {
        try {
            const { idTemp } = request.params;
            await connection('negotiation_temp').where('idTemp', idTemp).delete();

            return response.status(204).send(); // sucesso sem conteudo
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async deleteAll(request, response) {
        try {
            await connection('negotiation_temp').delete();

            return response.status(204).send();
        } catch (err) {
            return response.status(500).json(err);
        } 
    }
}