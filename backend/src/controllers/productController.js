const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { codigo, modelo, marca, descricao, tipo, fornecedor, valorCompra, cfop } = request.body;
        
            const [ id ] = await connection('products').insert({
                codigo,
                modelo,
                marca,
                descricao,
                tipo,
                fornecedor,
                valorCompra,
                cfop
            });
        
            return response.status(200).json({ id, modelo });
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async selectField(request, response) {
        try {
            const items = await connection('products')
                .select('codigo as value','modelo as label').distinct();

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async getProduct(request, response) {
        try {
            const { codigo } = request.params;
            const items = await connection('products').select('*').where('codigo', codigo);

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async index(request, response)  {
        try {
            const { page = 1 } = request.query;

            const [ count ] = await connection('products').count();

            const products = await connection('products')
                //.limit(5)
                //.offset((page-1)*5)
                .select('*');
        
            response.header('X-Total-Count-Prod', count['count(*)']);

            return response.status(200).json(products);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            await connection('products').where('id', id).delete();

            return response.status(204).send(); // sucesso sem conteudo
        } catch (err) {
            return response.status(500).json(err);
        } 
    }
}