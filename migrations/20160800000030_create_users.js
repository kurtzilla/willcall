exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.string('name').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('passwordResetToken');
      table.dateTime('passwordResetExpires');

      table.boolean('approved').notNullable().defaultsTo('false');
      table.boolean('active').notNullable().defaultsTo('true');
      table.json('roles')
        .comment('listing of roles - simple array');

      table.string('picture');
      table.string('facebook');
      table.string('google');
      table.string('vk');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};