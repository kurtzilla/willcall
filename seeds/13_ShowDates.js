
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

    return Promise.all([
      // Inserts seed entries
      knex('showdates').insert({id:1, show_id:1, dateofshow: '2016-10-29 20:30:00', doorsopen:'8 PM',
        ages: 'All Ages', billing:'Fred and his Gonzo act', pricing: 'see tickets for details',
        status: 'On Sale' }),
      knex('showdates').insert({id:2, show_id:2, dateofshow: '2016-10-31 18:30:00', doorsopen:'6 PM',
        ages: 'All Ages', billing:'Meet the Morgans Extravaganza', pricing: 'see tickets for details',
        status: 'On Sale' }),
      knex('showdates').insert({id:3, show_id:2, dateofshow: '2016-10-31 21:30:00', doorsopen:'9 PM',
        ages: 'Over 21', billing:'Meet the Morgans Extravaganza', pricing: 'see tickets for details',
        status: 'On Sale' })
    ]);
};


// table.integer('show_id').references('id').inTable('shows').notNullable();
// table.timestamp('dateofshow').notNullable().comment('Date and show time');
// table.string('doorsopen').notNullable().defaultsTo('');
// table.string('name').notNullable().defaultsTo('').comment('use if there is a reason to differentiate from parent show');
// table.string('ages').notNullable().defaultsTo('all ages');
// table.string('billing', 8192).notNullable().defaultsTo('');
// table.string('pricing', 2048).notNullable().defaultsTo('');
// table.string('description', 8192).notNullable().defaultsTo('');
// table.boolean('active').defaultsTo(true);
// table.string('status').notNullable().defaultsTo('on sale');
