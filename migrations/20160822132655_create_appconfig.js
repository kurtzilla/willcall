exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('configs', function(table) {
      table.increments();
      table.timestamps();

      table.integer('user_id').references('id').inTable('users').nullable();
      table.string('name').unique().notNullable().comment('Default will be base config that all others inherit from');
      table.string('context').unique().notNullable();
      table.string('description', 8192).notNullable().defaultTo('');
      table.string('key').unique().notNullable();
      table.string('value', 8192).notNullable().defaultTo('');
      table.string('datatype').notNullable().defaultTo('');
      table.boolean('active').defaultsTo(true);
      table.boolean('allowoverride').defaultsTo(true).comment('only for base config - user configs should not allow option');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('configs')
  ])
};
