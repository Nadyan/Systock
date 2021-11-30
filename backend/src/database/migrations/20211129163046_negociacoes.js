
exports.up = function(knex) {
    return knex.schema.createTable('negociacoes', function(table) {
        table.increments('id').primary();
        table.string('tipo', 1).notNullable();

        table.integer('id_cliente').notNullable();
        table.foreign('id_cliente').references('id').inTable('clientes');

        // Produtos
        table.integer('id_produto_1').notNullable();
        table.foreign('id_produto_1').references('id').inTable('produtos');

        table.integer('id_produto_2').notNullable();
        table.foreign('id_produto_2').references('id').inTable('produtos');

        table.integer('id_produto_3').notNullable();
        table.foreign('id_produto_3').references('id').inTable('produtos');

        table.integer('id_produto_4').notNullable();
        table.foreign('id_produto_4').references('id').inTable('produtos');

        table.integer('id_produto_5').notNullable();
        table.foreign('id_produto_5').references('id').inTable('produtos');

        table.integer('id_produto_6').notNullable();
        table.foreign('id_produto_6').references('id').inTable('produtos');

        table.integer('id_produto_7').notNullable();
        table.foreign('id_produto_7').references('id').inTable('produtos');

        table.integer('id_produto_8').notNullable();
        table.foreign('id_produto_8').references('id').inTable('produtos');

        table.integer('id_produto_9').notNullable();
        table.foreign('id_produto_9').references('id').inTable('produtos');

        table.integer('id_produto_10').notNullable();
        table.foreign('id_produto_10').references('id').inTable('produtos');

        table.integer('id_produto_11').notNullable();
        table.foreign('id_produto_11').references('id').inTable('produtos');

        table.integer('id_produto_12').notNullable();
        table.foreign('id_produto_12').references('id').inTable('produtos');

        table.integer('id_produto_13').notNullable();
        table.foreign('id_produto_13').references('id').inTable('produtos');

        table.integer('id_produto_14').notNullable();
        table.foreign('id_produto_14').references('id').inTable('produtos');

        table.integer('id_produto_15').notNullable();
        table.foreign('id_produto_15').references('id').inTable('produtos');

        // Serviços
        table.integer('id_servico_1').notNullable();
        table.foreign('id_servico_1').references('id').inTable('servicos');

        table.integer('id_servico_2').notNullable();
        table.foreign('id_servico_2').references('id').inTable('servicos');

        table.integer('id_servico_3').notNullable();
        table.foreign('id_servico_3').references('id').inTable('servicos');

        table.integer('id_servico_4').notNullable();
        table.foreign('id_servico_4').references('id').inTable('servicos');

        table.integer('id_servico_5').notNullable();
        table.foreign('id_servico_5').references('id').inTable('servicos');

        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('negociacoes');
};

/*
    Tipo:
        - V -> Venda;
        - O -> Orçamento;
*/
