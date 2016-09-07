
exports.seed = function(knex, Promise) {
  
  return Promise.all([
    // SHOWS_PRODUCTS
    knex('shows_products').insert({id:1, show_id: 1, product_id: 6}),
    knex('shows_products').insert({id:2, show_id: 2, product_id: 7}),
    
    knex.raw('ALTER SEQUENCE shows_products_id_seq RESTART WITH 3;')
  ]);
};
