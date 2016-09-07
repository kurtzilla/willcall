//
exports.seed = function(knex, Promise) {

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
};