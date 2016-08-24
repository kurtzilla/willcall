exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('showtickets', function(table) {
      table.increments();
      table.timestamps(true,true);
      table.integer('showdate_id').references('id').inTable('showdates').notNullable();

      table.string('name', 512);
      table.string('ages').notNullable().defaultsTo('all ages');
      // table.string('criteria', 4096).notNullable().defaultsTo(''); // save for a more complicated solution
      table.string('description', 8192).notNullable().defaultsTo('');
      table.decimal('price');
      table.string('pricedetail', 512).notNullable().defaultsTo('');//allow a description on the makeup of ticket price
      table.decimal('pricedos');
      table.string('pricedosdetail', 512).notNullable().defaultsTo('');//allow a description on the makeup of ticket price
      table.json('deliveryoptions').notNullable().defaultsTo(JSON.stringify([]));

      table.boolean('active').defaultsTo(true);
      // table.boolean('soldout').defaultsTo(false);
      table.string('status').notNullable().defaultsTo('On Sale');
      // table.timestamp('dtstart').defaultsTo(knex.fn.now()).comment('date when available');
      // table.timestamp('dtend').comment('date when offsale');

      table.integer('maxperorder').defaultsTo(6);
      table.integer('allotted').defaultsTo(0);
      table.integer('sold').defaultsTo(0);
      table.integer('refunded').defaultsTo(0);
      table.integer('available').defaultsTo(0).comment('Alloted - Sold + Refunded. This should essentially be a formula column. Updated with each access.');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('showtickets')
  ])
};
