exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('eventqs', function(table) {
      table.increments();
      // table.timestamps(true,true); // we only need created_at
      table.timestamp('created_at').defaultsTo(knex.fn.now());

      table.timestamp('dttoprocess').defaultsTo(knex.fn.now());
      table.timestamp('dtprocessed');
      table.string('status').notNullable().defaultsTo('');
      table.string('threadlock',50).notNullable().defaultsTo('').comment('allow for different types and formats of guids');
      table.integer('attemptsremaining').defaultsTo(3);
      table.integer('priority').defaultsTo(0).comment('10 is highest, 0 lowest/normal');

      table.string('creator_name').notNullable().defaultsTo('');
      table.integer('creator_id').references('id').inTable('users').nullable();
      table.string('affected_name').notNullable().defaultsTo('');
      table.integer('affected_user_id').references('id').inTable('users').nullable();

      table.string('context').notNullable().defaultsTo('');
      table.string('name').notNullable().defaultsTo('');
      table.string('oldvalue', 1024).defaultsTo('');
      table.string('newvalue', 1024).defaultsTo('');
      table.string('description', 8192).notNullable().defaultsTo('');

      table.string('origination', 512).notNullable().defaultsTo('');//more on where the event came from
      table.string('ipaddress').notNullable().defaultsTo('');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('eventqs')
  ])
};
