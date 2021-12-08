const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { descricao } = request.body;
        
            const [ id ] = await connection('tipos_produto').insert({
                descricao
            });
        
            return response.status(200).json({ id, descricao });
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async selectField(request, response) {
        try {
            const items = await connection('tipos_produto')
                .select('id as value','descricao as label').distinct();

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async getTipoProd(request, response) {
        try {
            const { id } = request.params;
            const item = await connection('tipos_produto').select('*').where('id', id);
            
            return response.status(200).json(item);
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async index(request, response)  {
        try {
            const [ count ] = await connection('tipos_produto').count();

            const tipos = await connection('tipos_produto').select('*');
        
            response.header('X-Total-Count-TiposProd', count['count(*)']);

            return response.status(200).json(tipos);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            await connection('tipos_produto').where('id', id).delete();

            return response.status(204).send(); // sucesso sem conteudo
        } catch (err) {
            return response.status(500).json(err);
        } 
    }
}
