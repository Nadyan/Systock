
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.boolean('admin').defaultTo(false).notNullable();
        table.string('email').unique().notNullable();
        table.string('senhaHash').notNullable();
        
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
