
exports.up = function(knex) {
    return knex.schema.createTable('clientes', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('tipo', 1).notNullable();
        table.string('cpf', 11);
        table.string('cnpj', 14);
        table.string('email');
        table.string('endereco').notNullable();
        table.string('bairro').notNullable();
        table.string('cidade').notNullable();
        table.string('cep', 8).notNullable();
        table.string('uf', 2).notNullable();
        table.string('inscr_estadual', 9);
        table.string('telefone');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('clientes');
};

/*
    Criar migração:
        npx knex migrate:make nome_migracao

    Rodar migrações:
        npx knex migrate:latest

    Rodar o médoto down de uma migração:
        npx knex migrate:down nome_migracao

    Chave estrangeira:
        table.string('id_outraTabela').notNullable();
        table.foreign('id_outraTabela').references('id').inTable('outraTabela');

    table.timestamps(true, true); // Adds created_at and updated_at columns
*/
