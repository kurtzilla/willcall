
exports.seed = function(knex, Promise) {

  return knex('showtickets').del().then(function () {
    return knex('showdates').del().then(function () {
      return knex('shows').del().then(function () {
        return knex('venues').del().then(function () {
          return Promise.all([
            // Inserts seed entries
            knex('venues').insert({
              id: 1,
              name: 'The Enormodome',
              url: '',
              address: '123 Anywhere St - Canton Ohio',
              description: 'hoo hah'
            }),
            knex('venues').insert({id: 2, name: 'MaxiDrome', url: '', address: 'Moscow', description: 'Egee Beebee'}),
            knex('venues').insert({
              id: 3,
              name: 'The Fox Theatre',
              url: '',
              address: '1135 13th St - Boulder, CO',
              description: 'on the hill'
            }),
            knex('venues').insert({
              id: 4,
              name: 'The Paramount Theater',
              url: '',
              address: 'Glenarm Place -Denver, CO',
              description: ''
            }),

            knex.raw('ALTER SEQUENCE venues_id_seq RESTART WITH 5;')
          ]);//promise.all
        });//venues
      });//shows
    });//showdates
  });//showtickets
};

// // table.string('name', 512).unique().notNullable();
// table.string('url', 512).defaultsTo('');
// table.string('address', 512).defaultsTo('');
// table.string('description', 8192).defaultsTo('');
// table.json('images').co