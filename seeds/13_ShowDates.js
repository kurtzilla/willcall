
exports.seed = function(knex, Promise) {
  // Deletes handled in venues

  return Promise.all([
    knex('showdates').insert({id:1, show_id:1, dateofshow: '2016-10-29 20:30:00', doorsopen:'8 PM',
      ages: 'all ages', billing:'Fred and his Gonzo act', pricing: 'see tickets for details',
      status: 'on sale' }),
    knex('showdates').insert({id:2, show_id:2, dateofshow: '2016-10-31 18:30:00', doorsopen:'6 PM',
      ages: 'all ages', billing:'Meet the Morgans Extravaganza', pricing: 'see tickets for details',
      status: 'on sale' }),
    knex('showdates').insert({id:3, show_id:2, dateofshow: '2016-10-31 21:30:00', doorsopen:'9 PM',
      ages: '21+', billing:'Meet the Morgans Extravaganza', pricing: 'see tickets for details',
      status: 'on sale' }),

    knex.raw('ALTER SEQUENCE showdates_id_seq RESTART WITH 4;')
  ]);
};
