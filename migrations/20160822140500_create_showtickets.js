exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('showtickets', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.integer('showdate_id').references('id').inTable('showdates').notNullable();

      table.string('name', 512);
      table.string('ages').notNullable().defaultsTo('all ages');
      table.string('description', 8192).notNullable().defaultsTo('');

      table.decimal('price');
      table.string('pricedetail', 512).notNullable().defaultsTo('');//allow a description on the makeup of ticket price
      table.decimal('pricedos');
      table.string('pricedosdetail', 512).notNullable().defaultsTo('');//allow a description on the makeup of ticket price
      table.json('deliveryoptions').notNullable().defaultsTo(JSON.stringify([]));

      table.boolean('active').defaultsTo(true);
      table.string('status').notNullable().defaultsTo('On Sale');

      table.integer('maxperorder').defaultsTo(6);
      table.integer('allotted').defaultsTo(0);
      table.integer('sold').defaultsTo(0);
      table.integer('refunded').defaultsTo(0);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('showtickets')
  ])
};
