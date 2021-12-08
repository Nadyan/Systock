const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { descricao, valor } = request.body;
        
            const [ id ] = await connection('servicos').insert({
                descricao,
                valor
            });
        
            return response.status(200).json({ id, descricao });
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async selectField(request, response) {
        try {
            const items = await connection('servicos')
                .select('id as value','descricao as label').distinct();

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async getServico(request, response) {
        try {
            const { id } = request.params;
            const item = await connection('servicos').select('*').where('id', id);
            
            return response.status(200).json(item);
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async index(request, response)  {
        try {
            const [ count ] = await connection('servicos').count();

            const servicos = await connection('servicos').select('*');
        
            response.header('X-Total-Count-Serv', count['count(*)']);

            return response.status(200).json(servicos);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            await connection('servicos').where('id', id).delete();

            return response.status(204).send(); // sucesso sem conteudo
        } catch (err) {
            return response.status(500).json(err);
        } 
    }
}
