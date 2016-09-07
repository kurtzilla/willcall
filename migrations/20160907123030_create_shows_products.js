exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('shows_products', function(table) {
      table.increments();
      table.timestamps(true,true);
      
      table.integer('show_id').references('id').inTable('shows').notNullable();
      table.integer('product_id').references('id').inTable('products').notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('shows_products')
  ])
};
