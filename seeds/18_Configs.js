
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('configs').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('configs').insert({id: 1, user_id: null, context: 'Stripe', description: '',
          key:'stripe_publishable_key', value:'',
          datatype:'string', required:true, active:true, allowoverride:true}),
        knex('configs').insert({id: 2, user_id: null, context: 'Stripe', description: '',
          key:'stripe_user_id', value:'',
          datatype:'string', required:true, active:true, allowoverride:true}),
        knex('configs').insert({id: 3, user_id: null, context: 'Stripe', description: '',
          key:'stripe_access_token', value:'',
          datatype:'string', required:true, active:true, allowoverride:true}),

        knex.raw('ALTER SEQUENCE configs_id_seq RESTART WITH 4;')
      ]);
    });
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
