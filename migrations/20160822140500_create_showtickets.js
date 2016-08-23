exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('showtickets', function(table) {

      table.increments();
      table.timestamps();

      table.integer('showdate_id').references('id').inTable('showdates').notNullable();

      table.string('name', 512);
      table.string('ages').notNullable().defaultTo('all ages');
      table.string('criteria', 4096);
      table.string('description', 8192);
      table.decimal('price');
      table.string('pricedetail', 512);//allow a description on the makeup of ticket price
      table.decimal('pricedos');
      table.string('pricedosdetail', 512);//allow a description on the makeup of ticket price
      table.json('deliveryoptions');

      table.boolean('active').defaultsTo(true);
      table.boolean('soldout').defaultsTo(false);
      table.string('status').notNullable().defaultTo('on sale');
      table.timestamp('dtstart').defaultTo(knex.fn.now()).comment('date when available');
      table.timestamp('dtend').comment('date when offsale');

      table.integer('maxperorder').defaultsTo(6);
      table.integer('allotted');
      table.integer('sold');
      table.integer('refunded');
      table.integer('available').comment('Alloted - Sold + Refunded. This should essentially be a formula column. Updated with each access.');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('showtickets')
  ])
};
