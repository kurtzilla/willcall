exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('configs', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.integer('member_id').references('id').inTable('members').nullable();
      // allow config naming in the future
      //table.string('name').unique().notNullable().comment('Default will be base config that all others inherit from');
      table.string('context').notNullable();
      table.string('description', 8192).notNullable().defaultsTo('');
      table.string('key').notNullable();
      table.string('value', 8192).notNullable().defaultsTo('');
      table.string('datatype').notNullable().defaultsTo('');
      table.boolean('required').defaultsTo(false)
        .comment('Users must have a key and that key cannot be empty.');
      table.boolean('active').defaultsTo(true);
      table.boolean('allowoverride').defaultsTo(true)
        .comment('only for base config - user configs should not allow option');

      //create a unique composite key on member_id, context, key
      table.unique(['member_id', 'context', 'key']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('configs')
  ])
};
