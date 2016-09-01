exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('members', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.string('stripeuserid').unique().notNullable();
      table.string('stripepublishkey').notNullable();
      table.string('stripeaccesstoken').nullable();
      table.string('striperefreshtoken').nullable();
      table.boolean('wctapproved').defaultsTo('false');

      table.string('businesslogo', 512).nullable();
      table.string('businessname', 512).unique().notNullable().defaultsTo('');
      table.string('businessurl', 512).notNullable().defaultsTo('');
      table.boolean('chargesenabled').defaultsTo('false');
      table.string('country').notNullable().defaultsTo('');
      table.string('defaultcurrency').notNullable().defaultsTo('');
      table.boolean('detailssubmitted').defaultsTo('false');
      table.string('displayname', 512).notNullable().defaultsTo('');
      table.string('email', 512).notNullable().defaultsTo('');
      table.boolean('managed').defaultsTo('false');
      table.string('statementdescriptor').notNullable().defaultsTo('');
      table.string('supportemail', 512).nullable();
      table.string('supportphone').notNullable().defaultsTo('');
      table.string('timezone').notNullable().defaultsTo('');
      table.boolean('transfersenabled').defaultsTo('false');
      table.json('images').notNullable().defaultsTo(JSON.stringify([]))
      .comment('name, context, short description and a url');

    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('members')
  ])
};

// managed stripe accounts may have access to the following:
// table.json('address').notNullable().defaultsTo(JSON.stringify([]));
// table.string('description', 8192).notNullable().defaultsTo('');
// table.boolean('businesstaxidprovided').defaultsTo(false);
// table.boolean('stripeverified').defaultsTo(false);


// ACCOUNT DEETS { id: 'acct_17ITULDavHQnNzPK',
//   object: 'account',
//   business_logo: null,
//   business_name: 'WillCallTickets, Inc',
//   business_url: 'http://willcalltickets.herokuapp.com/',
//   charges_enabled: true,
//   country: 'US',
//   default_currency: 'usd',
//   details_submitted: true,
//   display_name: 'willcalltickets.herokuapp',
//   email: 'rob@robkurtz.net',
//   managed: false,
//   statement_descriptor: 'WILLCALLTICKETS',
//   support_email: null,
//   support_phone: '303-443-6111',
//   timezone: 'America/Denver',
//   transfers_enabled: true }