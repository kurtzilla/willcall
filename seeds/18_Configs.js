//
exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
  
    // .then(function () {
      return Promise.all([

        knex('configs').insert({id: 1, member_id: null, context: 'site', description: 'just some old key',
          key:'testing', value:'123',
          datatype:'string', required:true, active:true, allowoverride:true}),
        knex('configs').insert({id: 2, member_id: null, context: 'site', description: 'turns store on/off',
          key:'store_active', value:'true',
          datatype:'boolean', required:true, active:true, allowoverride:true}),
        knex('configs').insert({id: 3, member_id: null, context: 'locale', description: '',
          key:'box_office_address', value:'box office address',
          datatype:'string', required:true, active:true, allowoverride:true}),
        knex('configs').insert({id: 4, member_id: null, context: 'setup', description: 'timezone for your server',
          key:'timezone_name', value:'MST',
          datatype:'string', required:true, active:true, allowoverride:true}),
        knex('configs').insert({id: 5, member_id: null, context: 'setup', description: 'timezone for your server',
          key:'timezone_offset', value:'-6',
          datatype:'string', required:true, active:true, allowoverride:true}),

        knex.raw('ALTER SEQUENCE configs_id_seq RESTART WITH 6;')

      ]);
    // });
};


// table.integer('user_id').references('id').inTable('users').nullable();
// // allow config naming in the future
// //table.string('name').unique().notNullable().comment('Default will be base config that all others inherit from');

// table.string('context').unique().notNullable();
// table.string('description', 8192).notNullable().defaultsTo('');
// table.string('key').unique().notNullable();
// table.string('value', 8192).notNullable().defaultsTo('');
// table.string('datatype').notNullable().defaultsTo('');
// table.boolean('required').defaultsTo(false).comment('Users must have a key and that key cannot be empty.');
// table.boolean('active').defaultsTo(true);
// table.boolean('allowoverride').defaultsTo(true).comment('only for base config
