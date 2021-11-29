
exports.up = function(knex) {
    return knex.schema.createTable('parametros', function(table) {
        table.increments('id').primary();
        table.string('perc_lucro').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('parametros');
};
