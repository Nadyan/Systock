
exports.up = function(knex) {
    return knex.schema.createTable('negotiation_temp', function(table) {
        
        table.increments('id').primary();

        table.string('tipo'); // S = Serviço, P = Produto 

        table.string('produto');
        table.integer('quantidade').unsigned();

        table.string('servico');
        table.float('valorServico');

        table.foreign('produto').references('id').inTable('products');

        /* Tabela de Orçamento para salvar:
        table.increments('id').primary();
        table.string('item_1');
        table.string('item_2');
        table.string('item_3');
        table.string('item_4');
        table.string('item_5');
        table.string('item_6');
        table.string('item_7');
        table.string('item_8');
        table.string('item_9');
        table.string('item_10');
        table.string('item_11');
        table.string('item_12');
        table.string('item_13');
        table.string('item_14');
        table.string('item_15');
        table.string('item_16');
        table.string('item_17');
        table.string('item_18');
        table.string('item_19');
        table.string('item_20');
        table.string('item_21');
        table.string('item_22');
        table.string('item_23');
        table.string('item_24');
        table.string('item_25');
        table.string('item_26');
        table.string('item_27');
        table.string('item_28');
        table.string('item_29');
        table.string('item_30');
        table.string('item_31');
        table.string('item_32');
        table.string('item_33');
        table.string('item_34');
        table.string('item_35');
        table.string('item_36');
        table.string('item_37');
        table.string('item_38');
        table.string('item_39');
        table.string('item_40');

        table.string('servico_1');
        table.float('servico_1_valor', 2);
        table.string('servico_2');
        table.float('servico_2_valor', 2);
        table.string('servico_3');
        table.float('servico_3_valor', 2);
        table.string('servico_4');
        table.float('servico_4_valor', 2);
        table.string('servico_5');
        table.float('servico_5_valor', 2);
        table.string('servico_6');
        table.float('servico_6_valor', 2);
        table.string('servico_7');
        table.float('servico_7_valor', 2);
        table.string('servico_8');
        table.float('servico_8_valor', 2);
        table.string('servico_9');
        table.float('servico_9_valor', 2);
        table.string('servico_10');
        table.float('servico_10_valor', 2);

        table.foreign('item_1').references('id').inTable('products');
        table.foreign('item_2').references('id').inTable('products');
        table.foreign('item_3').references('id').inTable('products');
        table.foreign('item_4').references('id').inTable('products');
        table.foreign('item_5').references('id').inTable('products');
        table.foreign('item_6').references('id').inTable('products');
        table.foreign('item_7').references('id').inTable('products');
        table.foreign('item_8').references('id').inTable('products');
        table.foreign('item_9').references('id').inTable('products');
        table.foreign('item_10').references('id').inTable('products');
        table.foreign('item_11').references('id').inTable('products');
        table.foreign('item_12').references('id').inTable('products');
        table.foreign('item_13').references('id').inTable('products');
        table.foreign('item_14').references('id').inTable('products');
        table.foreign('item_15').references('id').inTable('products');
        table.foreign('item_16').references('id').inTable('products');
        table.foreign('item_17').references('id').inTable('products');
        table.foreign('item_18').references('id').inTable('products');
        table.foreign('item_19').references('id').inTable('products');
        table.foreign('item_20').references('id').inTable('products');
        table.foreign('item_21').references('id').inTable('products');
        table.foreign('item_22').references('id').inTable('products');
        table.foreign('item_23').references('id').inTable('products');
        table.foreign('item_24').references('id').inTable('products');
        table.foreign('item_25').references('id').inTable('products');
        table.foreign('item_26').references('id').inTable('products');
        table.foreign('item_27').references('id').inTable('products');
        table.foreign('item_28').references('id').inTable('products');
        table.foreign('item_29').references('id').inTable('products');
        table.foreign('item_30').references('id').inTable('products');
        table.foreign('item_31').references('id').inTable('products');
        table.foreign('item_32').references('id').inTable('products');
        table.foreign('item_33').references('id').inTable('products');
        table.foreign('item_34').references('id').inTable('products');
        table.foreign('item_35').references('id').inTable('products');
        table.foreign('item_36').references('id').inTable('products');
        table.foreign('item_37').references('id').inTable('products');
        table.foreign('item_38').references('id').inTable('products');
        table.foreign('item_39').references('id').inTable('products');
        table.foreign('item_40').references('id').inTable('products');
        */
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('negotiation_temp');
};
