
exports.seed = function(knex, Promise) {

  return knex('productinventories').del()
  
  .then(function () {
    return knex('products').del()
    .then(function () {

      return knex('members').del()
      .then(function () {
        return Promise.all([
          // Inserts seed entries
          knex('members').insert({
            id: 1,
            stripeuserid: 'acct_17ITULDavHQnNzPK',
            stripepublishkey: 'oop',
            stripeaccesstoken: '',
            striperefreshtoken: '',
            wctapproved: true,

            businesslogo: null,
            businessname: 'WillCallTickets, Inc',
            businessurl: 'http://willcalltickets.herokuapp.com/',
            chargesenabled: true,
            country: 'US',
            defaultcurrency: 'USD',
            detailssubmitted: true,
            displayname: 'willcalltickets.herokuapp',
            email: 'rob@robkurtz.net',
            managed: false,
            statementdescriptor: 'WILLCALLTICKETS',
            supportemail: null,
            supportphone: '303-443-6111',
            timezone: 'America/Denver',
            transfersenabled: true

          }),

          knex.raw('ALTER SEQUENCE members_id_seq RESTART WITH 2;')
        ]);
      });
    });
  });
};
/*
 table.increments();
 table.timestamps(true,true);
 table.string('stripeuserid').unique().notNullable();
 table.string('stripepublishkey').notNullable();
 table.string('stripeaccesstoken').nullable();
 table.string('striperefreshtoken').nullable();
 table.boolean('wctapproved').defaultsTo('false');

 table.string('businessname', 512).unique().notNullable().defaultsTo('');
 table.string('displayname', 512).notNullable().defaultsTo('');
 table.string('businessurl', 512).notNullable().defaultsTo('');
 table.boolean('chargesenabled').defaultsTo('false');
 table.string('country').notNullable().defaultsTo('');
 table.string('defaultcurrency').notNullable().defaultsTo('');
 table.boolean('detailssubmitted').defaultsTo('false');
 table.string('email', 512).notNullable().defaultsTo('');
 table.boolean('managed').defaultsTo('false');
 table.string('statementdescriptor').notNullable().defaultsTo('');
 table.string('supportemail', 512).notNullable().defaultsTo('');
 table.string('supportphone').notNullable().defaultsTo('');
 table.string('timezone').notNullable().defaultsTo('');
 table.boolean('transfersenabled').defaultsTo('false');

 // business logo
 table.json('images').notNullable().defaultsTo(JSON.stringify([]))

  */