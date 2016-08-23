
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('venues').del()
  .then(function () {
    return Promise.all([
      // Inserts seed entries
      knex('venues').insert({id: 1, name: 'The Enormodome', url: '', address: '123 Anywhere St - Canton Ohio', description: 'hoo hah', imageurl:''}),
      knex('venues').insert({id: 2, name: 'Crocus City Hall', url: '', address: 'Moscow', description: 'Egee Beebee', imageurl:''}),
      knex('venues').insert({id: 3, name: 'The Fox Theatre', url: '', address: '1135 13th St - Boulder, CO', description: 'on the hill', imageurl:''}),
      knex('venues').insert({id: 4, name: 'The Paramount Theater', url: '', address: 'Glenarm Place -Denver, CO', description: '', imageurl:''}),

      knex.raw('ALTER SEQUENCE venues_id_seq RESTART WITH 5;')
    ]);
  });
};

// table.string('name', 512).unique().notNullable();
// table.string('url', 512).defaultsTo('');
// table.string('address', 512).defaultsTo('');
// table.string('description', 8192).defaultsTo('');
// table.string('imageurl', 512).notNullable().defaultTo('').comment('A static image for the venue.');
// table.json('images').co