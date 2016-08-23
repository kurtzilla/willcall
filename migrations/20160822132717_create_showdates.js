exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('showdates', function(table) {
      table.increments();
      table.timestamps();

      table.integer('show_id').references('id').inTable('shows').notNullable();

      table.timestamp('dateofshow').notNullable().comment('Date and show time');
      table.string('doorsopen').notNullable().defaultsTo('');

      table.string('name').notNullable().defaultsTo('').comment('use if there is a reason to differentiate from parent show');
      table.string('ages').notNullable().defaultTo('all ages');
      table.string('billing', 8192).notNullable().defaultTo('');
      table.string('pricing', 2048).notNullable().defaultTo('');
      table.string('description', 8192).notNullable().defaultTo('');

      table.boolean('active').defaultsTo(true);
      table.string('status').notNullable().defaultTo('on sale');
      table.timestamp('announcedate').defaultTo(knex.fn.now()).comment('date show is allowed to display');
      table.timestamp('enddate').comment('date to take off display if different than formula');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('showdates')
  ])
};
