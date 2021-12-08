const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { codigo, marca, modelo, descricao, valor_compra, cfop, id_tipo, id_fornecedor } = request.body;
        
            const [ id ] = await connection('produtos').insert({
                codigo,
                marca,
                modelo,
                descricao,
                valor_compra,
                cfop,
                id_tipo,
                id_fornecedor
            });
        
            return response.status(200).json({ id, modelo });
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async selectField(request, response) {
        try {
            const items = await connection('produtos')
                .select('codigo as value','modelo as label').distinct();

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async getProduct(request, response) {
        try {
            const { codigo } = request.params;
            const item = await connection('produtos').select('*').where('codigo', codigo);
            
            return response.status(200).json(item);
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async getFornecs(request, response) {
        try {
            const { codigo } = request.params;
            
            const items = await connection('produtos')
                .select('produtos.codigo as codigo', 
                        'produtos.marca as marca',
                        'produtos.modelo as modelo',
                        'produtos.valor_compra as valor_compra',
                        'produtos.descricao as descricao', 
                        'fornecedores.nome as nome_fornec')
                .where('produtos.codigo', codigo)
                .join('fornecedores', 'produtos.id_fornecedor', '=', 'fornecedores.id');

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async index(request, response)  {
        try {
            const { page = 1 } = request.query;

            const [ count ] = await connection('produtos').count();

            const products = await connection('produtos')
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
            await connection('produtos').where('id', id).delete();

            return response.status(204).send(); // sucesso sem conteudo
        } catch (err) {
            return response.status(500).json(err);
        } 
    }
}