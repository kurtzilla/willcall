
exports.seed = function(knex, Promise) {
  // Deletes handled in venues
  return Promise.all([

    knex('showtickets').insert({id:1, showdate_id:1, name: 'general admission',
      ages: '21+', price:9.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0, available: 100}),
    knex('showtickets').insert({id:2, showdate_id:1, name: 'general admission',
      ages: 'all ages', price:12.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0, available: 100}),

    knex('showtickets').insert({id:3, showdate_id:2, name: 'general admission',
      ages: '21+', price:14.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0, available: 100}),
    knex('showtickets').insert({id:4, showdate_id:2, name: 'general admission',
      ages: 'all ages', price:18.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0, available: 100}),

    knex('showtickets').insert({id:5, showdate_id:3, name: 'party admission',
      ages: '21+', price:201.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0, available: 100}),

    knex.raw('ALTER SEQUENCE showtickets_id_seq RESTART WITH 6;')

  ]);
};

// table.integer('showdate_id').references('id').inTable('showdates').notNullable();
// table.string('name', 512);
// table.string('ages').notNullable().defaultsTo('all ages');
// table.string('description', 8192).notNullable().defaultsTo('');
// table.decimal('price');
// table.string('pricedetail', 512).notNullable().defaultsTo('');//allow a description on the makeup of ticket price
// table.decimal('pricedos');
// table.string('pricedosdetail', 512).notNullable().defaultsTo('');//allow a description on the makeup of ticket price
// table.json('deliveryoptions').notNullable().defaultsTo(JSON.stringify([]));
// table.boolean('active').defaultsTo(true);
// table.string('status').notNullable().defaultsTo('on sale');
// table.integer('maxperorder').defaultsTo(6);
// table.integer('allotted').defaultsTo(0);
// table.integer('sold').defaultsTo(0);
// table.integer('refunded').defaultsTo(0);
// table.integer('available').defaultsTo(0).comment('Alloted - Sold + Refunded.

