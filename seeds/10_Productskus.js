
exports.seed = function(knex, Promise) {
  // Deletes handled in members
  return Promise.all([

    knex('productskus').insert({id: 1, product_id: 2, price: 5.99,
      name: 'small', allotted: 100}),
    knex('productskus').insert({id: 2, product_id: 2, price: 5.99,
      name: 'medium', allotted: 67}),
    knex('productskus').insert({id: 3, product_id: 2, price: 5.99,
      name: 'large', allotted: 83}),

    knex('productskus').insert({id: 4, product_id: 3, price: 8.99,
      name: 'small', allotted: 100}),
    knex('productskus').insert({id: 5, product_id: 3, price: 8.99,
      name: 'medium', allotted: 110}),
    knex('productskus').insert({id: 6, product_id: 3, price: 8.99,
      name: 'large', allotted: 12}),

    knex('productskus').insert({id: 7, product_id: 4, price: 29.78,
      name: 'one size fits all', allotted: 150}),
    knex('productskus').insert({id: 8, product_id: 4, price: 20.45,
      name: 'x/l', allotted: 10}),

    knex('productskus').insert({id: 9, product_id: 5, price: 323.99,
      allotted: 23}),
  
    knex('productskus').insert({id: 10, product_id: 6, price: 5.00,
      allotted: 125}),
    knex('productskus').insert({id: 11, product_id: 7, price: 25.00,
      allotted: 25}),
  
    knex.raw('ALTER SEQUENCE productskus_id_seq RESTART WITH 12;')

  ]);
};
