exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('shows', function(table) {
      table.increments();
      table.timestamps();

      table.integer('venue_id').references('id').inTable('venues').notNullable();

      table.string('url').unique().notNullable().comment('url to show details');
      table.string('name').notNullable().defaultsTo('');
      table.string('description', 8192).notNullable().defaultTo('').comment('A summary of all showdate info');
      table.json('images').comment('Detail images - each image should contain a context, a short description and a url');

      table.boolean('active').defaultsTo(true);
      table.timestamp('announcedate').defaultTo(knex.fn.now()).comment('date show is allowed to display');
      table.timestamp('enddate').comment('date to take off display if different than formula');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('shows')
  ])
};
