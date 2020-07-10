
exports.up = function(knex) {
    return knex.schema.createTable('clients', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('tipo').notNullable(); // F ou J
        table.string('cpfCnpj').notNullable();
        table.string('email');
        table.string('endereco').notNullable();
        table.string('bairro').notNullable();
        table.string('cidade').notNullable();
        table.string('cep').notNullable();
        table.string('uf').notNullable();
        table.string('inscricaoEst');
        table.string('telefone').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('clients');
};
