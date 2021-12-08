
exports.up = function(knex) {
    return knex.schema.createTable('servicos', function(table) {
        table.increments('id').primary();
        table.string('descricao').notNullable();
        table.float('valor', 2).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('servicos');
};
