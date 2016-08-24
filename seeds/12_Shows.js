
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

    return Promise.all([
      // Inserts seed entries
      knex('shows').insert({id: 1, venue_id: 1, url:'/shows/gonzo-show', name:'Gonzo Show',
        description:'some show with some group'}),
      knex('shows').insert({id: 2, venue_id: 2, url:'/shows/meet-the-morgans', name:'Meet the Morgans!',
        description:'Another show with multiple dates'})
    ]);
};

// table.integer('venue_id').references('id').inTable('venues').notNullable();
// table.string('url').unique().notNullable().comment('url to show details');
// table.string('name').notNullable().defaultsTo('');
// table.string('description', 8192).notNullable().defaultsTo('').comment('A summary of all showdate info');
// table.json('images').notNullable().defaultsTo(JSON.stringify([])).comment('Detail images - each image should contain a context, a short description and a url');
// table.boolean('active').defaultsTo(true);
// table.timestamp('announcedate').defaultsTo(knex.fn.now()).comment('date show is allowed to display');
// table.timestamp('enddate').comment('date to take off display if different than formula');