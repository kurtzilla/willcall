
exports.seed = function(knex, Promise) {
  // Deletes handled in venues

  return Promise.all([
    // Inserts seed entries
    knex('shows').insert({id: 1, member_id: 1, venue: 'MagnaDrome Moscow', url:'/store/shows/gonzo-show', name:'Gonzo Show',
      description:'some show with some group', announcedate: '2016-09-03 13:04:06.05279-06'}),
    knex('shows').insert({id: 2, member_id: 1, venue: 'Cherry Creek Mall - Denver, CO', url:'/store/shows/meet-the-morgans', name:'Meet the Morgans!',
      description:'Another show with multiple dates', announcedate: null}),

    knex.raw('ALTER SEQUENCE shows_id_seq RESTART WITH 3;')
  ]);
};

// table.integer('venue').notNullable();
// table.string('url').unique().notNullable().comment('url to show details');
// table.string('name').notNullable().defaultsTo('');
// table.string('description', 8192).notNullable().defaultsTo('').comment('A summary of all showdate info');
// table.json('images').notNullable().defaultsTo(JSON.stringify([])).comment('Detail images - each image should contain a context, a short description and a url');
// table.boolean('active').defaultsTo(true);
// table.timestamp('announcedate').defaultsTo(knex.fn.now()).comment('date show is allowed to display');
// table.timestamp('enddate').comment('date to take off display if different than formula');