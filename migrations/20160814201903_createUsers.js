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
      table.json('roles').comment('this should be a listing of roles for the user - simple array');
      table.string('gender');
      table.string('location');
      table.string('website');
      table.string('picture');
      table.string('facebook');
      table.string('twitter');
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