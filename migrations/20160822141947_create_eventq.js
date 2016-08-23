exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('eventqs', function(table) {
      table.increments();
      // table.timestamps(); // we only need created_at
      table.timestamp('created_at').defaultTo(knex.fn.now());

      table.timestamp('dttoprocess');
      table.timestamp('dtprocessed');
      table.string('status');
      table.string('threadlock',50).comment('allow for different types and formats of guids');
      table.integer('attemptsremaining').defaultsTo(3);
      table.integer('priority').defaultsTo(0).comment('10 is highest, 0 lowest/normal');

      table.string('creator_name');
      table.integer('creator_id').references('id').inTable('users').nullable();
      table.string('affected_name');
      table.integer('affected_user_id').references('id').inTable('users').nullable();

      table.string('context');
      table.string('name');
      table.string('oldvalue', 1024);
      table.string('newvalue', 1024);
      table.string('description', 8192);

      table.string('origination', 512);//more on where the event came from
      table.string('ipaddress');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('eventqs')
  ])
};
