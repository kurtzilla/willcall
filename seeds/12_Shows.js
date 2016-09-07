
exports.seed = function(knex, Promise) {

  return Promise.all([
    // Inserts seed entries
    knex('shows').insert({id: 1, member_id: 1, venue: 'MagnaDrome Moscow', url:'/store/shows/gonzo-show', name:'Gonzomania',
      description:'some show with some group', announcedate: '2016-09-03 13:04:06.05279-06'}),
    knex('shows').insert({id: 2, member_id: 1, venue: 'Cherry Creek Mall - Denver, CO', url:'/store/shows/meet-the-creek', name:'Meet the Creek!',
      description:'Another show with multiple dates', announcedate: null}),

    knex.raw('ALTER SEQUENCE shows_id_seq RESTART WITH 3;'),
    
  ]);
};
