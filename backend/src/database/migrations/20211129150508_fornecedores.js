
exports.up = function(knex) {
    return knex.schema.createTable('fornecedores', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('endereco').notNullable();
        table.string('cidade').notNullable();
        table.string('cep', 8).notNullable();
        table.string('uf', 2).notNullable();
        table.string('inscr_estadual', 9).notNullable();
        table.string('cnpj', 14).notNullable();
        table.string('telefone').notNullable();
        table.string('email');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('fornecedores');
};
