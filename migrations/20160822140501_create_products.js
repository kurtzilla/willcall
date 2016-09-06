exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.integer('member_id').references('id').inTable('members').notNullable();

      table.string('division').notNullable().defaultsTo('');
      table.string('category').notNullable().defaultsTo('');
      table.string('name', 512).notNullable().defaultsTo('');
      table.string('description', 8192).notNullable().defaultsTo('');
      table.json('images').notNullable().defaultsTo(JSON.stringify([]))
        .comment('name, context, short description and a url');
      table.json('deliveryoptions').notNullable().defaultsTo(JSON.stringify([]));
      table.boolean('active').defaultsTo(true);
      table.string('status').notNullable().defaultsTo('on sale');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
  ])
};
