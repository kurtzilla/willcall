exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function(table) {
      table.increments();
      table.timestamps();

      table.string('division').notNullable();
      table.string('category').notNullable();
      table.string('name', 512);
      table.string('description', 8192);
      table.json('images').comment('Detail images - each image should contain a context, a short description and a url');

      table.decimal('price');
      table.string('pricedetail', 512).comment('allow a description on the makeup of product price');
      table.decimal('priceonsale');
      table.string('priceonsaledetail', 512).comment('allow a description on the makeup of product price');
      table.json('deliveryoptions');

      table.boolean('active').defaultsTo(true);
      table.boolean('soldout').defaultsTo(false);
      table.string('status').notNullable().defaultTo('on sale');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
  ])
};
