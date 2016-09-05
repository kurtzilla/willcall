
exports.seed = function(knex, Promise) {
  
  return knex('showtickets').del()
  .then(function () {
    return knex('showdates').del()
    .then(function () {
      return knex('shows').del()
      .then(function () {
        return knex('brochures').del()
        .then(function () {
          return knex('eventqs').del()
          .then(function(){
            return knex('configs').del()
            .then(function(){
              return knex('productinventories').del()
              .then(function () {
                return knex('products').del()
                .then(function () {
                  return knex('members').del()
                  .then(function () {
    
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};
