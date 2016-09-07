
exports.seed = function(knex, Promise) {
  // Deletes handled in venues
  return Promise.all([

    knex('showtickets').insert({id:1, showdate_id:1, name: 'general admission',
      ages: '21+', price:9.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0}),
    knex('showtickets').insert({id:2, showdate_id:1, name: 'general admission',
      ages: 'all ages', price:12.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0}),

    knex('showtickets').insert({id:3, showdate_id:2, name: 'general admission',
      ages: '21+', price:14.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0}),
    knex('showtickets').insert({id:4, showdate_id:2, name: 'general admission',
      ages: 'all ages', price:18.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0}),

    knex('showtickets').insert({id:5, showdate_id:3, name: 'party admission',
      ages: '21+', price:201.99, deliveryoptions: JSON.stringify(['willcall']), status: 'on sale',
      allotted: 100, sold: 0}),

    knex.raw('ALTER SEQUENCE showtickets_id_seq RESTART WITH 6;')

  ]);
};
