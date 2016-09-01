exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('productinventories', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.integer('product_id').references('id').inTable('products').notNullable();

      table.string('name', 512).notNullable().defaultsTo('');
      table.json('attribs').notNullable().defaultsTo(JSON.stringify([]))
        .comment('size, color, etc');
      table.decimal('price')
        .comment('allow for a different price than parent');

      table.boolean('active').defaultsTo(true);
      table.string('status').notNullable().defaultTo('On Sale');

      table.integer('maxperorder').defaultsTo(10);
      table.integer('allotted').defaultsTo(0);
      table.integer('sold').defaultsTo(0);
      table.integer('refunded').defaultsTo(0);
      table.integer('available').defaultsTo(0)
        .comment('Alloted - Sold + Refunded. This should essentially be a formula column. Updated with each access.');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('productinventories')
  ])
};
