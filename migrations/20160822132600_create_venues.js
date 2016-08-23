exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('venues', function(table) {
      table.increments();
      table.timestamps();

      table.string('name', 512).unique().notNullable();
      table.string('url', 512).defaultsTo('');
      table.string('address', 512).defaultsTo('');
      table.string('description', 8192).defaultsTo('');
      table.string('imageurl', 512).notNullable().defaultTo('').comment('A static image for the venue.');
      table.json('images').comment('Detail images - each image should contain a context, a short description and a url');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('venues')
  ])
};
