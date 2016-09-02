
exports.seed = function(knex, Promise) {

  // deletes handled in members
  return Promise.all([
    // Inserts seed entries
    knex('products').insert({id: 1, member_id: 1, active:false, division: 'Apparel', category:'t-shirts',
      name: 'The Old T-shirt', description: 'A deactivated t-shirt', price:10.99}),
    knex('products').insert({id: 2, member_id: 1, division: 'Apparel', category:'t-shirts, mens',
      name: 'Men\'s T-shirt', description: 'A man\'s t-shirt', price:12.99}),
    knex('products').insert({id: 3, member_id: 1, division: 'Apparel', category:'t-shirts, womens',
      name: 'Women\'s T-shirt', description: 'A woman\'s t-shirt', price:9.99}),
    knex('products').insert({id: 4, member_id: 1, division: 'Apparel', category:'hats',
      name: 'Crazy Mundane Hat', description: 'Any trucker would be proud with this one',
      price:6.99}),
    knex('products').insert({id: 5, member_id: 1, division: 'Art', category:'posters',
      name: 'Poster in a frame', description: 'Show poster for ...yadda, yadda',
      price:29.99}),

    knex.raw('ALTER SEQUENCE products_id_seq RESTART WITH 6;')

  ]);
};

// table.string('division').notNullable();
// table.string('category').notNullable();
// table.string('name', 512);
// table.string('description', 8192);
// table.json('images').comment('Detail images - each image should contain a context, a short description and a url');
//
// table.decimal('price');
// table.string('pricedetail', 512).comment('allow a description on the makeup of product price');
// table.decimal('priceonsale');
// table.string('priceonsaledetail', 512).comment('allow a description on the makeup of product price');
// table.json('deliveryoptions');
//
// table.boolean('active').defaultsTo(true);
// table.string('status').notNullable().defaultTo('');


