
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('productinventories').del()
  .then(function () {
    return Promise.all([
      // Inserts seed entries
      knex('productinventories').insert({id: 1, product_id: 2,
        name: 'small', allotted: 100, available: 100}),
      // knex('productinventories').insert({id: 2, product_id: 2,
      //   name: 'medium', allotted: 100, available: 100}),
      // knex('productinventories').insert({id: 3, product_id: 2,
      //   name: 'large', allotted: 100, available: 100}),

      // knex('productinventories').insert({id: 4, product_id: 3,
      //   name: 'small', allotted: 100, available: 100}),
      // knex('productinventories').insert({id: 5, product_id: 3,
      //   name: 'medium', allotted: 100, available: 100}),
      // knex('productinventories').insert({id: 6, product_id: 3,
      //   name: 'large', allotted: 100, available: 100}),
      //
      // knex('productinventories').insert({id: 7, product_id: 4,
      //   name: 'one size fits all', allotted: 100, available: 100}),
      // knex('productinventories').insert({id: 8, product_id: 4,
      //   name: 'x/l', allotted: 100, available: 100}),
      //
      // knex('productinventories').insert({id: 9, product_id: 5,
      //   allotted: 100, available: 100}),

      knex.raw('ALTER SEQUENCE productinventories_id_seq RESTART WITH 10;')
    ]);
  });
};

// TODO attribs format

// table.string('name', 512);
// table.json('attribs').comment('size, color, etc');
// table.decimal('price').comment('allow for a different price than parent');
//
// table.boolean('active').defaultsTo(true);
// table.string('status').notNullable().defaultTo('');
//
// table.integer('maxperorder').defaultsTo(10);
// table.integer('allotted');
// table.integer('sold');
// table.integer('refunded');
// table.integer('available').comment('Alloted - Sold + Refunded. This should essentially be a formula column. Updated with each access.');






