exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('venues', function(table) {
      table.increments();
      table.timestamps(true,true);
      table.string('name', 512).unique().notNullable();
      table.string('url', 512).notNullable().defaultsTo('');
      table.string('address', 512).notNullable().defaultsTo('');
      table.string('description', 8192).notNullable().defaultsTo('');
      table.json('images').notNullable().defaultsTo(JSON.stringify([])).comment('Detail images - each image should contain a context, a short description and a url');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('venues')
  ])
};
