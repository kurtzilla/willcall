//
exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
  
    // .then(function () {
      return Promise.all([

        knex('eventqs').insert({id: 1, dtprocessed: null, status: 'success',
          creatortype: 'seed', affectedtype: 'member',affectedname: 'rob', affectedid: 1,
          context:'testing', name: 'any old thang', oldvalue:'blank', newvalue: 'some data',
          origination:'some web page', ipaddress:'127.0.0.1'}),
        
        knex.raw('ALTER SEQUENCE eventqs_id_seq RESTART WITH 2;')

      ]);
    // });
};
//
// table.increments();
// // table.timestamps(true,true); // we only need created_at
// table.timestamp('created_at').defaultsTo(knex.fn.now());
//
// table.timestamp('dttoprocess').defaultsTo(knex.fn.now());
// table.timestamp('dtprocessed');
// table.string('status').notNullable().defaultsTo('');
// table.string('threadlock',50).notNullable().defaultsTo('')
// .comment('allow for different types and formats of guids');
// table.integer('attemptsremaining').defaultsTo(3);
// table.integer('priority').defaultsTo(0)
// .comment('10 is highest, 0 lowest/normal');
//
// table.string('creatortype').notNullable().defaultsTo('');
// table.string('creatorname').notNullable().defaultsTo('');
// table.integer('creatorid').notNullable().defaultsTo(0);
// table.string('affectedtype').notNullable().defaultsTo('');
// table.string('affectedname').notNullable().defaultsTo('');
// table.integer('affectedid').notNullable().defaultsTo(0);
//
// table.string('context').notNullable().defaultsTo('');
// table.string('name').notNullable().defaultsTo('');
// table.string('oldvalue', 1024).defaultsTo('');
// table.string('newvalue', 1024).defaultsTo('');
// table.string('description', 8192).notNullable().defaultsTo('');
//
// table.string('origination', 512).notNullable().defaultsTo('');//more on where the event came from
// table.string('ipaddress').notNullable().defaultsTo('');
