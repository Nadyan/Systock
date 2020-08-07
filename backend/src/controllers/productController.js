const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { modelo, marca, descricao, tipo, fornecedor, valorCompra, cfop } = request.body;
    
        const [ id ] = await connection('products').insert({
            modelo, 
            marca, 
            descricao, 
            tipo, 
            fornecedor, 
            valorCompra, 
            cfop
        });
    
        return response.json({ id, modelo });
    },

    async index(request, response)  {
        const { page = 1 } = request.query;

        const [ count ] = await connection('products').count();

        const products = await connection('products')
            .limit(5)
            .offset((page-1)*5)
            .select('*');
    
        response.header('X-Total-Count-Prod', count['count(*)']);

        return response.json(products);
    },

    async delete(request, response) {
        const { id } = request.params;
        await connection('products').where('id', id).delete();

        return response.status(204).send(); // sucesso sem conteudo
    }
}