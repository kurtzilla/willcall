exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.string('division').notNullable().defaultsTo('');
      table.string('category').notNullable().defaultsTo('');
      table.string('name', 512).notNullable().defaultsTo('');
      table.string('description', 8192).notNullable().defaultsTo('');
      table.json('images').notNullable().defaultsTo(JSON.stringify([])).comment('Detail images - each image should contain a context, a short description and a url');

      table.decimal('price');
      table.string('pricedetail', 512).notNullable().defaultsTo('').comment('allow a description on the makeup of product price');
      // table.decimal('priceonsale');
      // table.string('priceonsaledetail', 512).notNullable().defaultsTo('').comment('allow a description on the makeup of product price');
      table.json('deliveryoptions').notNullable().defaultsTo(JSON.stringify([]));

      table.boolean('active').defaultsTo(true);
      // table.boolean('soldout').defaultsTo(false);
      table.string('status').notNullable().defaultsTo('On Sale');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
  ])
};
