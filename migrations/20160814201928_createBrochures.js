exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('brochures', function(table) {
      table.increments();
      table.string('title').unique().notNullable();
      table.string('abstract');
      table.string('description');
      table.string('image');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('brochures')
  ])
};
