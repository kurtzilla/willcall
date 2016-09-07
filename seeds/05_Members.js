
exports.seed = function(knex, Promise) {
  
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
};