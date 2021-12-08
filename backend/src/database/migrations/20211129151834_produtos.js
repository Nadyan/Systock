
exports.up = function(knex) {
    return knex.schema.createTable('produtos', function(table) {
        table.increments('id').primary();
        table.string('codigo').notNullable();
        table.string('marca').notNullable();
        table.string('modelo').notNullable();
        table.string('descricao');
        table.float('valor_compra', 2).notNullable();
        table.int('cfop');

        table.integer('id_tipo').notNullable();
        table.foreign('id_tipo').references('id').inTable('tipos_produto');

        table.integer('id_fornecedor').notNullable();
        table.foreign('id_fornecedor').references('id').inTable('fornecedores');

        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos');
};
