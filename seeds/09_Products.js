
exports.seed = function(knex, Promise) {

  // deletes handled in members
  return Promise.all([
    // Inserts seed entries
    knex('products').insert({id: 1, member_id: 1, active:false, division: 'apparel', category:'t-shirts',
      name: 'Ye Olde T-shirt', description: 'A deactivated t-shirt'}),
    knex('products').insert({id: 2, member_id: 1, division: 'apparel', category:'t-shirts, mens',
      name: 'Men\'s T-shirt', description: 'A man\'s t-shirt'}),
    knex('products').insert({id: 3, member_id: 1, division: 'apparel', category:'t-shirts, womens',
      name: 'Women\'s T-shirt', description: 'A woman\'s t-shirt'}),
    knex('products').insert({id: 4, member_id: 1, division: 'apparel', category:'hats',
      name: 'Crazy Truckstop Hat', description: 'Make your inner trucker proud'}),
    knex('products').insert({id: 5, member_id: 1, division: 'art', category:'posters',
      name: 'Poster in a frame', description: 'Show poster for a past event'}),
  
    knex('products').insert({id: 6, member_id: 1, division: 'parking', category:'parking',
      name: 'Parking for matched event', description: ''}),
    knex('products').insert({id: 7, member_id: 1, division: 'camping', category:'camping',
      name: 'Deluxe camping package for matched event', description: ''}),
    
    knex.raw('ALTER SEQUENCE products_id_seq RESTART WITH 8;')

  ]);
};
