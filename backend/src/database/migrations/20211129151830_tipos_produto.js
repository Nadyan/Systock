exports.up = function(knex) {
    return knex.schema.createTable('tipos_produto', function(table) {
        table.increments('id').primary();
        table.string('descricao').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipos_produto');
};

/*
    Tipo:
        - Câmera;
        - Central;
        - Sensor;
        - Cabo;
        - etc.
*/
