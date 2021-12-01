const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { nome, endereco, cidade, cep, uf, inscr_estadual, cnpj, telefone, email } = request.body;
            
            const dados = {
                nome, 
                endereco, 
                cidade,
                cep,
                uf,
                inscr_estadual,
                cnpj,
                telefone,
                email
            }

            const [ id ] = await connection('fornecedores').insert(dados);
        
            return response.status(200).json({ id, nome });
        } catch (err) {
            return response.status(500).json(err);
        }        
    },

    async index(request, response)  {
        try {
            const [ count ] = await connection('fornecedores').count();
            const fornecedores = await connection('fornecedores').select('*');
        
            response.header('X-Total-Count-Forn', count['count(*)']);
            return response.status(200).json(fornecedores);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async selectField(request, response) {
        try {
            const items = await connection('fornecedores')
                .select('id as value','nome as label');

            return response.status(200).json(items);
        } catch (err) {
            return response.status(500).json(err);
        } 
    },

    async getFornecedor(request, response) {
        try {
            const { id } = request.params;
            const item = await connection('fornecedores').select('*').where('id', id);
            
            return response.status(200).json(item);
        } catch (err) {
            return response.status(500).json(err);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            await connection('clientes').where('id', id).delete();

            return response.status(204).send(); // sucesso, mas sem conteudo
        } catch (err) {
            return response.status(500).json(err);
        } 
    }
}
