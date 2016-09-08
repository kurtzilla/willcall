//
exports.seed = function(knex, Promise) {

  return Promise.all([

    knex('eventqs').insert({id: 1, dtprocessed: null, status: 'success',
      creatortype: 'seed', affectedtype: 'member',affectedname: 'rob', affectedid: 1,
      context:'testing', name: 'relevant transaction', oldvalue:'blank', newvalue: 'some great data',
      origination:'some web page', ipaddress:'127.0.0.1'}),
    knex('eventqs').insert({id: 2, dtprocessed: null, status: 'success',
      creatortype: 'seed', affectedtype: 'member',affectedname: 'rob', affectedid: 1,
      context:'testing', name: 'customer purchase', oldvalue:'', newvalue: '9.99',
      origination:'stripe', ipaddress:'127.0.0.1'}),
    knex('eventqs').insert({id: 3, dtprocessed: null, status: 'success',
      creatortype: 'seed', affectedtype: 'member',affectedname: 'rob', affectedid: 1,
      context:'testing', name: 'customer purchase', oldvalue:'', newvalue: '19.99',
      origination:'stripe', ipaddress:'127.0.0.1'}),
    knex('eventqs').insert({id: 4, dtprocessed: null, status: 'success',
      creatortype: 'seed', affectedtype: 'member',affectedname: 'rob', affectedid: 1,
      context:'testing', name: 'customer purchase', oldvalue:'', newvalue: '14.99',
      origination:'stripe', ipaddress:'127.0.0.1'}),
    knex('eventqs').insert({id: 5, dtprocessed: null, status: 'success',
      creatortype: 'seed', affectedtype: 'member',affectedname: 'rob', affectedid: 1,
      context:'testing', name: 'chargeback', oldvalue:'9.99', newvalue: '',
      origination:'stripe', ipaddress:'127.0.0.1'}),
    knex('eventqs').insert({id: 6, dtprocessed: null, status: 'success',
      creatortype: 'seed', affectedtype: 'member',affectedname: 'rob', affectedid: 1,
      context:'testing', name: 'stripe settlement', oldvalue:'', newvalue: '327.64',
      origination:'stripe', ipaddress:'127.0.0.1'}),
    
    knex.raw('ALTER SEQUENCE eventqs_id_seq RESTART WITH 7;')

  ]);

};
