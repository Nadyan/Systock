
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.increments('id').primary();
        table.string('modelo').notNullable();
        table.string('marca').notNullable();
        table.string('descricao');
        table.string('tipo').notNullable();
        table.string('fornecedor');
        table.float('valorCompra', 2).notNullable();
        table.integer('cfop');

        /* Chave estrangeira exemplo:
            table.string('id_outraTabela').notNullable();
            table.foreign('id_outraTabela').references('id').inTable('outraTabela');
        */
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};


// criar nova migration: 
//  - npx knex migrate:make create_product
//      - Editar o arquivo que é criado, fazer os métodos Up e Down.
//  - npx knex migrate:latest

// desfazer a ultima migration executada:
//  - npx knex migrate:rollback

// executar o down de uma migration:
// npx knex migrate:down create_product